import { useState } from "react";
import Master_Create_Style from "./admin_style/master_create_style";
import { requestCreateMaster } from "../../../../Controller/Controller";

const Master_Create = (props) => {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [addr, setAddr] = useState('')
    const [email, setEmail] = useState('')
    const [descrypt, setDescrypt] = useState('')
    const [userType, setUserType] = useState('USER_OWNER')
    const [selectedRegion, setSelectedRegion] = useState('')

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
    };

    const handleCreateButton = () => {
        const info = {
            user_id: id,
            user_pwd: pw,
            user_name: name,
            user_tel: tel,
            user_addr: addr,
            user_email: email,
            user_info: descrypt,
            user_type: userType
        }
        requestCreateMaster(info, data => {
            if (data.result) {
                window.alert('생성완료')
                window.location.reload()
            } else {
                window.alert(data.errMessage)
            }
        })
    }

    return (
        <Master_Create_Style
            setId={setId}
            setPw={setPw}
            setName={setName}
            setTel={setTel}
            setAddr={setAddr}
            setEmail={setEmail}
            setDescrypt={setDescrypt}
            setUserType={setUserType}

            handleRegionChange={handleRegionChange}
            handleCreateButton={handleCreateButton}
        />
    )
}

export default Master_Create;