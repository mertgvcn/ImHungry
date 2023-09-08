import { useContext, useRef } from "react";
//Context
import { UserContext } from "./context/UserContext";
//Helpers
import { useFetchData } from "./hooks/useFetchData";
//Components
import Router from "./components/Shared/Router"
import Navbar from "./components/Shared/Navbar";



const App = () => {
  const { isLogin } = useContext(UserContext)
  const _isLogin: boolean = (isLogin == "true")

  const {data,isFetched} = useFetchData()


  //If isLogin is not a empty string, it means that we fetched isLogin value from LocalStorage.
  //_isLogin -boolean value- sent to other subcomponents. Thanks to that method, we wont re-fetch isLogin value from LocalStorage
  //isFetched sent to other subcompenents in order to understand is data fetch is done or not.
  //data sent to other subcompenents even if its empty. We can handle that situation inside the components. 
  if (isLogin) {
    return (
      <>
        <Navbar isLogin={_isLogin} isFetched={isFetched.current} data={data}/>
        <Router isLogin={_isLogin} isFetched={isFetched.current} data={data} />
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
