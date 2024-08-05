import moment from "moment";
import styled from "styled-components";
import { requestsDeleteOrder, requestsSuccessOrder } from "../../../../../Controller/Controller";

const OrderStyle = (props) => {
    const { orderlist, goodsList } = props;

    const completeOrder = (item) => {
        const info = { order_id: item.order_id };
        requestsSuccessOrder(info, data => {
            if (data.result) {
                window.alert('주문을 성공적으로 처리하였습니다.')
                window.location.reload()
            }
        })
    }

    const deleteOrder = (item) => {
        const info = { order_id: item.order_id };
        requestsDeleteOrder(info, data => {
            if (data.result) {
                window.alert('주문을 성공적으로 삭제하였습니다.')
                window.location.reload();
            }
        })
    }

    return (
        <Wrapper>
            <Table_Container>
                <Table_Title>매장이름</Table_Title>
                <Table_Title>주문자ID</Table_Title>
                <Table_Title>주문물품</Table_Title>
                <Table_Title>주문가격</Table_Title>
                <Table_Title>주문일자</Table_Title>
                <Table_Title>주문상태</Table_Title>
                <Table_Title>/</Table_Title>
            </Table_Container>
            {
                orderlist.map(item => {
                    if (!item.state) {
                        if (item.delete_yn === 'n') {
                            return (
                                <Table_Container>
                                    <Table_Content>
                                        {
                                            item.shop_name
                                        }
                                    </Table_Content>
                                    <Table_Content>{item.owner_id}</Table_Content>
                                    <Table_Content>
                                        {
                                            goodsList.map(data => {
                                                if (data.good_id === item.good_id) {
                                                    return data.good_name
                                                }
                                            })
                                        }
                                    </Table_Content>
                                    <Table_Content>{item.order_price}</Table_Content>
                                    <Table_Content>{moment(item.order_time).format('YYYY-MM-DD hh:mm:ss')}</Table_Content>
                                    <Table_Content>{item.state ? '처리완료' : '처리전'}</Table_Content>
                                    <Table_Content>
                                        <Table_button onClick={() => completeOrder(item)}>주문처리</Table_button>
                                        <Table_button onClick={() => deleteOrder(item)}>삭제</Table_button>
                                    </Table_Content>
                                </Table_Container>
                            )
                        }
                    }
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
`

//이하 테이블
const Table_Container = styled.div`
    margin-top: 1rem;
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

const Table_Content = styled.div`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: white;
`

const Table_button = styled.button`
    margin: .25rem;
    padding: .25rem;
    line-height: 1.5rem;
    font-size: 0.75em;
    text-align: center;
    align-self: center;
    border-radius: .25rem;
    border: 1px solid #ced4da;
`

export default OrderStyle;