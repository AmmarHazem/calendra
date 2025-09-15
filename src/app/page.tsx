import LandingPage from "@/components/LandingPage";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (!authToken) {
    return <LandingPage />;
  }

  return <LogoutButton />;
}
