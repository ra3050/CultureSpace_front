import { useLayoutEffect, useState } from "react";
import Frame_Style from "./user_style/frame_style";
import { requestCodeList, requestFrameToDeginer, requestTotalSales } from "../../../../Controller/Controller";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const calcDate = (info, choicedate, firstDate, lastDate) => {
    let refDate
    let data = []
    if (choicedate === '당월') {
        const currentMonth = moment().month()
        refDate = moment().month(currentMonth).format('YYYY-MM')

        info.map(item => {
            const time = moment(item.sale_time).format('YYYY-MM')
            if (refDate === time) {
                data = [...data, item]
            }
        })
    } else if (choicedate === '금주') {
        const day = [0, 1, 2, 3, 4, 5, 6];
        const currentWeek = moment().week()

        let refWeek = []
        day.map(item => {
            refWeek = [...refWeek, moment().week(currentWeek).day(item).format('YYYY-MM-DD')]
        })
        refDate = refWeek

        info.map(item => {
            const time = item.sale_time
            if (refDate.indexOf(time) !== -1) {
                data = [...data, item]
            }
        })
    } else if (choicedate === '금일') {
        const currentDay = moment().format('YYYY-MM-DD')
        info.map(item => {
            const time = item.sale_time
            if (currentDay === time) {
                data = [...data, item]
            }
        })
    } else if (choicedate === '기간선택') {
        // 날짜 선택
        let refDayList = []
        let value = true
        while (value) {
            const start = firstDate.format('YYYY-MM-DD')
            const end = lastDate.format('YYYY-MM-DD');
            if (start !== end) {
                refDayList = [...refDayList, start]
                firstDate.add(1, 'day')
            } else {
                value = false
            }
        }

        info.map(item => {
            const time = moment(item.sale_time).format('YYYY-MM-DD')
            if (refDayList.indexOf(time) !== -1) {
                data = [...data, item]
            }
        })
    }
    console.log(data)
    return data
}

const Point_Of_Frame = (props) => {
    const [checkToSearch, setCheckToSearch] = useState('당월')
    const [salesData, setSalesData] = useState([])
    const [equipment, setEquipment] = useState([])
    const [frameName, setFrameName] = useState([])
    const [designer, setDesigner] = useState([])
    const [desFrame, setDesFrame] = useState([])
    const [searchData, setSearchData] = useState([])

    const [searchOfFirst, setSearchOfFirst] = useState()                // 기간선택 시작하는날
    const [searchOfLast, setSearchOfLast] = useState()                  // 기간선택 끝나는날
    const [choiceFrame, setChoiceFrame] = useState('default')           // 프레임 구분자 선택
    const [choiceEquipment, setChoiceEquipment] = useState('default')   // 기기 구분자 선택
    const navigation = useNavigate()

    useLayoutEffect(() => {
        requestTotalSales(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            setSalesData(data.info)
            setEquipment(data.eqInfo)
        })

        requestCodeList(data => {
            let frame = []
            data.info.map(item => {
                frame = [...frame, item.code]
            })
            console.log(frame)
            setFrameName(frame)
        })

        requestFrameToDeginer(data => {
            setDesigner(data.designer)
            setDesFrame(data.frame)
        })

    }, [])

    const handleToSearchDate = (e) => {
        setCheckToSearch(e.target.name)
    }

    const handleSearchButton = () => {
        const groupData = {};
        const start = moment(searchOfFirst)
        const end = moment(searchOfLast)
        const customData = calcDate(salesData, checkToSearch, start, end)
        let choiceDesigner = ''
        desFrame?.map(item => {
            // console.log(choiceFrame, item.designer_seq)
            if (item.designer_seq === parseInt(choiceFrame)) {
                choiceDesigner += item.frame_file
            }
        })
        let allDesignerFrame = ''
        desFrame?.map(item => {
            allDesignerFrame += item.frame_file + ','
        })
        console.log(allDesignerFrame)


        customData.forEach(item => {
            const frame_code = item.frame_code;
            const equipment_id = item.equipment_id;
            const real_price = item.real_price;
            const print_count = item.print_count;

            const frame_name = item.background_file;
            const parts = frame_name.split('\\')
            const sales_frame_name = parts[parts.length - 1].replace('.png', '') // 프레임 이름 추출

            const licence = item.royalty_price;

            // 프레임 구분자 선택
            if (choiceFrame === 'original') {
                if (allDesignerFrame.indexOf(sales_frame_name) !== -1) {
                    return
                }
            } else if (choiceFrame === 'designer') {
                if (allDesignerFrame.indexOf(sales_frame_name) === -1) {
                    return
                }
            } else if (choiceFrame !== 'default') {
                // 특정 디자이너의 프레임 정보를 확인하는 작업이 필요함
                const sliceStr = sales_frame_name.replace('.png', '');
                if (choiceDesigner.indexOf(sliceStr) === -1) {
                    return
                }
            }

            // 기기 구분자 선택
            if (choiceEquipment !== 'default') {
                if (choiceEquipment !== equipment_id) {
                    return
                }
            }

            // 기간 선택 구분자 작성

            if (!groupData[sales_frame_name]) {
                groupData[sales_frame_name] = {
                    frameName: sales_frame_name,
                    count: print_count,
                    price: real_price,
                    licence: licence
                }
            }
            groupData[sales_frame_name].count += print_count
            groupData[sales_frame_name].price += real_price
            groupData[sales_frame_name].licence += licence
        })

        const resultData = Object.values(groupData)

        console.log(resultData)
        setSearchData(resultData)
    }

    return (
        <Frame_Style
            salesData={salesData}
            equipment={equipment}
            frameName={frameName}
            designer={designer}
            desFrame={desFrame}
            checkToSearch={checkToSearch}
            searchData={searchData}
            setSearchOfFirst={setSearchOfFirst}
            setSearchOfLast={setSearchOfLast}
            setChoiceFrame={setChoiceFrame}
            setChoiceEquipment={setChoiceEquipment}

            handleToSearchDate={handleToSearchDate}
            handleSearchButton={handleSearchButton}
        />
    )
}

export default Point_Of_Frame;