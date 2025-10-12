import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(720px, 90%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
});

export default function RequestDetailsModal({ request, onClose }) {
  const [loading, setLoading] = useState(false);
  const open = Boolean(request);

  if (!request) return null;

  const { id, substation, faultType, createdAt, notes, audioURL, status } =
    request;

  const handleUpdate = async (newStatus) => {
    setLoading(true);
    try {
      const { updateRequestStatus } = await import(
        "../services/firestoreService"
      );
      await updateRequestStatus(id, newStatus);
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to update request status", error);
      // TODO: show user-friendly error (snackbar)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="request-details-title"
    >
      <Box sx={style}>
        <Typography id="request-details-title" variant="h6" gutterBottom>
          Request Details
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Substation & Feeder</Typography>
          <Typography variant="body1">{substation || "—"}</Typography>

          <Typography variant="subtitle2">Fault Type</Typography>
          <Typography variant="body1">{faultType || "—"}</Typography>

          <Typography variant="subtitle2">Submitted On</Typography>
          <Typography variant="body1">
            {createdAt ? new Date(createdAt).toLocaleString() : "—"}
          </Typography>

          <Typography variant="subtitle2">Notes</Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {notes || "No additional notes."}
          </Typography>

          {audioURL && (
            <Box component="div">
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Audio Recording
              </Typography>
              <audio controls src={audioURL} style={{ width: "100%" }}>
                Your browser does not support the audio element.
              </audio>
            </Box>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            color="success"
            onClick={() => handleUpdate("approved")}
            disabled={loading || status === "approved"}
          >
            {loading ? "Working..." : "Approve"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleUpdate("denied")}
            disabled={loading || status === "denied"}
          >
            {loading ? "Working..." : "Deny"}
          </Button>
          <Button variant="text" onClick={onClose} disabled={loading}>
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

RequestDetailsModal.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string,
    substation: PropTypes.string,
    faultType: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
      PropTypes.number,
    ]),
    notes: PropTypes.string,
    audioURL: PropTypes.string,
    status: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
