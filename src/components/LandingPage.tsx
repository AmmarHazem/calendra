"use client";
import { Calendar } from "lucide-react";
import { FC } from "react";
import GoogleSignInButton from "./GoogleSignInButton";

const LandingPage: FC = () => {
  return (
    <div className="flex items-center p-10 gap-24 max-md:flex-col">
      <section className="flex flex-col items-center">
        <Calendar size={100} className="mb-4" />
        <h1>Your time perfectly planned</h1>
        <div className="flex flex-col gap-4 mt-4">
          <GoogleSignInButton />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
