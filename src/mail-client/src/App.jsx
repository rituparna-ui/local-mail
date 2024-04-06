import { useRecoilState } from "recoil";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { authState } from "./state/auth";
import { useEffect } from "react";

function App() {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAuth((prev) => {
        return {
          ...prev,
          isAuth: true,
          token,
          user: payload.id,
        };
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
