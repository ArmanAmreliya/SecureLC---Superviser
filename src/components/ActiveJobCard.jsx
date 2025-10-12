import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

export default function ActiveJobCard({ title, subtitle }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {subtitle && <Typography variant="body2">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
}

ActiveJobCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
