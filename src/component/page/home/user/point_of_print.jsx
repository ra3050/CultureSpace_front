import styled from "styled-components";
import Print_Style from "./user_style/print_style";
import { useLayoutEffect, useState } from "react";
import { requestGoodsList, requestTotalSales } from "../../../../Controller/Controller";
import { useNavigate } from "react-router-dom";
import Order from "./order/order";
import Order_State from "./order/order_state";

const Point_Of_Print = (props) => {
    const [equipment, setEquipment] = useState([])
    const [shop, setShop] = useState([])
    const [type, setType] = useState([])
    const [call, setCall] = useState(false);
    const [currentTime, setCurrentTime] = useState();

    const [orderValue, setOrderValue] = useState(false)
    const [orderStateValue, setOrderStateValue] = useState(false)
    const navigation = useNavigate()

    useLayoutEffect(() => {
        requestTotalSales(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }
            setShop(data.shopInfo)
            setEquipment(data.eqInfo)
            setCurrentTime(data.currentTime)
        })

        requestGoodsList(data => {
            if (data?.result) {
                const info = data.info
                setType(info)
            }
        })
    }, [])

    return (
        <>
            <Wrapper>
                <State_Container>
                    <State_In_Container>
                        <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{'인화지 카운트가 \'0\'인경우 인화지를 교체해야합니다'}</p>
                        <p style={{ fontSize: '0.8rem' }}>{'원격 입금전, 고객이 어떤기기에 위치했는지 확인해주세요'}</p>
                    </State_In_Container>
                    <State_In_Container>
                        <Order_Button onClick={() => setOrderValue(prev => !prev)}>
                            <p style={{ fontSize: '0.8rem', margin: '0.25rem' }}>{'소모품주문'}</p>
                        </Order_Button>
                        <Order_Button onClick={() => setOrderStateValue(prev => !prev)}>
                            <p style={{ fontSize: '0.8rem', margin: '0.25rem' }}>{'주문관리'}</p>
                        </Order_Button>
                    </State_In_Container>
                </State_Container>
            </Wrapper>
            {
                shop.map((item, index) => {
                    return (
                        <Print_Style shop={item} equipment={equipment} currentTime={currentTime} />
                    )
                })
            }
            <Order
                orderValue={orderValue}
                setOrderValue={setOrderValue}
                shopInfo={shop}
                orderType={type}
                setCall={setCall}
            />
            <Order_State
                orderStateValue={orderStateValue}
                setOrderStateValue={setOrderStateValue}
                shopInfo={shop}
                setCall={setCall}
                call={call}
            />
        </>
    )
}

const Wrapper = styled.div`
    margin-bottom: 16px;
    background-color: white;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const State_Container = styled.div`
    width: 90%;
    /* border: 0.5px solid #ced4da; */

    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const State_In_Container = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Owner_Input = styled.input`
    
    padding: 0.375rem 0.75rem;
    font-size: 1rem;

    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const State_Colunm_Container = styled.div`
    margin-bottom: 0.375rem;
    
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Order_Button = styled.button`
    border-radius: 0.5rem;
    border: 0.5px solid #ced4da;
`
export default Point_Of_Print;