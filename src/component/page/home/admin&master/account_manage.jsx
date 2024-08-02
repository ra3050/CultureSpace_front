import { useLayoutEffect, useState } from "react";
import Account_Manage_Style from "./admin_style/account_manage_style";
import { requestSideBarList } from "../../../../Controller/Controller";

const Account_Manage = (props) => {
    // const [userList, setUserList] = useState()
    // useLayoutEffect(() => {
    //     requestSideBarList(data => {
    //         if (data.relsult) {
    //             console.log('dasdasdasdasdaqwezxc', data)
    //             setUserList(data.info)
    //         }
    //     })
    // }, [])

    return (
        <Account_Manage_Style/>
    )
} 

export default Account_Manage;