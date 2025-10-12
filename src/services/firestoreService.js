// firestoreService.js - simple stub for Firestore interactions
export async function fetchRequests() {
  return [];
}

export async function updateRequestStatus(id, status) {
  return { id, status };
}
