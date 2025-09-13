import { getRedirectResult, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { FC, useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { fireAuth, googleProvider } from "@/lib/firebaseConfig";
import useFireAuthState from "@/hooks/useFireAuthState";

const GoogleSignInButton: FC = () => {
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const result = await getRedirectResult(fireAuth);
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

  const { user } = useFireAuthState();

  const onClick = useCallback(async () => {
    setSigninLoading(true);
    try {
      fireAuth.useDeviceLanguage();
      // await signInWithRedirect(fireAuth, provider);
      const result = await signInWithPopup(fireAuth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log("auth result", result, credential, token, user);
    } catch (e) {
      console.log("--- google sign in error", e);
      toast.error("could not login", { position: "top-center" });
    } finally {
      setSigninLoading(false);
    }
  }, []);

  const handleSignout = useCallback(async () => {
    setSignoutLoading(true);
    try {
      await signOut(fireAuth);
    } catch (e) {
      console.log("--- handleSignout error", e);
    } finally {
      setSignoutLoading(false);
    }
  }, []);

  if (user) {
    return (
      <Button className="w-full" variant="destructive" disabled={signoutLoading} onClick={handleSignout}>
        {signoutLoading ? "Loading..." : `Sign out`}
      </Button>
    );
  }

  return (
    <>
      <Button disabled={signinLoading} onClick={onClick} variant="outline" className="w-full">
        {signinLoading ? "Loading..." : "Login with Google (Popup)"}
      </Button>
      <div className="h-[1px] w-full bg-neutral-200" />
      <Button disabled={signinLoading} onClick={onClick} variant="outline" className="w-full">
        {signinLoading ? "Loading..." : "Login with Google (Redirect)"}
      </Button>
    </>
  );
};

export default GoogleSignInButton;
