import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export const SummaryCard: React.FC<{
  summarize: string;
  created_at: string;
}> = ({ summarize, created_at }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${dayjs(created_at).format("MMMM D, YYYY h:mm A")}`}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: summarize }}
        />
      </CardContent>
    </Card>
  );
};
