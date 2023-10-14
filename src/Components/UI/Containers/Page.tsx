import { Box, GridProps } from "@mui/material";
import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";

interface PageProps extends GridProps {
}

const throwDice = ( scale: number = 20 ): number => {

    return ( ( Math.random() * 2 ) - 1 ) * scale;

}

const getTranslateValue = (): string => {

    return `translate(${throwDice()}px, ${throwDice()}px)`;

}

/**
 * Main page layout
 * - includes upper and lower content
 * - every content should be a `Block`
 */
const Page: React.FC<PageProps> = ( props ) => {

    const size = useWindowSize();

    return <Box
        sx={{
            p: 5,
            backgroundColor: "#000", //theme.palette.primary["dark"],
            height: size.width! > 900 ? "100vh" : undefined,
            overflow: size.width! > 900 ? "hidden" : "inherit",
            position: "relative",
        }}
    >
        <Box
        sx={{
            overflow: "hidden",
            position: "relative",
            transform: size.width! > 900 ? getTranslateValue() : undefined,
            height: size.width! > 900 ? "100%" : undefined,
        }}>
            {props.children}
        </Box>
    </Box>
}

export default Page;