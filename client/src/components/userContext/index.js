import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import config from "../../../config";
import { useRouter } from "next/navigation";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const router = useRouter();
  const [email, setemail] = useState(null);
  const [id, setId] = useState(null);
  useEffect(() => {
    axios
      .get(`${config.REACT_APP_BACKEND_URL}/profile`, { withCredentials: true })
      .then((res) => {
        // console.log("inside useconstext " + res.data.userId);
        console.log("profile");
        router.push("/profile", undefined, { shallow: true });
        // setId(res.data.userId), setemail(res.data.email);
      })
      .catch((error) => {
        console.log(error); // Logging any errors that occur during the request
      });
  }, []);

  return (
    <>
      {/* <Register /> */}
      <UserContext.Provider value={{ email, setemail, id, setId }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
