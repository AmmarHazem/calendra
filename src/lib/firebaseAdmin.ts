import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const app = initializeApp({
  credential: cert({
    projectId: "calendra-4eb94",
  }),
});

export const adminAuth = getAuth(app);
