import RestaurantIcon from '@mui/icons-material/Restaurant';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import { SxProps, TableCell, TableRow, useTheme } from "@mui/material";
import React from "react";
import { MensaMealTypeAggregated, MensaMealTypeOriginal } from "./useMensa";


type IsMainCourse = {
    isMainCourse: boolean
}

type IsStretched = {
    isStretched?: boolean
}

type MealParams = ( MensaMealTypeAggregated | MensaMealTypeOriginal ) & IsStretched & IsMainCourse;



const MealIcon: React.FC<IsMainCourse & IsStretched> = ( props ) => {

    const iconProps: SxProps = props.isStretched 
    ? { 
        fontSize: 17 
    }
    : {};
    
    return props.isMainCourse
        ? <RestaurantIcon sx={ iconProps } />
        : <SoupKitchenIcon sx={ iconProps } />;

}


const MealPrice: React.FC<MealParams> = ( props ) => {
    
    return props.type === "original"
        ? <span>{props.prices[ 1 ].price} Kč</span>
        : <>{Object.entries( props.prices ).map( ([size, price]) => {
            return <div key={size} style={{minWidth: "70px"}}>{price[1].price} Kč <small style={{opacity: .7}}>{size}</small></div>
        } )}</>
}

const Meal: React.FC<MealParams> = ( props ) => {

    const theme = useTheme();

    const cellCommons: SxProps = {
        borderBottomColor: theme.palette.primary.dark,
        borderBottomWidth: "2px"
    }

    const cellWithTextProps: SxProps = {
        paddingTop: 0.5,
        paddingBottom: 0.5,
        color: "white"
    }

    const cellStretchedProperties: SxProps = props.isStretched
        ? {
            maxWidth: "310px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
        : {}

    return <TableRow sx={{
        
    }}>
        <TableCell
            sx={{
                color: theme.palette.primary.light,
                paddingRight: 0,
                ...cellCommons
            }}
        >
            <MealIcon 
                isMainCourse={props.isMainCourse}
                isStretched={props.isStretched}
            />
        </TableCell>
        <TableCell sx={{ 
            paddingRight: 0,
            ...cellStretchedProperties,
            ...cellWithTextProps,
            ...cellCommons
            
        }}>
            {props.name}
        </TableCell>
        <TableCell sx={{ 
            textAlign: "right", 
            paddingLeft: 0,
            ...cellWithTextProps,
            ...cellCommons
        }}>
            <MealPrice {...props} />
        </TableCell>
    </TableRow>

}

export default Meal;