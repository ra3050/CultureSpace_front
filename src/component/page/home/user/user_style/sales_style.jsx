import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const Sales_Style = (props) => {
    const { day, week, month, setSearchOfFirst, setSearchOfLast, searchDate, handleSearch, chart } = props
    const [chartSize , setChartSize] = useState({width: 0, height: 0});
    const widthRef = useRef();

    useEffect(() => {
        const updateParentWidth = () => {
            if (widthRef.current) {
                const width = widthRef.current.offsetWidth;
                setChartSize({width: width,
                              height: width * 0.6});
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
            <Search_Container>
                <Search_Title>날짜</Search_Title>
                <Search_in_Container>
                    <Search_Date 
                        type="date"
                        onChange={(e) => setSearchOfFirst(e.target.value)}
                    />
                    <p>~</p>
                    <Search_Date 
                        type="date"
                        onChange={(e) => setSearchOfLast(e.target.value)}
                    />
                </Search_in_Container>
                <Search_Button 
                    onClick={() => handleSearch()}
                >
                    검색
                </Search_Button>
            </Search_Container>

            <div name="DataTable">
                <Data_Table>
                    <Data_Title>구분</Data_Title>
                    <Data_Title>결제구분</Data_Title>
                    <Data_Title>매출</Data_Title>
                    <Data_Title>합계매출</Data_Title>
                    <Data_Title>라이센스</Data_Title>
                </Data_Table>

                <Data_Table>
                    <Data_Date_Title>{`당월`}</Data_Date_Title>
                        <Data_Date_Container>

                            <Data_Date_Sub_Container>
                                <Data_Date_Content>카드</Data_Date_Content>
                                <Data_Date_Content>{`${month.card}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>
                            
                            <Data_Date_Sub_Container>
                                <Data_Date_Content>현금</Data_Date_Content>
                                <Data_Date_Content>{`${month.cash}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>

                        </Data_Date_Container>
                    <Data_Date_Title>{`${month.total}`}</Data_Date_Title>
                    <Data_Date_Title>{`${month.licence}`}</Data_Date_Title>
                </Data_Table>

                <Data_Table>
                    <Data_Date_Title>{`금주`}</Data_Date_Title>
                        <Data_Date_Container>

                            <Data_Date_Sub_Container>
                                <Data_Date_Content>카드</Data_Date_Content>
                                <Data_Date_Content>{`${week.card}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>
                            
                            <Data_Date_Sub_Container>
                                <Data_Date_Content>현금</Data_Date_Content>
                                <Data_Date_Content>{`${week.cash}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>

                        </Data_Date_Container>
                    <Data_Date_Title>{`${week.total}`}</Data_Date_Title>
                    <Data_Date_Title>{`${week.licence}`}</Data_Date_Title>
                </Data_Table>

                <Data_Table>
                    <Data_Date_Title>{`금일`}</Data_Date_Title>
                        <Data_Date_Container>

                            <Data_Date_Sub_Container>
                                <Data_Date_Content>카드</Data_Date_Content>
                                <Data_Date_Content>{`${day.card}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>
                            
                            <Data_Date_Sub_Container>
                                <Data_Date_Content>현금</Data_Date_Content>
                                <Data_Date_Content>{`${day.cash}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>

                        </Data_Date_Container>
                    <Data_Date_Title>{`${day.total}`}</Data_Date_Title>
                    <Data_Date_Title>{`${day.licence}`}</Data_Date_Title>
                </Data_Table>

                <Data_Table>
                    <Data_Date_Title>{`검색`}</Data_Date_Title>
                        <Data_Date_Container>

                            <Data_Date_Sub_Container>
                                <Data_Date_Content>카드</Data_Date_Content>
                                <Data_Date_Content>{`${searchDate.card}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>
                            
                            <Data_Date_Sub_Container>
                                <Data_Date_Content>현금</Data_Date_Content>
                                <Data_Date_Content>{`${searchDate.cash}`}</Data_Date_Content>
                            </Data_Date_Sub_Container>

                        </Data_Date_Container>
                    <Data_Date_Title>{`${searchDate.total}`}</Data_Date_Title>
                    <Data_Date_Title>{`${searchDate.licence}`}</Data_Date_Title>
                </Data_Table>
            </div>
            
            <Chart_Container ref={widthRef}>
                <BarChart
                    data={chart}
                    width={chartSize.width}
                    height={chartSize.height}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </Chart_Container>
        </Wrapper>
    )
}

const ContentComponent = (props) => {
    // data: 콘텐츠 데이터, item: 조회구분 (월별, 주별, 일별, 기간별)
    // date값을 화면에 뿌려줌
    const {data, title} = props
    console.log(data)
    
    return (
        <Data_Table key={title}>
            <Data_Date_Title>{`${title}`}</Data_Date_Title>
                <Data_Date_Container>

                    <Data_Date_Sub_Container>
                        <Data_Date_Content>카드</Data_Date_Content>
                        <Data_Date_Content>{`${data.card}`}</Data_Date_Content>
                    </Data_Date_Sub_Container>
                    
                    <Data_Date_Sub_Container>
                        <Data_Date_Content>현금</Data_Date_Content>
                        <Data_Date_Content>{`${data.cash}`}</Data_Date_Content>
                    </Data_Date_Sub_Container>

                </Data_Date_Container>
            <Data_Date_Title>{`${data.total}`}</Data_Date_Title>
            <Data_Date_Title>{`${data.licence}`}</Data_Date_Title>
        </Data_Table>
    )
}

const Wrapper = styled.div`
    background-color: white;
`
const Search_Container = styled.div`
    width: 100%;

    border-top: 1px solid #ced4da;
    border-bottom: 1px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Search_in_Container = styled.div`
    flex: 8;

    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Search_Title = styled.text`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: #F8F9FA;
`
const Search_Date = styled.input`
    margin: 0 4px;
    padding: 1px 2px;
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

// 이하 테이블
const Data_Table = styled(Search_Container)`
    margin-top: 1rem;
`
const Data_Title = styled(Search_Title)`
    padding: 0.25rem;
    padding-left: 0.75rem;

    text-align: left;
`

const Data_Date_Title = styled.text`
    flex: 1;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: left;
    align-self: center;
`
const Data_Date_Container = styled.div`
    flex: 2;
    
    position: relative;
    display: flex;
    flex-direction: column;
`
const Data_Date_Sub_Container = styled.div`
    flex: 1;
    
    position: relative;
    display: flex;
`
const Data_Date_Content = styled(Data_Title)`
    background-color: white;
`

//이하 차트
const Chart_Container = styled.div`
    margin-top: 3rem;
    width: 100%;

    position: relative;
    display: flex;
`

export default Sales_Style;