//helpers
import { getCookie } from "./setup/Cookie";
import { jwtDecode } from "jwt-decode";
//types
import { DecodedToken, Roles } from "./models/EntityModels/DecodedToken";
//Components
import RouterManager from "./components/Routers/RouterManager";


const App = () => {
  let isLogin = false;
  let userRoles: Roles[] = [];
  const token = getCookie("jwt")

  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);

    //check if token is valid
    isLogin = decodedToken.exp * 1000 > new Date().getTime();

    //take roles from decodedToken and convert to enum
    if (Array.isArray(decodedToken.Role)) {
      decodedToken.Role.map((val) => {
        const str = Roles[val as keyof typeof Roles]
        userRoles.push(str)
      })
    }
    else {
      const str = Roles[decodedToken.Role as keyof typeof Roles]
      userRoles.push(str)
    }

  }

  return (
    <>
      <RouterManager isLogin={isLogin} userRoles={userRoles} />
    </>
  )
}

export default App;
