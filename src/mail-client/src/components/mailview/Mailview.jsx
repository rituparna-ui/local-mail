import React from "react";
import { useRecoilValue } from "recoil";

import { authState } from "./../../state/auth";
import Login from "./Login";

const Mailview = () => {
  const { isAuth } = useRecoilValue(authState);
  if (!isAuth) {
    return (
      <div className="h-full flex justify-center items-center">
        <Login />
      </div>
    );
  }
  return <div className="bg-slate-500 h-full"></div>;
};

export default Mailview;
