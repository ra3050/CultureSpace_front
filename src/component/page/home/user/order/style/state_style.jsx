import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { requestOrderCancel } from "../../../../../../Controller/Controller";

const State_Style = (props) => {
    const { item, setCall, goodsList } = props;
    const navigation = useNavigate()

    const handleOrderButton = () => {
        if (window.confirm(`정말로 주문을 취소하시곘습니까?`)) {
            const info = {
                order_id: item.order_id
            }
            requestOrderCancel(info, data => {
                if (data?.response?.status === 401) {
                    navigation('/')
                }
                if (data.result) {
                    setCall(prev => !prev)
                    alert('주문이 취소되었습니다')
                }

            })
        } else {

        }
    }

    return (
        <Order_Container>
            <Order_In>
                <Text>
                    {
                        goodsList?.map(data => {
                            if (item.good_id === data.good_id) {
                                return (data.good_name)
                            }
                        })
                    }
                </Text>
            </Order_In>
            <Order_In>
                <Text>{`주문수량: ${item.good_cnt}`}</Text>
            </Order_In>
            <Order_In>
                <Text>
                    {
                        goodsList?.map(data => {
                            if (item.good_id === data.good_id) {
                                return (`가격: ${data.good_price}`)
                            }
                        })
                    }</Text>
            </Order_In>
            <Order_In>
                <Text>{`합계금액: ${item.order_price}`}</Text>
            </Order_In>
            <Order_In>
                <Text>{item.shop_name}</Text>
            </Order_In>
            <Order_In>
                <button onClick={() => handleOrderButton()}>
                    주문취소
                </button>
            </Order_In>
        </Order_Container>
    )
}

const Order_Container = styled.div`
    padding: 0.5rem;
    border: 0.5px solid #ced4da;
    margin : 0.25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    @media ${({ theme }) => theme.device.computer} {
        width: 100%;
    }
    
    @media ${({ theme }) => theme.device.laptop} {
        width: 100%;
    }

    @media ${({ theme }) => theme.device.tablet} {
        width: 100%;
    }

    @media ${({ theme }) => theme.device.mobile_big} {
        
        flex-direction: column;
    }
    @media ${({ theme }) => theme.device.mobile_small} {
        
        flex-direction: column;
    }
`

const Order_In = styled.div`
   margin : 0.25rem;
    @media ${({ theme }) => theme.device.computer} {
        flex: 1;
    }
    
    @media ${({ theme }) => theme.device.laptop} {
        flex: 1;
    }

    @media ${({ theme }) => theme.device.tablet} {
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.mobile_big} {
        
        padding: 0px 15px;    
    }
    @media ${({ theme }) => theme.device.mobile_small} {
        
        padding: 0px 15px;    
    }
`

const Text = styled.p`
    width: 100%;
`

export default State_Style