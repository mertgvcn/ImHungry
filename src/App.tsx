import { UserContextProvider } from "./UserContext";
//COMPONENTS
import Router from "./components/Shared/Router"
import Navbar from "./components/Shared/Navbar";




const App = () => {

  return (
    <UserContextProvider>
      <Navbar />
      <Router />
    </UserContextProvider>
  );
}

export default App;
