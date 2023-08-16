"use client";
import React from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import axios from "axios";

const Connection = () => {
  const router = useRouter();
  function logout() {
    axios
      .post(`${config.REACT_APP_BACKEND_URL}/logout`)
      .then(() => {
        // setId(null);
        // setemail(null);

        // Clear the authentication token or session cookie
        const d = new Date();
        d.getTime();
        //  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = `token=; ${expires}; path=/;`;

        // Optionally, you can also remove other relevant cookies if needed
        // document.cookie = "favorite-color=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // After clearing the cookie, you can redirect the user to the login page
        // window.location.href = "/login";
        router.push("/", undefined, { shallow: true });
      })
      .catch((error) => {
        // Handle the error if the logout request fails
        console.error("Logout failed:", error);
      });
  }
  return (
    <div className="flex h-screen">
      <div className="w-1/5">
        <div className="w-1/6 h-full flex shadow-2xl flex-col flex-grow fixed max-md:hidden">
          <Sidebar />
          <button
            className="flex mb-3 justify-center font-bold text-lg"
            onClick={logout}
          >
            Log Out
          </button>
          {/* <div className="mb-0 bottom-0">hello</div> */}
        </div>
      </div>
      <div className="h-full flex flex-col w-full">
        <Navbar />
        {/* <div className="">hello</div> */}
        {/* <MyConnection /> */}
        <div className="bg-blue-900 text-white font-bold rounded-lg m-4 p-3 text-2xl">
          My Connection
        </div>
        <div className="flex flex-shrink-0 flex-wrap justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="text-2xl m-4 p-3">People You can also connect</div>
        <div className="flex flex-shrink-0 flex-wrap justify-center">
          <Card
            connection="connect"
            name="John Sharma"
            position="AI Developer"
            company="oruPhones"
          />
        </div>
      </div>
    </div>
  );
};

export default Connection;
