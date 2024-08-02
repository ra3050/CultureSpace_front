import { useLayoutEffect, useState } from "react";
import Premium_sytle from "./user_style/premium_style";
import moment from "moment";
import { requestPremiumState, requestTotalSales } from "../../../../Controller/Controller";
import { useNavigate } from "react-router-dom";
import { calcToSearch } from "./point_of_sales";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";


const Sales_of_Premium = (props) => {
    const [month, setMonth] = useState(0)
    const [premiumState, setPremiumState] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [licence, setLicence] = useState(0)
    const [excelData, setExcelData] = useState([]);

    const navigation = useNavigate()

    const saveXlsxData = (startDate, endDate, info) => {
        let refDayList =[]
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
    
        let XlsxData =[]
        info.map((item, index) => {
            const time = moment(item.sale_time).format('YYYY-MM-DD')
            if (refDayList.indexOf(time) !== -1) {
                item.id = index
                XlsxData = [...XlsxData, item]
            }
        })
        console.log(XlsxData)  
        return XlsxData;
    }

    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = `${month}월`;
    const handleDownload = () => {
        const ws = XLSX.utils.aoa_to_sheet([
            [`10월 정산`, '', '', '총매출', totalPrice, '라이센스', licence],
            [],
            ['프레임이름', '결제구분', '인쇄수량', '단가', '판매요금', '실판매요금', '로열티']
        ]);

        excelData.map((data) => {
            console.log(data)
            XLSX.utils.sheet_add_aoa(
                ws,
                [
                    [
                        data.background_file,
                        data.payment_method,
                        data.print_count,
                        data.unit_fare,
                        data.sale_fare,
                        data.real_price,
                        data.royalty_price
                    ]
                ],
                {origin: -1}
            );
            ws['!cols'] =[
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 200 },
                { wpx: 200 }
            ];
            return false;
        });

        const wb = {Sheets: { data: ws }, SheetNames:['data']}
        const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});

        const excelFile = new Blob([excelButter], { type: excelFileType});
        FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
    }

    useLayoutEffect(() => {
        
        const nowMonth = moment().month();
        console.log('current month :', nowMonth)
        setMonth(nowMonth)

        requestPremiumState(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }

            if (nowMonth === data.info.premium_month) {
                setPremiumState(true)
            }
        })

        requestTotalSales(data => {
            if (data?.response?.status === 401) {
                navigation('/')
            }
            
            const year = moment().year()
            const month = moment().month()
            const startDate = moment([year, month - 1, 1]).startOf('month')         //month-1로 변경해주어야함
            const endDate = moment([year, month - 1]).endOf('month')                //month-1로 변경해주어야함
            const salesInfo = data.info
            
            calcToSearch(startDate, endDate, salesInfo, salesType => {
                console.log(salesType)
                setTotalPrice(salesType.total)
                setLicence(salesType.licence)
            })

            const newStartDate = moment([year, month - 1, 1]).startOf('month')
            const nnd = saveXlsxData(newStartDate, endDate, salesInfo)
            setExcelData(nnd)
        })
    }, [])


    return (
        <Premium_sytle month={month} premiumState={premiumState} totalprice={totalPrice} licence={licence} handleDownload={handleDownload} />
    )
} 

export default Sales_of_Premium;