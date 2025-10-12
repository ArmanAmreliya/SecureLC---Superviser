import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import RequestTable from "../components/RequestTable";
import RequestDetailsModal from "../components/RequestDetailsModal";
import SummaryStats from "../components/SummaryStats"; // <-- Import the new component
import { subscribeToRequests } from "../services/firestoreService";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToRequests((data) => {
      const normalized = data.map((doc) => ({
        ...doc,
        createdAt: doc.createdAt?.toDate
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
    <Box>
      {/* Add the new Summary Stats component at the top */}
      <SummaryStats requests={requests} />

      {/* The request table is now below the stats */}
      <RequestTable requests={requests} onRowClick={handleRowClick} />

      {/* The modal remains the same */}
      <RequestDetailsModal
        request={isModalOpen ? selectedRequest : null}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
