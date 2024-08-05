import Header from "../component/header/header";
import Layout_Oulet_Form from "./layout_oulet_form";
import { createContext, useLayoutEffect, useState } from "react";
import { requestAccessLevelCheck, requestLogout, requestSideBarList } from "../Controller/Controller";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const Layout = () => {
    const [accessLevel, setAccessLevel] = useState(false);
    const [userData, setUserData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const navigation = useNavigate();

    useLayoutEffect(() => {
        requestAccessLevelCheck(data => {
            if (data?.response?.status === 401) {
                requestLogout(data => {
                    if (data.result) {
                        navigation('/')
                    }
                })
            }
            setAccessLevel(data.user_type)

            requestSideBarList(data => {
                if (data?.response?.status === 401) {
                    requestLogout(data => {
                        if (data.result) {
                            navigation('/')
                        }
                    })
                }

                if (data.result) {
                    let master = [];
                    data?.info?.map(item => {
                        if (item.delete_yn === 'y') {
                            return
                        }

                        if (item.user_type === "USER_MASTER") {
                            master = [...master, item]
                        }
                    })
                    setMasterData(master)
                    setUserData(data.info)
                }
            })
        })
    }, [])

    return (
        <>
            <AppContext.Provider value={{ accessLevel, userData, masterData }}>
                <Header />
                <Layout_Oulet_Form />
            </AppContext.Provider>
        </>
    )
}

export default Layout;