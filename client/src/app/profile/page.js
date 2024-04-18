"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import MyConnection from "@/components/MyConnection";
import Myprofile from "@/components/myprofile1/page";
import config from "../../../config";
import { useRouter } from "next/navigation";
import axios from "axios";

// import myProfile from "../../components/myprofile1/page";

const Profile = () => {
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
    <div className="flex flex-row bg-white">
      <div className="w-1/6 flex h-screen fixed shadow-2xl flex-col flex-grow max-lg:hidden">
        {/* <div className=""> */}
        <Sidebar />
        <button
          className="flex mb-3 justify-center font-bold text-lg"
          onClick={logout}
        >
          Log Out
        </button>
        {/* <div className="mb-0 bottom-0">hello</div> */}
        {/* </div> */}
      </div>
      <div className="h-screen flex  bg-white flex-col lg:ml-[16.666%] max-md:m-0">
        <Navbar />
        {/* <div className="">hello</div> */}
        {/* <MyConnection /> */}
        <Myprofile />
      </div>
      {/* <div>hello</div> */}
    </div>
  );
};

export default Profile;
