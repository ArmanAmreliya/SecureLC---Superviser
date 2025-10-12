import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

export default function MainLayout({ children }) {
  return <Box sx={{ display: "flex" }}>{children}</Box>;
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
