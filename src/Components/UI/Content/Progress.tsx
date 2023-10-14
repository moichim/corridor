import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

type ProgressBarProps = {
  duration: number;
};

/** @deprecated */
const ProgressBar: React.FC<ProgressBarProps> = ({ duration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ transition: `${duration}s linear` }}
      />
    </Box>
  );
};


export default ProgressBar;