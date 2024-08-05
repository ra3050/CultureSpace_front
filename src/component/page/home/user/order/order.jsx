import Modal from "react-bootstrap/Modal";
import Order_Style from "./style/order_style";

const Order = (props) => {
    const { orderValue, setOrderValue, shopInfo, orderType, setCall } = props;

    return (
        <Modal show={orderValue} fullscreen={true} onHide={() => setOrderValue(false)}>
            <Modal.Header closeButton>
                <Modal.Title>소모품 주문</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    orderType.map(item => (
                        <Order_Style item={item} shopInfo={shopInfo} setCall={setCall} />
                    ))
                }
            </Modal.Body>
        </Modal>
    )
}

export default Order