import styled from "styled-components";
import { useState } from "react";
import { requestOrder } from "../../../../../../Controller/Controller";
import { useNavigate } from "react-router-dom";

const Order_Style = (props) => {
    const { item, shopInfo, setCall } = props; 
    const price = parseInt(item.good_price)
    const [orderCount, setOrderCount] = useState(0)
    const [orderShop, setOrderShop] = useState(0);  // index
    const navigation = useNavigate()
    
    const handleOrderButton = () => {
        if (!orderCount) {
            window.alert('수량을 다시 확인해주세요')
        } else {
            console.log(shopInfo[orderShop])
            if (window.confirm(`주문 내용을 확인해주세요\n주문품목: ${item.good_name}\n주문수량: ${orderCount}\n총합: ${price * orderCount}\n배송장소: ${shopInfo[orderShop].shop_name}`)) {
                const info = {
                    good_id: item.good_id,
                    good_cnt: orderCount,
                    shop_id: shopInfo[orderShop].shop_id,
                    shop_name: shopInfo[orderShop].shop_name,
                    order_price: orderCount * price
                }
                requestOrder(info, data => {
                    if (data?.response?.status === 401) {
                        navigation('/')
                    }
                    console.log(data)
                    if (data.result) {
                        window.alert('주문완료')
                        setCall(prev => !prev)
                    }
                })   
            } else {
    
            }
        }
    }

    return (
        <Order_Container>
            <Order_In>
                <Text>{item.good_name}</Text>
            </Order_In>
            <Order_In>
                <Input 
                    placeholder="주문수량입력" 
                    onChange={e => {
                        setOrderCount(parseInt(e.target.value))
                    }}
                    type="number"
                    min='0'
                    max='30'
                    
                />
            </Order_In>
            <Order_In>
                <Text>{`가격: ${price}`}</Text>
            </Order_In>
            <Order_In>
                <Text>{`합계금액: ${orderCount * price}`}</Text>    
            </Order_In>
            <Order_In>
            <select onChange={e => setOrderShop(e.target.value)}>
                {shopInfo.map((element, index) => (
                    <option 
                        value={index}
                    >
                        {element.shop_name}
                    </option>
                ))}
            </select>
            </Order_In>
            <Order_In>
                <button onClick={() => handleOrderButton()}>
                    주문하기
                </button>
            </Order_In>
        </Order_Container>
    )
}

const Order_Container = styled.div`
    width: 100%;
    padding: 0.5rem;
    border: 0.5px solid #ced4da;
    margin : 0.25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    @media ${({ theme }) => theme.device.computer } {
        width: 100%;
    }
    
    @media ${({ theme }) => theme.device.laptop } {
        width: 100%;
    }

    @media ${({ theme }) => theme.device.tablet } {
        width: 100%;
    }

    @media ${({ theme }) => theme.device.mobile_big } {
        
        flex-direction: column;
    }
    @media ${({ theme }) => theme.device.mobile_small } {
        
        flex-direction: column;
    }
`

const Order_In = styled.div`
    margin : 0.25rem;
    @media ${({ theme }) => theme.device.computer } {
        flex: 1;
    }
    
    @media ${({ theme }) => theme.device.laptop } {
        flex: 1;
    }

    @media ${({ theme }) => theme.device.tablet } {
        flex: 1;
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.mobile_big } {
        flex: 1;
        padding: 0px 15px;    
    }
    @media ${({ theme }) => theme.device.mobile_small } {
        flex: 1;
        padding: 0px 15px;    
    }
`

const Input = styled.input`
    width: 100%;
`

const Text = styled.p`
    width: 100%;
`

export default Order_Style