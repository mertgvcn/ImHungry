//Context
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
//Components
import Layout from "./Layout";
import { getCookie } from "./setup/Cookie";


const App = () => {
  const isLogin = getCookie("jwt").length != 0

  return (
    <>
      <Layout isLogin={isLogin} />
    </>
  )
}

export default App;
