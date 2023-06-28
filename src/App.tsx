import {BrowserRouter, Routes, Route} from "react-router-dom"

//Pages
import LoginPage from "./pages/LoginPage"
import Registration from "./pages/Registration"
import Home from "./pages/Home"
import { useState,useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { UserType, loginProps } from "./types/UserType"
import { db } from "./firebase-config"


const App: React.FC = () => {

  const [users, setUsers] = useState<UserType[]>([]);
  const usersCollectionRef = collection(db, "users");
  
  useEffect(() => {
      const getUsers = async () => {
          const data = await getDocs(usersCollectionRef)
          //setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) //without typescript
          setUsers(data.docs.map((doc) => ({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              userName: doc.data().userName,
              email: doc.data().email,
              password: doc.data().password
          })));
      };

      getUsers();
  }, []);

  return users.length!==0 ?  (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage userType={users}/>}/>
          <Route path="/registration" element={<Registration userType={users} usersCollectionRef={usersCollectionRef}/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  ) : null;
}

export default App;
