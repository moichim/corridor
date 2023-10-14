import { GridProps } from "@mui/material";
import React from "react";
import Block, { BlockType } from "../UI/Containers/Block";

interface IframeProps extends GridProps, BlockType {
    src: string,
    refreshFrequency?: number
}

/**
 * An external iframe that refreshes at the given frequency
 */
const ExternalFrame: React.FC<IframeProps> = ({ 
    src,
    ...props }) => {

    return <Block
        label={props.label}
        {...props}
    >
        <iframe 
            width="100%" 
            height="85% !important" 
            frameBorder={0} 
            style={{
                borderRadius: 20,
            }}
            title={src}
            src={src} 
        />
    </Block>
  
  };

export default ExternalFrame;