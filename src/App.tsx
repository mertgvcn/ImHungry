import { getCookie } from "./setup/Cookie";
import { BrowserRouter } from "react-router-dom";
//Components
import Navbar from "./components/Shared/Navbar";
import RouterManager from "./components/Routers/RouterManager";


const App = () => {
  const isLogin = getCookie("jwt").length != 0

  return (
    <>
      <RouterManager isLogin={isLogin} />
    </>
  )
}

export default App;
