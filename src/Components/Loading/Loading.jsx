import React from "react";
import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Bars
        height="70"
        width="70"
        color="#5e4cc8"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
