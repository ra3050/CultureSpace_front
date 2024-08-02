import { useState } from "react"
import Change_Pw_Style from "./user_style/change_pw_style"
import { reqeustReIssuePassword } from "../../../../Controller/Controller"
import { Navigate, useNavigate } from "react-router-dom"

const Change_Of_Password = () => {
    const [old, setOld] = useState('')
    const [newpass, setNewPass] = useState('')
    const [repass, setRePass] = useState('')
    const navigation = useNavigate()

    const handleChangeButton = () => {
        const info = {
            oldpassword: old,
            password: newpass
        }  

        if (newpass.length > 10) {
            if (newpass === repass) {
                reqeustReIssuePassword(info , data => {
                    if (data?.response?.status === 401) {
                        navigation('/')
                    }
        
                    if (data.result) {
                        window.alert('비밀번호를 성공적으로 변경하였습니다.')
                        window.location = '/'
                    } else {
                        window.alert(data.errMessage)
                    }
                })
            } else {
                window.alert('비밀번호를 다시 확인해주세요')
            }    
        } else {
            window.alert('비밀번호는 10자리 이상이여야 합니다.')
        }
        
    }

    return (
        <Change_Pw_Style handleChangeButton={handleChangeButton} setOld={setOld} setNewPass={setNewPass} setRePass={setRePass}/>
    )
}

export default Change_Of_Password