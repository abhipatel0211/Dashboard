import React from "react";
import Avtar from "../Avtar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "../../../config";

const Navbar = ({ varient, name = "Vishnu Swaroop" }) => {
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
    <div className="h-20 flex justify-end items-center w-full shadow-lg sticky top-0 bg-white">
      <div className="flex items-center gap-3 mr-14 bg-white">
        <div className="cursor-pointer ">
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </div>
        <div className="p-2 border-2 rounded-lg border-[#E8EFF7] shadow-lg border-solid">
          <Dropdown>
            <DropdownTrigger>
              {/* <div className="p-3"> */}
              <Button variant="bordered" style={{ padding: "2px" }}>
                <div className="h-11 w-11">
                  <Avtar type="rounded-lg" />
                </div>
                <div className="mr-4">
                  <p className="text-xs text-start">Welcome back,</p>
                  <p>{name}</p>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Button>
              {/* </div> */}
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                className="text-black"
                color="success"
                onClick={selectMyprofile}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                className="text-black"
                color="success"
                onClick={selectMyconnection}
              >
                Connection Page
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={logout}
              >
                logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
