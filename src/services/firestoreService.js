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

export async function updateRequestStatus(id, status, supervisorId = null, notes = null) {
  try {
    const { doc, updateDoc, serverTimestamp } = await import(
      "firebase/firestore"
    );
    const ref = doc(db, "requests", id);
    
    const updateData = {
      status,
      updatedAt: serverTimestamp(),
      lastUpdatedBy: supervisorId || "unknown"
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

// Subscribe to active jobs (approved requests) with live location data
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
export const getHistoricalRequests = async () => {
  try {
    const q = query(
      collection(db, "requests"),
      where("status", "in", ["completed", "denied"]),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const historicalData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return historicalData;
  } catch (error) {
    console.error("Error fetching historical requests:", error);
    return [];
  }
};

// Subscribe to active linemen for live map
export const subscribeToActiveLinemen = (callback) => {
  try {
    // Query for active linemen from a dedicated collection
    const q = query(
      collection(db, "activeLinemen"),
      where("status", "==", "active")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const activeLinemen = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          lastUpdate: doc.data().lastUpdate || new Date(),
        }));

        console.log("Active linemen received:", activeLinemen);
        callback(activeLinemen);
      },
      (error) => {
        console.error("subscribeToActiveLinemen error", error);
        callback([]);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up active linemen subscription:", error);
    return () => {};
  }
};

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

// Function to add sample linemen data for testing
export const addSampleLinemenData = async () => {
  try {
    const sampleLinemen = [
      {
        id: "WORKER001",
        name: "John Smith",
        employeeId: "EMP001",
        team: "Team Alpha",
        specialization: "High Voltage",
        currentLocation: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
        assignment: {
          jobId: "JOB001",
          substation: "Mission Substation",
          workType: "Routine Maintenance",
          priority: "medium",
          estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        },
        status: "active",
        lastUpdate: serverTimestamp(),
        equipment: ["Safety Harness", "Voltage Tester", "Climbing Gear"],
        contact: {
          phone: "+1-555-0101",
          radio: "CH-7",
        },
      },
      {
        id: "WORKER002",
        name: "Maria Garcia",
        employeeId: "EMP002",
        team: "Team Beta",
        specialization: "Distribution Lines",
        currentLocation: {
          latitude: 37.7849,
          longitude: -122.4094,
        },
        assignment: {
          jobId: "JOB002",
          substation: "Sunset Substation",
          workType: "Emergency Repair",
          priority: "high",
          estimatedCompletion: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        },
        status: "active",
        lastUpdate: serverTimestamp(),
        equipment: ["Hot Stick", "Wire Cutters", "First Aid Kit"],
        contact: {
          phone: "+1-555-0102",
          radio: "CH-3",
        },
      },
      {
        id: "WORKER003",
        name: "David Chen",
        employeeId: "EMP003",
        team: "Team Gamma",
        specialization: "Transformer Maintenance",
        currentLocation: {
          latitude: 37.7649,
          longitude: -122.4294,
        },
        assignment: {
          jobId: "JOB003",
          substation: "Richmond Substation",
          workType: "Transformer Inspection",
          priority: "low",
          estimatedCompletion: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        },
        status: "active",
        lastUpdate: serverTimestamp(),
        equipment: ["Infrared Camera", "Oil Sampling Kit", "Multimeter"],
        contact: {
          phone: "+1-555-0103",
          radio: "CH-5",
        },
      },
      {
        id: "WORKER004",
        name: "Rajesh Patel",
        employeeId: "EMP004",
        team: "Team Delta",
        specialization: "Power Line Installation",
        currentLocation: {
          latitude: 23.0225,
          longitude: 72.5714,
        },
        assignment: {
          jobId: "JOB004",
          substation: "Ahmedabad Central",
          workType: "Power Line Installation",
          priority: "high",
          estimatedCompletion: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        },
        status: "active",
        lastUpdate: serverTimestamp(),
        equipment: ["Cable Pullers", "Tension Meter", "Grounding Equipment"],
        contact: {
          phone: "+91-98765-43210",
          radio: "CH-2",
        },
      },
    ];

    // Add each lineman to the activeLinemen collection
    for (const lineman of sampleLinemen) {
      const linemanRef = doc(db, "activeLinemen", lineman.id);
      await setDoc(linemanRef, lineman);
    }

    console.log("Sample linemen data added successfully");
    return true;
  } catch (error) {
    console.error("Error adding sample linemen data:", error);
    return false;
  }
};
