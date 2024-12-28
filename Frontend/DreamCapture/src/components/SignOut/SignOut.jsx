import { useContext } from 'react'
import { UserContext }  from '../../App';
import {useNavigate} from "react-router-dom";

function SignOut() {
    const navigate = useNavigate()

    const {setToken,setIsLoggedIn} = useContext(UserContext);
    setToken(null)
    setIsLoggedIn(false)
    navigate('/')
}

export default SignOut