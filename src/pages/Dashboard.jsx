import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RequestTable from "../components/RequestTable";
import RequestDetailsModal from "../components/RequestDetailsModal";
import { subscribeToRequests } from "../services/firestoreService";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToRequests((data) => {
      const normalized = data.map((doc) => ({
        ...doc,
        createdAt:
          doc.createdAt && doc.createdAt.toDate
            ? doc.createdAt.toDate()
            : doc.createdAt,
      }));
      setRequests(normalized);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <RequestTable requests={requests} onRowClick={handleRowClick} />

      <RequestDetailsModal
        request={isModalOpen ? selectedRequest : null}
        onClose={handleCloseModal}
      />
    </Container>
  );
}
