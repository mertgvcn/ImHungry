//Context
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
//Components
import Layout from "./Layout";


const App = () => {
  const { isLogin } = useContext(UserContext)
  const _isLogin: boolean = (isLogin == "true")


  //If isLogin is not a empty string, it means that we fetched isLogin value from LocalStorage.
  return isLogin ? 
  (
    <>
      <Layout isLogin={_isLogin} />
    </>
  ) 
  : 
  (
    <>Loading...</>
  )

}

export default App;
