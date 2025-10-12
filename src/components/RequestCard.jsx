import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

export default function RequestCard({ id, title }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption">ID: {id}</Typography>
      </CardContent>
    </Card>
  );
}

RequestCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
