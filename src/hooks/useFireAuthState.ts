import { fireAuth } from "@/lib/firebaseConfig";
import { setAuthToken } from "@/serverActions/authCookie";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useFireAuthState() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscripe = onAuthStateChanged(fireAuth, async (user) => {
      console.log("--- onAuthStateChanged", user);
      setUser(user);
      const token = await user?.getIdToken();
      setAuthToken(token ?? null);
    });
    return unsubscripe;
  }, []);

  return { user };
}
