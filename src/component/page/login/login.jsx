import Login_Style from "./login_style/login_style";
import { useState } from "react";
import { requestSignIn } from "../../../Controller/Controller";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [userId, setUserId] = useState('') 
    const [userPwd, setUserPwd] = useState('')
    const navigation = useNavigate();

    const handleLogin = () => {
        const info = { id: userId, password: userPwd }
        requestSignIn(info, (data) => {
            if (data?.result) {
                navigation('/user/sales')
            } else {
                console.log(data)
                window.confirm(`${data.errMessage}`)
            }
        })
    }
    
    return (
        <Login_Style setUserId={setUserId} setUserPwd={setUserPwd} handleLogin={handleLogin}/>
    )
}

export default Login;