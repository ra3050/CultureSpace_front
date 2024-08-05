import { useEffect, useState } from "react";
import Calendar_Style from "./user_style/calendar_style";
import { requestTotalSales } from "../../../../Controller/Controller";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Sales_of_calendar = (props) => {
    const [realData, setRealData] = useState([])            // 정렬되지 않는 초기 데이터
    const [salesInfo, setSailseInfo] = useState([])         // 정렬된 데이터
    const [clickInfo, setClickInfo] = useState([])
    const [originInfo, setOriginInfo] = useState({})        // 초기정렬데이터
    const [equipment, setEquipment] = useState([])
    const [sheets, setSheets] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        requestTotalSales(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            const info = data.info;
            setRealData(info)       // 최초 로딩 데이터 저장
            const eqData = data.eqInfo;

            const sortInfo = info?.sort((a, b) => {
                const timeA = moment(a.sale_time);
                const timeB = moment(b.sale_time);
                const timeDiff = timeA.diff(timeB, 'minute');

                console.log(timeDiff)
                if (timeDiff < 0) {
                    return -1;
                } else if (timeDiff > 0) {
                    return 1;
                } else {
                    return 0;
                }
            })

            const groupData = {};
            info.forEach(item => {
                const { real_price, sale_time } = item;
                const sale_time_current = moment(sale_time).format('YYYY-MM-DD')

                if (!groupData[sale_time_current]) {
                    groupData[sale_time_current] = { title: 0, date: sale_time_current, info: [] }
                }

                groupData[sale_time_current].info = [...groupData[sale_time_current].info, item]
                groupData[sale_time_current].title += real_price;
            })

            const resultData = Object.values(groupData);

            console.log(resultData)
            setOriginInfo(groupData)
            setSailseInfo(resultData)
            setEquipment(eqData)

            let sheet_cnt = 0
            eqData.map(item => {
                sheet_cnt += item.remained_sheets
            })
            setSheets(sheet_cnt)

        })
    }, [])

    const handleCalendarClick = (arg) => {
        const timeSortInfo = originInfo[arg.dateStr].info.sort((a, b) => {
            const timeA = moment(a.sale_time).format('hh:mm:ss');
            const timeB = moment(b.sale_time).format('hh:mm:ss');

            if (timeA < timeB) {
                return 1;
            } else if (timeA > timeB) {
                return -1;
            } else {
                return 0;
            }
        })

        setClickInfo(timeSortInfo)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        console.log(value)

        const info = realData;
        const groupData = {};
        info.forEach(item => {
            const { real_price, sale_time } = item;
            const sale_time_current = moment(sale_time).format('YYYY-MM-DD')

            if (value !== 'default') {
                if (value !== item.equipment_id) {
                    return
                }
            }


            if (!groupData[sale_time_current]) {
                groupData[sale_time_current] = { title: 0, date: sale_time_current, info: [] }
            }

            groupData[sale_time_current].info = [...groupData[sale_time_current].info, item]
            groupData[sale_time_current].title += real_price;
        })

        const resultData = Object.values(groupData);

        console.log(resultData)
        setOriginInfo(groupData)
        setSailseInfo(resultData)

        let sheet_cnt = 0
        if (value === 'default') {
            equipment.map(item => {
                sheet_cnt += item.remained_sheets
            })
        } else {
            equipment.map(item => {
                if (value === item.equipment_id) {
                    sheet_cnt += item.remained_sheets
                }
            })
        }
        setSheets(sheet_cnt)
    }

    const handleSearchDateButton = () => {
        if (!startDate || !endDate) return

        const start = moment(startDate);
        const end = moment(endDate);
        const diff = start.diff(end, 'day');

        if (diff >= 0) return

        let result = true;
        let info = [];
        while (result) {
            const startFormat = start.format('YYYY-MM-DD');
            const endFormat = end.format('YYYY-MM-DD');

            if (originInfo[startFormat]) {
                info = info.concat(originInfo[startFormat].info)
            }


            if (startFormat === endFormat) {
                result = false
            }
            start.add(1, 'day')
        }

        const timeSortInfo = info?.sort((a, b) => {
            const timeA = moment(a.sale_time).format('hh:mm:ss');
            const timeB = moment(b.sale_time).format('hh:mm:ss');

            if (timeA < timeB) {
                return 1;
            } else if (timeA > timeB) {
                return -1;
            } else {
                return 0;
            }
        })

        setClickInfo(timeSortInfo)
    }

    return (
        <Calendar_Style
            calendarData={salesInfo}
            clickInfo={clickInfo}
            handleCalendarClick={handleCalendarClick}
            equipment={equipment}
            handleSearch={handleSearch}
            sheets={sheets}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleSearchDateButton={handleSearchDateButton}

        />
    )
}

export default Sales_of_calendar;