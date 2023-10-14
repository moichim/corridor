import { Box, Table, TableBody, TableContainer, useTheme } from "@mui/material";
import Block, { BlockType } from "@src/Components/UI/Containers/Block";
import React from "react";
import Meal from "./Meal";
import useMensa from "./useMensa";

import Time from "@src/Utils/Time";
import PaperExtended from "@src/Components/UI/Containers/PaperExtended";

type MensaProperties = BlockType & {
    refreshFrequency?: number
}

const Mensa: React.FC<MensaProperties> = ({
    label,
    refreshFrequency = Time.minutes(10),
    ...props
}) => {

    const mensa = useMensa(refreshFrequency);
    const theme = useTheme();

    const isStretched = ( mensa.mensa.mainCourses.length + Object.values( mensa.mensa.soups ).length ) > 7;

    if ( ! mensa.hasFood ) {
        return <Block
        label={label}
        {...props}
        loading={mensa.isFetching}
    >

        <PaperExtended scheme={"minor"}>Dosud nebyl nezveřejněn jídelníček.</PaperExtended>

    </Block>
    }

    return <Block
        label={label}
        description={mensa.mensa.extra.length > 0
            ? `... a dále ${mensa.mensa.extra.join(", ")}.`
            : undefined}
        {...props}
        loading={mensa.isFetching}
    >

        <Box sx={{ 
            overflow: "hidden", 
            borderWidth: "2px", 
            borderStyle: "solid",
            borderColor: theme.palette.primary.dark,
            borderRadius: 1 
        }}>

            <TableContainer>
                <Table size="small">
                    <TableBody>

                        {Object.values(mensa.mensa.soups).map(s => <Meal {...s} key={s.name} isMainCourse={false} isStretched={ isStretched } />)}

                        {mensa.mensa.mainCourses.map(m => <Meal {...m} isStretched={isStretched} key={m.name} isMainCourse={true} />)}

                    </TableBody>
                </Table>
            </TableContainer>

        </Box>

    </Block>
}

export default Mensa;