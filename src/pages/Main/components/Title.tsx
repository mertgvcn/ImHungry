//css
import '../styles/Title.css'
//helpers
import { useNavigate } from 'react-router-dom'


const Title = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="container">
        <p id="text-welcome">Welcome to Im Hungry</p>
        <p id="text-info">-if you are feeling hungry log in or join us-</p>
        <div id="button-wrapper">
          <input className="input-button" id="login" value="Login" type="submit" onClick={() => navigate("/login")} />
          <input className="input-button" id="register" value="Register" type="submit" onClick={() => navigate("/registration")} />
        </div>
      </div>
    </>
  )
}

export default Title