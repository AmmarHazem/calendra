"use server";

import { cookies } from "next/headers";

export async function setAuthToken(token: string) {
  const cookiesStore = await cookies();
  cookiesStore.set("auth", token);
}

export async function getAuthToken() {
  const cookiesStore = await cookies();
  const res = cookiesStore.get("auth");
  return res;
}
