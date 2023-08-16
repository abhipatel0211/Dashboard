import Link from "next/link";
// import { useRouter } from "next/router";
import React from "react";
// import { useRouter } from "next/router";
// import "index.css";
import { useRouter } from "next/navigation";
// import Route from "react-router-dom";

const Sidebar = () => {
  const router = useRouter();
  const selectMyprofile = () => {
    console.log("profile");
    router.push("/profile", undefined, { shallow: true });
  };
  const selectMyconnection = (e) => {
    e.preventDefault();
    console.log("myconn");
    router.push("/connect", undefined, { shallow: true });
  };
  return (
    <div className="flex flex-col flex-grow bg-white">
      {/* <Link href="/signup">signup</Link> */}
      <button
        className="m-4 ml-9 p-3 border-2 border-black rounded-lg font-bold justify-center items-center"
        onClick={() => router.push("/profile", undefined, { shallow: true })}
      >
        Dashboard
      </button>
      {/* </Link> */}
      <div className="mt-6 ">
        <div className="flex m-3">
          <div className="w-[2.25rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <button className="w-full" id="profile" onClick={selectMyprofile}>
            <div
              className="w-full flex justify-center"
              onClick={selectMyprofile}
            >
              My Profile
            </div>
          </button>
        </div>
        <div className="flex m-3">
          <div className="w-[2.25rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <button
            className="w-full"
            id="connection"
            onClick={selectMyconnection}
          >
            <div className="w-full flex justify-center">My Connection</div>
          </button>
        </div>
      </div>
      {/* <div className=" h-full mb-0">hello</div> */}
    </div>
  );
};

export default Sidebar;
