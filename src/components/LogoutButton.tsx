"use client";
import { FC, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { fireAuth } from "@/lib/firebaseConfig";
import { setAuthToken } from "@/serverActions/authCookie";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton: FC = () => {
  const [signoutLoading, setSignoutLoading] = useState(false);
  const router = useRouter();

  const handleSignout = useCallback(async () => {
    setSignoutLoading(true);
    try {
      await signOut(fireAuth);
      setAuthToken(null);
      router.replace("/login");
    } catch (e) {
      console.log("--- handleSignout error", e);
    } finally {
      setSignoutLoading(false);
    }
  }, [router]);

  return (
    <Button className="w-full" variant="destructive" disabled={signoutLoading} onClick={handleSignout}>
      <LogOut />
      {signoutLoading ? "Loading..." : `Sign out`}
    </Button>
  );
};

export default LogoutButton;
