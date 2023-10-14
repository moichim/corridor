import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { ArticleItemType } from "@src/Components/Blocks/Articles/useArticles";
import Time from "@src/Utils/Time";
import PaperExtended from "../Containers/PaperExtended";
type ArticleProps = ArticleItemType & {
    refreshFrequency?: number
};

/**
 * Displays a single article
 * - handles the image and its fallback
 */
const Article: React.FC<ArticleProps> = ( props ) => {


    let image: React.ReactNode = null;

    if ( props.image )
        image = <CardMedia 
            sx={{ height: 200 }}
            title={props.title}
            image={ props.image }
        />;
    else if ( props.source.icon )
        image = <Box 
            width="100%"
            height={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="1rem"
            sx={{
                backgroundColor: props.source.color ?? 'primary.dark'
            }}
        >
            <img src={ props.source.icon } alt={props.source.domain} />
        </Box>;
    else
        image = <Box 
        width="100%"
        height={200}
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="1rem"
        sx={{
            backgroundColor: 'primary.dark'
        }}
    >
        <div>Další</div>
    </Box>; 

    const date = new Date( props.date );

    return <PaperExtended
        padding={0}
    >
        {image}
        <Box 
            sx={{padding: 3}}
        >
            <Typography
                gutterBottom 
                variant="h5"
                component="div"
            >{props.title}</Typography>
            <Typography variant="body2" color="primary.light" >
                {props.text}
            </Typography>
            <Box sx={{marginTop: 1}}>
                <Typography variant="body2" color="primary.light" display="inline">Publikováno </Typography> 
                <Typography variant="body2" display="inline">{Time.formatDateComplete( date ) } </Typography>
                <Typography variant="body2" color="primary.light" display="inline">na</Typography>
                <Typography variant="body2" display="inline"> {props.source?.domain}
                </Typography>
            </Box>
        </Box>
    </PaperExtended>

}

export default Article;

