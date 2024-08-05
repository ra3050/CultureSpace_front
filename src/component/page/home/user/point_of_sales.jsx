import Sales_Style from "./user_style/sales_style";
import { useEffect, useLayoutEffect, useState } from "react";
import { requestTotalSales } from "../../../../Controller/Controller";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const salesType = (card, cash, total, licence) => {
    return {
        card: card ? card : 0,
        cash: cash ? cash : 0,
        total: total ? total : 0,
        licence: licence ? licence : 0
    }
}

export const calcToday = (currentDay, info, callback) => {
    var card = 0
    var cash = 0
    var licence = 0
    info.map((item, indx) => {
        const infoDate = moment(item.sale_time).format('YYYY-MM-DD')
        if (infoDate === currentDay) {
            if (item.payment_method === 'METHOD_001') {

                card += item.real_price
            } else if (item.payment_method === 'METHOD_002') {

                cash += item.real_price
            }
            licence += item.royalty_price
        }
    })

    const value = salesType(card, cash, card + cash, licence)
    callback(value)
}

export const calcToWeek = (currentWeek, info, callback) => {
    var card = 0
    var cash = 0
    var licence = 0
    let day = [0, 1, 2, 3, 4, 5, 6];

    day.map(item => {
        const currentDay = moment().week(currentWeek).day(item).format('YYYY-MM-DD')
        // console.log(currentDay)
        calcToday(currentDay, info, data => {
            card += data.card
            cash += data.cash
            licence += data.licence
        })
    })

    const value = salesType(card, cash, card + cash, 0)
    callback(value)
}

export const calcToSearch = (startDate, endDate, info, callback) => {
    /**
     * 날짜를 format형태로 가져오면안됩니다
     */

    let refDayList = []
    let value = true
    while (value) {
        const start = startDate.format('YYYY-MM-DD')
        const end = endDate.format('YYYY-MM-DD');
        refDayList = [...refDayList, start]
        startDate.add(1, 'day')

        if (start === end) {
            value = false
        }
    }

    var card = 0
    var cash = 0
    var licence = 0
    info.map(item => {
        const time = moment(item.sale_time).format('YYYY-MM-DD')
        if (refDayList.indexOf(time) !== -1) {

            if (item.payment_method === 'METHOD_001') {
                card += item.real_price
            } else if (item.payment_method === 'METHOD_002') {
                cash += item.real_price
            }
            licence += item.royalty_price
        }
    })
    const saleInfo = salesType(card, cash, card + cash, licence)
    callback(saleInfo)
}

const Point_Of_Sales = (props) => {
    const [salesInfo, setSalesInfo] = useState();
    const [day, setDay] = useState(salesType())
    const [week, setWeek] = useState(salesType())
    const [month, setMonth] = useState(salesType())
    const [searchOfFirst, setSearchOfFirst] = useState()
    const [searchOfLast, setSearchOfLast] = useState()
    const [searchDate, setSearchDate] = useState(salesType())
    const [chart, setChart] = useState([])
    const navigation = useNavigate();

    useEffect(() => {
        requestTotalSales(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            const saleInfo = data.info;
            const currentDate = moment().format('YYYY-MM-DD')       // 당일 날짜로 변경필요
            setSalesInfo(saleInfo)

            calcToday(currentDate, saleInfo, data => { // 당일매출계산
                console.log(data)
                setDay(data);
            });

            const currentWeek = moment().week()  //당주로 변경해야함
            calcToWeek(currentWeek, saleInfo, data => {
                console.log(data)
                setWeek(data)
            })

            // 현재 날짜를 가져옵니다.
            const today = moment();
            // 현재 월의 연도와 월을 가져옵니다.
            const year = today.year();
            const month = today.month(); // 월은 0부터 시작하므로 0~11로 표현됩니다.

            // 현재 월의 1일을 가져옵니다.
            const firstDayOfMonth = moment([year, month, 1]); // today.startOf('month')
            const lastDayOfMonth = moment([year, month]).endOf('month')// today.endOf('month');
            calcToSearch(firstDayOfMonth, lastDayOfMonth, saleInfo, data => {
                console.log(data)
                setMonth(data)
            })

            let newChart = []
            for (let i = 0; i < month + 1; i++) {
                const startDayOfMonth = moment([year, i, 1]);
                const endDayOfMonth = moment([year, i]).endOf('month')
                calcToSearch(startDayOfMonth, endDayOfMonth, saleInfo, data => {
                    console.log(data.total)
                    newChart = [...newChart, { name: `${i + 1}월`, uv: data.total }]
                })
            }
            setChart(newChart)
        })
    }, [])

    const handleSearch = () => {
        const startDate = moment(searchOfFirst)
        const endDate = moment(searchOfLast)
        calcToSearch(startDate, endDate, salesInfo, data => {
            console.log(data)
            setSearchDate(data)
        })
    }

    return (
        <Sales_Style
            day={day}
            week={week}
            month={month}
            setSearchOfFirst={setSearchOfFirst}
            setSearchOfLast={setSearchOfLast}
            searchDate={searchDate}
            handleSearch={handleSearch}
            chart={chart}
        />
    )
}

export default Point_Of_Sales;