import { useContext } from "react";
//Context
import { UserContext } from "./context/UserContext";
//Components
import Router from "./components/Routers/Router"
import RouterLogin from "./components/Routers/RouterLogin";
import Navbar from "./components/Shared/Navbar";



const App = () => {
  const { isLogin } = useContext(UserContext)
  const _isLogin: boolean = (isLogin == "true")

  //If isLogin is not a empty string, it means that we fetched isLogin value from LocalStorage.
  //isFetched sent to other subcompenents in order to understand is data fetch is done or not.
  if (isLogin) {
    return (
      <>
        <Navbar isLogin={_isLogin}/>
        {
          !_isLogin ?
            (
              <Router />
            )
            :
            (
              <RouterLogin />
            )
        }
      </>
    )
  }
  else {
    return (
      <>
        Loading...
      </>
    )
  }

}

export default App;
