import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

const Print_Style = (props) => {
    const { shop, equipment, currentTime } = props;
    const [click, setClick] = useState(false);
    const [eqClick, setEqClick] = useState(false);
    const [shopState, setShopState] = useState(true);
    const [chooseEq, setChooseEq] = useState({});

    const title = () => {
        let value = shop.shop_name;
        return value;
    }

    const calcShopState = () => {
        let result = true;
        equipment.map(item => {
            if (item.remained_sheets <= 0) {
                result = false
            }
            if (item.last_login_time) {
                // 시작 시간
                const startTime = moment(currentTime, 'YYYY-MM-DD HH:mm:ss').add(9, 'h');
                        
                // 종료 시간
                const endTime = moment(item.last_login_time, 'YYYY-MM-DD HH:mm:ss');
    
                // 두 시간 간격 계산
                const duration = moment.duration(endTime.diff(startTime));
    
                // 간격을 시간, 분, 초로 변환
                const hours = duration.asHours();
                const minutes = duration.asMinutes();
                const seconds = duration.asSeconds();
                console.log(startTime, endTime);
                console.log(hours, minutes, seconds);
    
                if (minutes > 20) {
                    result = false
                }
            } else {
                result = false
            }
        })

        return result
    }

    const equipmentState = (item) => {  // item: 기기정보
        if (item.remained_sheets <= 0) {
            return '기기상태  🔴';
        }

        if (item.last_login_time) {
            // 시작 시간
            const startTime = moment(currentTime, 'YYYY-MM-DD HH:mm:ss').add(9, 'h');
                    
            // 종료 시간
            const endTime = moment(item.last_login_time, 'YYYY-MM-DD HH:mm:ss');

            // 두 시간 간격 계산
            const duration = moment.duration(endTime.diff(startTime));

            // 간격을 시간, 분, 초로 변환
            const hours = duration.asHours();
            const minutes = duration.asMinutes();
            const seconds = duration.asSeconds();
            console.log(startTime, endTime);
            console.log(hours, minutes, seconds);

            if (minutes < 21) {
                return '기기상태 🟢';
            } else {

                return '기기상태  🔴';
            }
        } else {
            return '기기상태  🔴';
        }
    }

    return (
        <Wrapper onClick={() => {
            setClick(prev => !prev)
            if (eqClick) {
                setEqClick(prev => !prev)
            }
        }}>
            <State_Container check={true}>
                <State_In_Container>
                    <h2 style={{fontSize: '1rem', fontWeight: 500, lineHeight: 1.2, margin: '0.5rem', textAlign: 'center'}}>{title()}</h2>
                    <p style={{fontSize: '1rem', fontWeight: 400, lineHeight: 1.2, margin: '0.5rem', alignSelf: 'flex-end'}}>{calcShopState() ? '기기상태  🟢' : '기기상태  🔴'} </p>
                </State_In_Container>
                {
                    equipment.map(item => {
                        // 시간비교함수 삽입
                        let comp;
                        if (item.shop_id === shop.shop_id) {
                            comp = (
                                <Equipment_In_Container check={click} onClick={e => {
                                    if (!eqClick) {
                                        setEqClick(prev => !prev);
                                    } 
                                    setChooseEq(item);
                                    e.stopPropagation();
                                }}>
                                    <h2 style={{fontSize: '1rem', fontWeight: 500, lineHeight: 1.2, margin: '0.5rem', textAlign: 'center'}}>{item.room_name}</h2>
                                    <p style={{fontSize: '1rem', fontWeight: 400, lineHeight: 1.2, margin: '0.5rem', alignSelf: 'flex-end'}}>{equipmentState(item)} </p>
                                </Equipment_In_Container>
                            )
                        }
                        return comp;
                    })    
                }
            </State_Container>
            

            <State_Container check={eqClick}>
                <State_Colunm_Container>
                    <p style={{fontSize: '0.8rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1rem'}}>{'상태코드 : {stateCode}'} </p>
                </State_Colunm_Container>

                <State_Colunm_Container>
                    <p style={{fontSize: '0.8rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1rem'}}>{`인화지잔량: ${chooseEq?.remained_sheets}`} </p>
                </State_Colunm_Container>

                <State_Colunm_Container>
                    <Create_Button
                        onClick={e =>{
                            e.stopPropagation();
                        }}
                    >
                        입금
                    </Create_Button>
                </State_Colunm_Container>
            </State_Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 16px;
    background-color: white;
    border: 0.5px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const State_Container = styled.div`
    width: 90%;
    ${props => !props.check && 'height: 0px;'}
    overflow: hidden;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const State_In_Container = styled.div`
    margin: 3rem;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Equipment_In_Container = styled.div`
    margin: 0.5rem 3rem;
    position: relative;
    ${props => !props.check ? 'display: none;' : 'display: flex;'}
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    border: 0.5px solid #ced4da;
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

//이하 테이블
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

const Table_Content = styled.div`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: white;
`

const Create_Button = styled.button`
    padding: 0.5rem;

    align-self: center;
    font-size: 1rem;
    border-radius: 0.25rem;

    background-color: #ced4da;
`


export default Print_Style;