"use client";
import Navbar from "@/components/Navbar";
import Login_signup from "@/components/login";
// import Profile from "@/app/profile/page";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Profile from "./profile/page";
import { UserContext, UserContextProvider } from "@/components/userContext";

export default function Home() {
  return (
    <NextUIProvider>
      <UserContextProvider>
        <Login_signup />
      </UserContextProvider>
    </NextUIProvider>
  );
}
