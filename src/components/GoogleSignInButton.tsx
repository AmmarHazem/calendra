import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { FC, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const GoogleSignInButton: FC = () => {
  useEffect(() => {
    initializeApp({
      apiKey: "AIzaSyBxN-KR4idez99_NcdbvImVUavkx-yegRE",
      authDomain: "calendra-4eb94.firebaseapp.com",
      projectId: "calendra-4eb94",
      storageBucket: "calendra-4eb94.firebasestorage.app",
      messagingSenderId: "600396470230",
      appId: "1:600396470230:web:becc3f9ec4a73f99637677",
    });
  }, []);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const auth = getAuth();
      const result = await getRedirectResult(auth);
      console.log("result", result);
      if (!result?.user) {
        console.log("no auth result");
        return toast.error("could not login", { position: "top-center" });
      }
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        console.log("no credentails");
        return toast.error("could not login", { position: "top-center" });
      }
      const token = credential?.accessToken;
      console.log("token", token);
    };
    handleAuthRedirect();
  }, []);

  const onClick = useCallback(async () => {
    const auth = getAuth();
    auth.useDeviceLanguage();
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }, []);

  return (
    <Button onClick={onClick} variant="outline" className="w-full">
      Login with Google
    </Button>
  );
};

export default GoogleSignInButton;
