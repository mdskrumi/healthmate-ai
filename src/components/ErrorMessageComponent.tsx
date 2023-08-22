import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ErrorMessageComponent: React.FC<{
  message: string;
}> = ({ message }) => {
  return message ? (
    <Card
      sx={{
        position: "absolute",
        bottom: 0,
      }}
    >
      <CardContent>
        <Typography variant="body2" color="red">
          {message}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
};

export default ErrorMessageComponent;
