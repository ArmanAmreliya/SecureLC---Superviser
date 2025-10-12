// firestoreService.js - Firestore real-time helpers
import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
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

export async function updateRequestStatus(id, status) {
  try {
    const { doc, updateDoc, serverTimestamp } = await import(
      "firebase/firestore"
    );
    const ref = doc(db, "requests", id);
    await updateDoc(ref, { status, updatedAt: serverTimestamp() });
    return { id, status };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("updateRequestStatus error", error);
    throw error;
  }
}
