import PrivateNavBar from "@/components/PrivateNavBar";
import PublicNavBar from "@/components/PublicNavBar";
import { cookies } from "next/headers";
import { ReactNode } from "react";

async function MainLayout({ children }: { children?: ReactNode }) {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("auth")?.value;

  return (
    <main className="relative">
      {authToken ? <PrivateNavBar /> : <PublicNavBar />}
      {children}
    </main>
  );
}

export default MainLayout;
