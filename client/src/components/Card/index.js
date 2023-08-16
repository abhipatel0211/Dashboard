import React from "react";
import Avtar from "../Avtar";

const Card = ({
  connection = "Remove Connection",
  name = "Vishnu Swaroop",
  position = "Full Stack Developer",
  company = "oruphones",
}) => {
  return (
    <div className="h-40 w-80 border-2 border-solid border-black m-4 p-3 rounded-lg flex  items-center gap-1 flex-shrink-0 justify-between">
      <div className="">
        <div className="font-bold">{name}</div>
        <div className="text-sm">{position}</div>
        <div className="text-sm">@ {company}</div>
        <button className="bg-gray-300 rounded-2xl px-2 mt-5">
          {connection}
        </button>
      </div>
      <div className=" h-full w-28 flex justify-center items-center">
        <Avtar type="rounded-full " />
      </div>
    </div>
  );
};

export default Card;
