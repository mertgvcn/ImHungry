import { UserContextProvider } from "./context/UserContext";
import { ChangeContextProvider } from "./context/ChangeContext";
import { CartContextProvider } from "./context/CartContext";
//COMPONENTS
import Router from "./components/Shared/Router"
import Navbar from "./components/Shared/Navbar";




const App = () => {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <ChangeContextProvider>
          <Navbar />
          <Router />
        </ChangeContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
