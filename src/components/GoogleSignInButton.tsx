import { getRedirectResult, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC, useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { fireAuth, googleProvider } from "@/lib/firebaseConfig";
import useFireAuthState from "@/hooks/useFireAuthState";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

const GoogleSignInButton: FC = () => {
  const [signinLoading, setSigninLoading] = useState(false);
  const router = useRouter();

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
      router.replace("/");
    } catch (e) {
      console.log("--- google sign in error", e);
      toast.error("could not login", { position: "top-center" });
    } finally {
      setSigninLoading(false);
    }
  }, [router]);

  if (user) {
    return <LogoutButton />;
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
