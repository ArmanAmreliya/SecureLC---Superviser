import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

export default function RequestDetailsModal({ open, onClose, request }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Request Details</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{JSON.stringify(request)}</Typography>
      </DialogContent>
    </Dialog>
  );
}

RequestDetailsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  request: PropTypes.object,
};
