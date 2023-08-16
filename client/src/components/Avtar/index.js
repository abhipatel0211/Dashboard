import React from "react";
import photo from "../../upload/7309681.jpg";
import Image from "next/image";

const Avtar = (props) => {
  return (
    <div className="">
      <Image
        className={`h-full w-full ${props.type}`}
        src={photo}
        alt="photo"
        height="100px"
        width="100px"
      />
    </div>
  );
};

export default Avtar;
