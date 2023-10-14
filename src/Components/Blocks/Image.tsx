import { GridProps, Paper } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Block, { BlockType } from "../UI/Containers/Block";
import Time from "../../Utils/Time";

interface ImageProps extends GridProps, BlockType {
    src: string,
    refreshFrequency?: number
}

/**
 * An external image that refreshes itself in a given frequency
 */
const ExternalImage: React.FC<ImageProps> = ({
    src,
    refreshFrequency = Time.seconds(5),
    ...props
}) => {

    const reference = useRef<HTMLImageElement>( null );

    // const network = useNetwork();

    const [hasImage, setHasImage] = useState<boolean>(false);
    const [timeUpdated, setTiemUpdated] = useState<string>("");
    const [iterator, setIterator] = useState<number>(1);


    // Callback for refreshing the image
    const refetcher = useCallback(() => {
            reference.current!.src = src + "&timeVersion=" + Time.getNowTime();
            setTiemUpdated(Time.getNowTime());
            setIterator(iterator === 10 ? 0 : iterator + 1);
    }, [iterator]);

    

    // Periodical reloading of the image
    useEffect(() => {
        
        const timeout = setTimeout(refetcher, refreshFrequency);
        return () => clearTimeout(timeout);

    }, [iterator]);


    // Add event listeners to the image waiting for its load
    useEffect(() => {

        reference
            .current!
            .addEventListener("load", handleLoaded);

        return () => reference
            .current!
            .removeEventListener("load", handleLoaded);

    }, []);

    // What to do the first time the image is loaded
    const handleLoaded = useCallback(() => {

        if (!hasImage) {
            setHasImage(true);
            setTiemUpdated(Time.getNowTime());
            setIterator(iterator === 10 ? 0 : iterator + 1);
        }

    }, [hasImage, timeUpdated, iterator]);

    return <Block
        label={props.label}
        {...props}
        description={hasImage && timeUpdated ? `Aktualizováno v ${timeUpdated}` : undefined}
    >
        <Paper
            sx={{ overflow: "hidden", padding: 6, textAlign: "center", visibility: hasImage ? "visible" : "hidden" }}
        >
            <img
                ref={reference}
                src={src}
                style={{ display: hasImage ? "inline" : "none" }}
            />
        </Paper>
    </Block>

};

export default ExternalImage;