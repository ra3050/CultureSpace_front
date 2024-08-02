import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import moment from "moment";

const Calendar_Style = (props) => {
    const { calendarData, clickInfo, equipment, sheets } = props
    const { setStartDate, setEndDate } = props;
    const { handleSearchDateButton, handleCalendarClick, handleSearch } = props
    const [ calendarSize, setCalendarSize ] = useState({width: 0, height: 0});
    const widthRef = useRef();

    useEffect(() => {
        const updateParentWidth = () => {
            if (widthRef.current) {
                const width = widthRef.current.offsetWidth;
                setCalendarSize({width: width,
                     height: width});
            }
          }

        updateParentWidth();
        window.addEventListener('resize', updateParentWidth);
    
        return () => {
          window.removeEventListener('resize', updateParentWidth);
        };
    }, [])

    return (
        <Wrapper>
            <Result_Col_Container ref={widthRef}>
                <Result_Row_Container>
                    <Result_Title>기기</Result_Title>
                    <Result_in_Container >
                        <select name="equipmentList" onChange={e => handleSearch(e)}>
                            <option value='default'>기기전체</option>
                            {equipment.map((item, index) => (
                                <option value={item.equipment_id}>{item.room_name}</option>
                            ))}
                        </select>
                    </Result_in_Container>
                </Result_Row_Container>

                <Result_Row_Container>
                    <Result_Title>날짜</Result_Title>
                    <Result_in_flex6_Container >
                        <Search_Date type="date" onChange={e => setStartDate(e.target.value)}/>
                        <p>~</p>
                        <Search_Date type="date" onChange={e => setEndDate(e.target.value)}/>
                    </Result_in_flex6_Container>
                    <Search_Button onClick={() => handleSearchDateButton()}>
                        검색
                    </Search_Button>
                </Result_Row_Container>

                <Result_Row_Container>
                    <Result_Title>인화지</Result_Title>
                    <Result_in_Container>
                        <Result_Value>{sheets}장</Result_Value>
                    </Result_in_Container>
                </Result_Row_Container>
            </Result_Col_Container>

            <Calendar width={calendarSize.width} height={calendarSize.height}>
                <FullCalendar   
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                    initialView={'dayGridMonth'}
                    locale={'ko'}
                    headerToolbar={
                        {
                            start: 'today', 
                            center: 'title',
                            end: 'prev,next' 
                        }
                    }
                    height={"85vh"}
                    dateClick={arg => handleCalendarClick(arg)}
                    events={calendarData}
                />
            </Calendar>

            <div> 
                <Data_Table>
                    <Data_Title>촬영시간</Data_Title>
                    <Data_Title>프레임이름</Data_Title>
                    <Data_Title>출력장수</Data_Title>
                    <Data_Title>결제구분</Data_Title>
                    <Data_Title>금액</Data_Title>
                    <Data_Title>결제금액</Data_Title>
                    <Data_Title>라이센스</Data_Title>
                </Data_Table>
                {clickInfo?.map((item, index) => (
                    <Data_Table>
                        <Data_Date_Content>{moment(item.sale_time).format('hh:mm:ss')}</Data_Date_Content>
                        <Data_Date_Content>{item.frame_code}</Data_Date_Content>
                        <Data_Date_Content>{item.print_count}</Data_Date_Content>
                        <Data_Date_Content>{item.payment_method === 'METHOD_001' ? '카드' : item.payment_method === 'METHOD_001' ? '현금' : '원격입금'}</Data_Date_Content>
                        <Data_Date_Content>{item.sale_fare}</Data_Date_Content>
                        <Data_Date_Content>{item.real_price}</Data_Date_Content>
                        <Data_Date_Content>0</Data_Date_Content>
                    </Data_Table>
                    
                ))}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
`
const Result_Col_Container = styled.div`
    width: 100%;

    border-top: 0.5px solid #ced4da;
    border-bottom: 0.5px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: column;
`
const Result_Row_Container = styled.div`
    width: 100%;

    border-top: 0.5px solid #ced4da;
    border-bottom: 0.5px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Result_in_Container = styled.div`
    flex: 8;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    position: relative;
    display: flex;
    flex-direction: row;
`

const Result_in_flex6_Container = styled.div`
    flex: 7;

    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    position: relative;
    display: flex;
    flex-direction: row;
`

const Result_Title = styled.text`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: #F8F9FA;
`
const Result_Value = styled.text`
    margin: 0 4px;
    padding: 1px 2px;
`
//이하 켈린더
const Calendar = styled.div`
    margin-top: 3rem;
`

//이하 테이블
// 이하 테이블
const Data_Table = styled.div`
    margin-top: 1rem;
    width: 100%;

    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Data_Title = styled.text`
    padding: 0.25rem;
    padding-left: 0.75rem;

    text-align: left;
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;

    text-align: center;
    align-self: center;

    background-color: #F8F9FA;
`

const Data_Date_Content = styled(Data_Title)`
    background-color: white;
`

const Search_Date = styled.input`
    
`

const Search_Button = styled.button`
    flex: 1;
    height: 50%;
    padding: 0.25rem;

    font-size: 0.75em;
    line-height: 1.5rem;
    
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    
    align-self: center;
`

export default Calendar_Style;