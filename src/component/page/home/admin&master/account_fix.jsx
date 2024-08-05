import { useLocation } from "react-router-dom";
import Account_Fix_Style from "./admin_style/Account_Fix_Style";
import { useLayoutEffect, useState } from "react";
import { requestBrandList, requestCodeList, requestDeleteShop, requestDeleteUser, requestMakeID, requestSaveShop, requestUpdateUserInfo, reuqestShopList } from "../../../../Controller/Controller";

const Account_Fix = (props) => {
    const { state } = useLocation();
    const { userData, masterData } = state;       // userData, masterData
    const [eqlist, setEqlist] = useState([]);
    const [shoplist, setShoplist] = useState([]);
    const [brand, setBrand] = useState([])              //브랜드타입 정보
    const [equipment, setEquipment] = useState([])      //기기타입 정보

    const [userName, setUserName] = useState(userData.user_name ? userData.user_name : '');
    const [telNumber, setTelNumber] = useState(userData.user_tel ? userData.user_tel : '');
    const [address, setAddress] = useState(userData.user_addr ? userData.user_addr : '');
    const [email, setEmail] = useState(userData.user_email ? userData.user_email : '');
    const [desc, setDesc] = useState(userData.user_info ? userData.user_info : '');
    const [ref, setRef] = useState(userData.ref_id ? userData.ref_id : 'admin');             // 담당총판

    const handleAddShop = () => {
        requestMakeID({ tag: 'KOR' }, data => {
            console.log('id value', data)
            setShoplist(prev => [...prev, { shop_id: data.id, owner_id: userData.user_id, delete_yn: 'n', brand_code: brand[0]?.key }])          // shoplist에 데이터를 추가합니다
        })
    }

    const handleSaveUserinfo = () => {
        const info = {              // 해당 데이터를 '업데이트'하는 API를 연결
            user_id: userData.user_id,
            user_name: userName ? userName : userData.user_name ? userData.user_name : '',
            user_tel: telNumber ? telNumber : userData.user_tel ? userData.user_tel : '',
            user_addr: address ? address : userData.user_addr ? userData.user_addr : '',
            user_email: email ? email : userData.user_email ? userData.user_email : '',
            user_info: desc ? desc : userData.user_info ? userData.user_info : '',
            ref_id: ref ? ref : userData.ref_id ? userData.ref_id : 'admin',
        }

        requestUpdateUserInfo(info, data => {
            if (data.result) {
                window.alert('유저정보를 변경하였습니다.')
            }
        })
    }

    const handleDeleteUserAccount = () => {
        const info = {
            user_id: userData.user_id,
            shoplist: shoplist,
            eqlist: eqlist,
        }

        requestDeleteUser(info, data => {
            if (data.result) {
                window.alert('계정을 정상적으로 삭제하였습니다.')
            }
        })
    }

    const handleSaveShop = (e) => {                  //매장 및 기기 정보를 갱신 및 생성합니다.
        const info = { shoplist: shoplist[e.target.value], eqlist: eqlist }
        requestSaveShop(info, data => {
            if (data.result) {
                window.alert('정상적으로 생성하였습니다.')
            }
        })
    }

    const handleAddEquipment = (e) => {
        requestMakeID({ tag: 'KR' }, data => {
            setEqlist(prev => [...prev, {
                equipment_id: data.id,
                shop_id: shoplist[e.target.value].shop_id,
                equipment_type: equipment[0]?.key
            }])
        })

    }

    const handleDeleteShop = (index) => {                // 매장의 기기정보와 매장정보를 삭제합니다.
        let eqValue = [];
        eqlist.map(item => {
            if (item.shop_id === shoplist[index].shop_id) {
                eqValue = [...eqValue, item]
            }
        })
        const info = {
            shoplist: shoplist[index],
            eqlist: eqValue
        }

        requestDeleteShop(info, data => {
            if (data.result) {
                window.alert('정상적으로 매장을 삭제하였습니다.')
                window.location.reload()
            }
        })
    }

    useLayoutEffect(() => {
        const info = { user_id: userData.user_id }
        reuqestShopList(info, data => {
            if (data.result) {
                setEqlist(data.eqInfo);
                setShoplist(data.shopInfo);
            }
        })

        // brand_code
        requestBrandList(data => {
            if (data.result) {
                const info = data.info;
                let brand_info = []
                let equipment_info = []
                info.map(item => {
                    brand_info = [...brand_info, { key: item.brand_code, name: item.brand_name }]
                })
                setBrand(brand_info)
                setEquipment(equipment_info)
            }
        })

        requestCodeList(data => {
            if (data.result) {
                const info = data.info;
                let equipment_info = []
                info.map(item => {
                    if (item.p_code === 'EQUIPMENT_TYPE') {
                        equipment_info = [...equipment_info, { key: item.code, name: item.code_nm }]
                    }
                })
                setEquipment(equipment_info)
            }
        })
    }, [])

    return (
        <Account_Fix_Style
            userData={userData}
            masterData={masterData}
            eqlist={eqlist}
            shoplist={shoplist}
            brand={brand}
            equipment={equipment}

            setShoplist={setShoplist}
            setEquipment={setEquipment}
            setEqlist={setEqlist}

            setUserName={setUserName}
            setTelNumber={setTelNumber}
            setAddress={setAddress}
            setEmail={setEmail}
            setDesc={setDesc}
            setRef={setRef}

            handleSaveUserinfo={handleSaveUserinfo}
            handleAddShop={handleAddShop}
            handleSaveShop={handleSaveShop}
            handleAddEquipment={handleAddEquipment}
            handleDeleteUserAccount={handleDeleteUserAccount}
            handleDeleteShop={handleDeleteShop}
        />
    )
}

export default Account_Fix;