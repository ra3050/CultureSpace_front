import { useContext, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "./layout";
import { requestChangeAccessToken } from "../Controller/Controller";

const Sidebar = (props) => {
    const { userData } = useContext(AppContext);
    const [sortedData, setSortedData] = useState([]);

    useLayoutEffect(() => {
        console.log(userData)
        const sort = {};
        userData.map(item => {
            const key = item.user_type === 'USER_MASTER' ? item.user_id : item.user_type === 'USER_OWNER' ? item.ref_id : 'null';
            
            if (!sort[key]) {
                sort[key] = {info: [item]};
            } else {
                sort[key].info = [...sort[key].info, item]
            }
        })
        
        const result = Object.values(sort)
        setSortedData(result)
    }, [userData])
    

    const handleToButton = (e) => {
        const clickID = e.target.value;
        const info = {
            lower_user_id: clickID
        }
        requestChangeAccessToken(info, data => {
            if (data.result) {
                window.location.reload()
            }
        })
    }

    return(
        <Wrapper>
            {
                sortedData.map(item => {
                    const data = item?.info.sort((a, b) => {
                        const typeA = a.user_type.toUpperCase(); // 대소문자 구분 없이 정렬
                        const typeB = b.user_type.toUpperCase();
                        
                        if (typeA < typeB) {
                            return -1;
                        } else if (typeA > typeB) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    
                    return data?.map(item2 => {
                        if (item2.user_type === 'USER_MASTER') {
                            return (
                                <Master_Button 
                                    value={item2.user_id}
                                    onClick={e => handleToButton(e)}
                                >
                                    {item2.user_name}
                                </Master_Button>
                            )
                        }
                        if (item2.user_type === 'USER_OWNER') {
                            return (
                                <Owner_Button 
                                    value={item2.user_id}
                                    onClick={e => handleToButton(e)}
                                >
                                    {'○ '+item2.user_name}
                                </Owner_Button>
                            )
                        }
                    })
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    @media ${({ theme }) => theme.device.computer } {
        max-width: calc((100% - 1140px + 6rem) / 2);
        width: 100%;
        padding: 0px 15px;    
    }
    
    @media ${({ theme }) => theme.device.laptop } {
        max-width: 992px;
        width: 100%;
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.tablet } {
        max-width: 720px;
        width: 100%;
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.mobile_big } {
        width: 100%;
        padding: 0px 15px;    
    }
    @media ${({ theme }) => theme.device.mobile_small } {
        width: 100%;
        padding: 0px 15px;    
    }
    height: 100vh;
    margin-top: 1rem;

    align-self: left;
    display: flex;
    flex-direction: column;
    position: relative;
`

const Master_Button = styled.button`
    font-size: 1.75rem;
    line-height: 1.2;
    margin: 0 0 1rem 1rem;
    text-align: left;

    align-self: left;
`

const Owner_Button = styled.button`
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 1rem 1.5rem;
    text-align: left;

    position: relative;
`

export default Sidebar;