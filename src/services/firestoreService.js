// firestoreService.js - Firestore real-time helpers
import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  setDoc,
  writeBatch,
  limit,
} from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Subscribe to 'requests' collection and call callback with an array of request objects.
// Returns the unsubscribe function.
export function subscribeToRequests(callback) {
  const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(data);
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error("subscribeToRequests error", error);
    }
  );

  return unsubscribe;
}

export async function updateRequestStatus(
  id,
  status,
  supervisorId = null,
  notes = null
) {
  try {
    const { doc, updateDoc, serverTimestamp } = await import(
      "firebase/firestore"
    );
    const ref = doc(db, "requests", id);

    const updateData = {
      status,
      updatedAt: serverTimestamp(),
      lastUpdatedBy: supervisorId || "unknown",
    };

    // Add notes if provided
    if (notes) {
      updateData.supervisorNotes = notes;
    }

    // Add approval/denial timestamp
    if (status === "approved" || status === "denied") {
      updateData.reviewedAt = serverTimestamp();
      updateData.reviewedBy = supervisorId || "unknown";
    }

    await updateDoc(ref, updateData);
    return { id, status, ...updateData };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("updateRequestStatus error", error);
    throw error;
  }
}

// Approve a request
export async function approveRequest(requestId, supervisorId, notes = null) {
  return updateRequestStatus(requestId, "approved", supervisorId, notes);
}

// Deny a request
export async function denyRequest(requestId, supervisorId, notes = null) {
  return updateRequestStatus(requestId, "denied", supervisorId, notes);
}

// Complete a request
export async function completeRequest(requestId, supervisorId, notes = null) {
  return updateRequestStatus(requestId, "completed", supervisorId, notes);
}

// Subscribe to active linemen for the live map
export function subscribeToActiveLinemen(callback) {
  const q = query(collection(db, "linemen"), where("status", "==", "active"));
  return onSnapshot(q, (snapshot) => {
    const linemen = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(linemen);
  });
}

// Function to add realistic sample linemen data around Ahmedabad
export async function addSampleLinemenData() {
  const linemenRef = collection(db, "linemen");
  const q = query(linemenRef, limit(1));
  const snapshot = await getDocs(q);

  // Only add data if the collection is empty
  if (!snapshot.empty) {
    console.log("Linemen data already exists. Skipping sample data creation.");
    return;
  }

  const batch = writeBatch(db);
  const sampleLinemen = [
    {
      name: "Ramesh Patel",
      employeeId: "LP-7341",
      team: "Alpha Team",
      specialization: "High Voltage",
      status: "active",
      contact: { phone: "9876543210", radio: "Alpha-1" },
      equipment: ["Insulated Gloves", "Voltage Tester", "Safety Harness"],
      assignment: {
        substation: "Vasna Substation",
        workType: "Transformer Repair",
        priority: "High",
        estimatedCompletion: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      },
      currentLocation: { latitude: 23.0, longitude: 72.55 },
      lastUpdate: serverTimestamp(),
    },
    {
      name: "Suresh Kumar",
      employeeId: "LP-8812",
      team: "Bravo Team",
      specialization: "Distribution Lines",
      status: "active",
      contact: { phone: "9876543211", radio: "Bravo-1" },
      equipment: ["Crimpers", "Hot Stick", "Bucket Truck"],
      assignment: {
        substation: "Gota Substation",
        workType: "Line Fault Inspection",
        priority: "Medium",
        estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      },
      currentLocation: { latitude: 23.08, longitude: 72.53 },
      lastUpdate: serverTimestamp(),
    },
    {
      name: "Anil Sharma",
      employeeId: "LP-5256",
      team: "Charlie Team",
      specialization: "Transformer Maintenance",
      status: "active",
      contact: { phone: "9876543212", radio: "Charlie-1" },
      equipment: ["Wrenches", "Oil Sampler", "Multimeter"],
      assignment: {
        substation: "Naroda Substation",
        workType: "Routine Check",
        priority: "Low",
        estimatedCompletion: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      },
      currentLocation: { latitude: 23.07, longitude: 72.65 },
      lastUpdate: serverTimestamp(),
    },
  ];

  sampleLinemen.forEach((lineman) => {
    const docRef = doc(linemenRef);
    batch.set(docRef, lineman);
  });

  await batch.commit();
  console.log("Sample linemen data added successfully.");
}

// Fetch historical (completed or denied) requests for the audit log
export async function getHistoricalRequests() {
  const q = query(
    collection(db, "requests"),
    where("status", "in", ["completed", "denied"]),
    orderBy("updatedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Keep the existing subscribeToActiveJobs function
// Returns the unsubscribe function.
export function subscribeToActiveJobs(callback) {
  const q = query(
    collection(db, "requests"),
    where("status", "==", "approved")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const activeJobs = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Ensure we have location data structure
            currentLocation: data.currentLocation || null,
            linemanId: data.linemanId || data.submittedBy || "Unknown",
            substation: data.substation || "Unknown",
            faultType: data.faultType || data.description || "General Work",
          };
        })
        .filter(
          (job) =>
            job.currentLocation &&
            job.currentLocation.latitude &&
            job.currentLocation.longitude
        )
        .sort((a, b) => {
          // Client-side sorting by updatedAt desc
          const aTime = a.updatedAt?.toDate?.() || new Date(a.updatedAt || 0);
          const bTime = b.updatedAt?.toDate?.() || new Date(b.updatedAt || 0);
          return bTime - aTime;
        });

      callback(activeJobs);
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error("subscribeToActiveJobs error", error);
      callback([]);
    }
  );

  return unsubscribe;
}

// Get historical requests (completed and denied) for audit log

// Function to update lineman location (would be called from mobile app)
export const updateLinemanLocation = async (linemanId, locationData) => {
  try {
    const linemanRef = doc(db, "activeLinemen", linemanId);
    await updateDoc(linemanRef, {
      currentLocation: locationData.currentLocation,
      lastUpdate: serverTimestamp(),
      status: "active",
      ...locationData,
    });
    return true;
  } catch (error) {
    console.error("Error updating lineman location:", error);
    return false;
  }
};
