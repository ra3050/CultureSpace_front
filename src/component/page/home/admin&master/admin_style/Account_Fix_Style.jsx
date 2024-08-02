import styled from "styled-components"

const Account_Fix_Style = (props) => {
    const { userData, masterData, eqlist, shoplist, equipment, brand } = props;
    const { setShoplist, setEquipment ,setEqlist } = props;
    const { setUserName, setTelNumber, setAddress, setEmail, setDesc, setRef } = props;
    const { handleAddShop, handleSaveShop, handleAddEquipment, handleSaveUserinfo, handleDeleteUserAccount, handleDeleteShop } = props;
    
    return (
        <Wrapper>
            <Owner_Container>
                <Owner_in_Container>
                    <h2 style={{fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '0.5rem'}}>계정관리</h2>
                    <p style={{fontSize: '0.8rem', marginBottom: '1rem'}}></p>

                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>사용자 아이디</p>
                    <Owner_Input placeholder={userData.user_id} disabled/>
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>사용자 이름</p>
                    <Owner_Input 
                        placeholder={userData.user_name}
                        onChange={e => setUserName(e.target.value)}    
                    />
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>사용자 전화번호</p>
                    <Owner_Input 
                        placeholder={userData.user_tel}
                        onChange={e => setTelNumber(e.target.value)}
                    />
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>사용자 주소</p>
                    <Owner_Input 
                        placeholder={userData.user_addr}
                        onChange={e => setAddress(e.target.value)}    
                    />
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>사용자 이메일</p>
                    <Owner_Input 
                        placeholder={userData.user_email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>사용자 정보</p>
                    <Owner_Input 
                        placeholder={userData.user_info}
                        onChange={e => setDesc(e.target.value)}    
                    />
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>담당 총판관리자</p>
                    <Owner_Select
                        disabled={userData.user_type === 'USER_MASTER' ? true : false}
                        onChange={e => setRef(e.target.value)}
                    >
                        <option value={false}>=====선택=====</option>
                        {
                            masterData.map(item => {
                                if (item.user_id === userData.ref_id) {
                                    return (<option value={item.user_id} selected>{item.user_id}</option>)
                                } else {
                                    return (<option value={item.user_id}>{item.user_id}</option>)
                                }
                            })
                        }
                    </Owner_Select>

                    {/* <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>라이센스</p>
                    <Licence_Container>
                        <Check_box type="checkbox"/>
                        <Licence_In_Container>
                            <p style={{fontSize: '0.8rem', lineHeight: 1.2}}>1번</p>
                            <Licence_Royalty placeholder="라이센스 로열티율" />
                        </Licence_In_Container>
                    </Licence_Container>

                    <Licence_Container>
                        <Check_box type="checkbox"/>
                        <Licence_In_Container>
                            <p style={{fontSize: '0.8rem', lineHeight: 1.2}}>2번</p>
                            <Licence_Royalty placeholder="라이센스 로열티율" />
                        </Licence_In_Container>
                    </Licence_Container>

                    <Licence_Container>
                        <Check_box type="checkbox"/>
                        <Licence_In_Container>
                            <p style={{fontSize: '0.8rem', lineHeight: 1.2}}>3번</p>
                            <Licence_Royalty placeholder="라이센스 로열티율" />
                        </Licence_In_Container>
                    </Licence_Container>

                    <Licence_Container>
                        <Check_box type="checkbox"/>
                        <Licence_In_Container>
                            <p style={{fontSize: '0.8rem', lineHeight: 1.2}}>4번</p>
                            <Licence_Royalty placeholder="라이센스 로열티율" />
                        </Licence_In_Container>
                    </Licence_Container> */}
                </Owner_in_Container>
                <Row_Container>
                    <Create_Button onClick={() => handleAddShop()}>매장추가</Create_Button>
                    <Create_Button onClick={() => handleSaveUserinfo()}>저장</Create_Button>
                    <Create_Button onClick={() => handleDeleteUserAccount()}>계정삭제</Create_Button>
                </Row_Container>
            </Owner_Container>

            {
                shoplist.map((item, index) => {
                    if (item.delete_yn === 'y') {
                        return
                    }
                    
                    const shopVlaue = (
                        <Owner_Container>
                            <Owner_in_Container>
                                <h2 style={{fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '0.5rem'}}>매장정보</h2>
                                <p style={{fontSize: '0.8rem', marginBottom: '1rem'}}></p>

                                <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 이름</p>
                                <Owner_Input 
                                    placeholder={item.shop_name}
                                    onChange={e => {
                                        const shop = shoplist
                                        shop[index].shop_name = e.target.value
                                        setShoplist(shop)
                                    }}
                                />
                                <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>브랜드 이름</p>
                                <Owner_Select 
                                    onChange={e => {
                                        const shop = shoplist
                                        shop[index].brand_code = e.target.value
                                        setShoplist(shop)
                                        console.log('asdasdas')
                                    }}
                                    
                                >
                                    {
                                        brand.map(item2 => {
                                            if (item2.key.indexOf(item.brand_code) !== -1) {
                                                return <option value={item2.key} selected>{item2.name}</option>
                                            } else {
                                                return <option value={item2.key}>{item2.name}</option>
                                            }
                                        })
                                    }
                                </Owner_Select>
                                <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 주소</p>
                                <Owner_Input 
                                    placeholder={item.shop_address}
                                    onChange={e => {
                                        const shop = shoplist
                                        shop[index].shop_address = e.target.value
                                        setShoplist(shop)
                                    }}    
                                />
                                <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 우편번호</p>
                                <Owner_Input 
                                    placeholder={item.shop_zipcode}
                                    onChange={e => {
                                        const shop = shoplist
                                        shop[index].shop_zipcode = e.target.value
                                        setShoplist(shop)
                                    }}     
                                />
                                <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 전화번호</p>
                                <Owner_Input 
                                    placeholder={item.shop_tel}
                                    onChange={e => {
                                        const shop = shoplist
                                        shop[index].shop_tel = e.target.value
                                        setShoplist(shop)
                                    }} 
                                />

                                <Table_Container>
                                    <Table_Title>기기이름</Table_Title>
                                    <Table_Title>기기타입</Table_Title>
                                    <Table_Title>기기설치일</Table_Title>
                                    <Table_Title>기기고유주소(mac)</Table_Title>
                                </Table_Container>

                                {
                                    eqlist.map((item2, index) => {
                                        if (item.delete_yn === 'y') {
                                            return
                                        }

                                        if (item?.shop_id === item2?.shop_id) {
                                            return (
                                                <Table_Container>
                                                    <Table_Input 
                                                        placeholder={item2?.room_name} 
                                                        onChange={e => {
                                                            let equipment = eqlist
                                                            equipment[index].room_name = e.target.value
                                                            setEqlist(equipment)
                                                            console.log(e.target.value)
                                                        }}    
                                                    />
                                                    <Table_Select
                                                        onChange={e => {
                                                            let equipment = eqlist
                                                            equipment[index].equipment_type = e.target.value
                                                            console.log(e.target.value)
                                                            setEqlist(equipment)
                                                        }}    
                                                    >
                                                    {
                                                        equipment.map(item3 => {
                                                            if (item3.key === item2?.equipment_type) {
                                                                return <option value={item3.key} selected>{item3.key}</option>           
                                                            } else {
                                                                return <option value={item3.key}>{item3.key}</option>           
                                                            }
                                                        })
                                                    }
                                                    </Table_Select>
                                                    <Table_Input 
                                                        placeholder={item2?.install_time} 
                                                        onChange={e => {
                                                            let equipment = eqlist
                                                            equipment[index].install_time = e.target.value
                                                            setEqlist(equipment)
                                                        }} 
                                                    />
                                                    <Table_Input 
                                                        placeholder={item2?.mac_addr} 
                                                        onChange={e => {
                                                            let equipment = eqlist
                                                            equipment[index].mac_addr = e.target.value
                                                            setEqlist(equipment)
                                                        }} 
                                                    />
                                                </Table_Container>
                                            )
                                        }
                                    })
                                }
                                

                            </Owner_in_Container>

                            <Row_Container>
                                <Create_Button 
                                    value={index}
                                    onClick={e => handleAddEquipment(e)}
                                >기기추가</Create_Button>
                                <Create_Button 
                                    value={index} 
                                    onClick={e => handleSaveShop(e)}
                                >저장</Create_Button>
                                <Create_Button 
                                    value={index}
                                    onClick={() => handleDeleteShop(index)}
                                >매장삭제</Create_Button>
                            </Row_Container>
                                
                        </Owner_Container>
                    )
                    return shopVlaue;
                })
            }

            {/* <Owner_Container>
                <Owner_in_Container>
                    <h2 style={{fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '0.5rem'}}>매장정보</h2>
                    <p style={{fontSize: '0.8rem', marginBottom: '1rem'}}></p>

                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 이름</p>
                    <Owner_Input placeholder=""/>
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>브랜드 이름</p>
                    <Owner_Input placeholder=""/>
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 주소</p>
                    <Owner_Input placeholder=""/>
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 우편번호</p>
                    <Owner_Input placeholder=""/>
                    <p style={{fontSize: '1rem', marginBottom: '0.8rem'}}>매장 전화번호</p>
                    <Owner_Input placeholder=""/>

                    <Table_Container>
                        <Table_Title>기기이름</Table_Title>
                        <Table_Title>기기타입</Table_Title>
                        <Table_Title>기기설치일</Table_Title>
                        <Table_Title>기기고유주소(mac)</Table_Title>
                    </Table_Container>

                </Owner_in_Container>
                    <Create_Button>기기추가</Create_Button>
                    <Create_Button>저장</Create_Button>
                    <Create_Button>매장삭제</Create_Button>
            </Owner_Container> */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Owner_Container = styled.div`
    width: 75%;
    border: 0.5px solid #ced4da;
    margin-bottom: 1rem;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Owner_in_Container = styled.div`
    padding: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Owner_Input = styled.input`
    margin-bottom: 1.5rem;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;

    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const Owner_Select = styled.select`
    margin-bottom: 1.5rem;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    

    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const Row_Container = styled.div`
    margin-bottom: 3rem;
    
    align-self: center;
    position: relative;
    display: flex;
    flex-direction: row;
`

const Licence_In_Container = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Check_box = styled.input`
    margin-right: 0.25rem;
    
    align-self: center;
`

const Licence_Royalty = styled.input`
    font-size: 0.8rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const Table_Container = styled.div`
    margin-top: 3rem;
    width: 100%;

    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Table_Title = styled.div`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: #F8F9FA;
`

const Table_Input = styled.input`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;

    background-color: white;
    border: 1px solid #ced4da;
`

const Table_Select = styled.select`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;

    background-color: white;
    border: 1px solid #ced4da;
`

const Create_Button = styled.button`
    margin-top: 3rem;
    margin-left: 1rem;
    margin-right: 1rem;
    width: 150px;
    height: 50px;

    align-self: center;
    font-size: 1rem;
    border-radius: 0.25rem;

    color: white;
    background-color: black;
`

export default Account_Fix_Style;