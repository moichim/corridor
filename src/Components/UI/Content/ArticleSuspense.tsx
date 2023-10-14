import React from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

/**
 * Article fallback
 */
export const ArticleSuspense: React.FC = () => {
    return <Card>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <CardContent>
            <Skeleton variant="rectangular" width="80%" height={30} sx={{ marginBottom: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginBottom: 1 }} />
            <Skeleton variant="rectangular" width={75} height={30} />
        </CardContent>
    </Card>;
};
