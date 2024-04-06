import React from "react";

const Main = () => {
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-2 bg-slate-300">SIDEBAR</div>
        <div className="col-span-10 bg-slate-500">MAILVIEW</div>
      </div>
    </div>
  );
};

export default Main;
