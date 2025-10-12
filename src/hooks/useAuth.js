import { useContext } from "react";
import AuthContext, { useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  const ctx = useAuthContext();
  return ctx;
}
