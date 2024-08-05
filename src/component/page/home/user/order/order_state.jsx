import { useLayoutEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { requestGoodsList, requestOrderList } from "../../../../../Controller/Controller";
import { useNavigate } from "react-router-dom";
import State_Style from "./style/state_style";

const Order_State = (props) => {
    const { orderStateValue, setOrderStateValue, shopInfo, setCall, call } = props;
    const [orderList, setOrderList] = useState([]);
    const [goodsList, setGoodsList] = useState([]);
    const navigation = useNavigate()

    useLayoutEffect(() => {
        requestOrderList(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            if (data.result) {
                setOrderList(data.info)
            } else {
                setOrderList([])
            }
        })

        requestGoodsList(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            if (data.result) {
                setGoodsList(data.info)
            }
        })
    }, [call])

    useLayoutEffect(() => {
        requestOrderList(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            if (data.result) {
                setOrderList(data.info)
            } else {
                setOrderList([])
            }
        })
    }, [])

    return (
        <Modal show={orderStateValue} fullscreen={true} onHide={() => setOrderStateValue(false)}>
            <Modal.Header closeButton>
                <Modal.Title>소모품 주문 상태관리</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    orderList.map(item => (
                        <State_Style item={item} setCall={setCall} goodsList={goodsList} />
                    ))
                }
            </Modal.Body>
        </Modal>
    )
}

export default Order_State