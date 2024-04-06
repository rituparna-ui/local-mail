import React from "react";
import Mailview from "./mailview/Mailview";

const Main = () => {
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-2 bg-slate-300">SIDEBAR</div>
        <div className="col-span-10">
          <Mailview />
        </div>
      </div>
    </div>
  );
};

export default Main;
