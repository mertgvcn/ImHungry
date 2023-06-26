import {BrowserRouter, Routes, Route} from "react-router-dom"
//Pages
import LoginPage from "./pages/LoginPage"
import Registration from "./pages/Registration"
import Home from "./pages/Home"



const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
