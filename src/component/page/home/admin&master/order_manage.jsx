import { useLayoutEffect, useState } from "react";
import OrderStyle from "./admin_style/order_manage_style";
import { requestGoodsList, requestOrderList } from "../../../../Controller/Controller";
import { useNavigate } from "react-router-dom";

const Order_Manage = (props) => {
    const [orderlist, setOrderList] = useState([]);
    const [goodsList, setGoodsList] = useState([]);
    const navigation = useNavigate();

    useLayoutEffect(() => {
        requestOrderList(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            if (data.result) {
                const list = data?.info?.sort((a, b) => {
                    const typeA = a.order_time.toUpperCase(); // 대소문자 구분 없이 정렬
                    const typeB = b.order_time.toUpperCase();

                    if (typeA < typeB) {
                        return -1;
                    } else if (typeA > typeB) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                setOrderList(list)
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
    }, [])

    return (
        <OrderStyle
            orderlist={orderlist}
            goodsList={goodsList}
        />
    )
}

export default Order_Manage;