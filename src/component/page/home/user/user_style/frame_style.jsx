import { styled } from "styled-components";

const Frame_Style = (props) => {
    const arrSearchDate = ['당월', '금주', '금일', '기간선택']
    const { salesData, equipment, frameName, designer, desFrame, checkToSearch, searchData, setSearchOfFirst, setSearchOfLast, setChoiceFrame, setChoiceEquipment } = props
    const { handleToSearchDate, handleSearchButton } = props

    return (
        <Wrapper>
            <Search_Col_Container>
                <Search_Row_Container>
                    <Search_Title>조회 구분</Search_Title>
                    <Search_in_Container>
                        <select style={{ marginRight: 4, marginLeft: 4 }} onChange={e => setChoiceFrame(e.target.value)}>
                            <option value='default'>프레임전체</option>
                            <option value='original'>오리지날 프레임</option>
                            <option value='designer'>디자이너 프레임</option>
                        </select>
                        <select style={{ marginRight: 4, marginLeft: 4 }} onChange={e => setChoiceEquipment(e.target.value)}>
                            <option value='default'>기기전체</option>
                            {equipment?.map(item => (
                                <option value={item.equipment_id}>{item.room_name}</option>
                            ))}
                        </select>
                    </Search_in_Container>
                </Search_Row_Container>

                <Search_Row_Container>
                    <Search_Title>기간 선택</Search_Title>
                    <Search_in_Container_column style={{ flex: 6 }}>
                        {
                            arrSearchDate?.map(item => {
                                if (checkToSearch === item) {
                                    return (
                                        <>
                                            <Search_Date type="checkbox" name={item} id={item} checked onChange={e => handleToSearchDate(e)} />
                                            <label for={item}>{item}</label>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <Search_Date type="checkbox" name={item} id={item} checked={false} onChange={e => handleToSearchDate(e)} />
                                            <label for={item}>{item}</label>
                                        </>
                                    )
                                }
                            })
                        }
                        {
                            checkToSearch === '기간선택' && (
                                <>
                                    <Search_Date type="date" onChange={e => setSearchOfFirst(e.target.value)} />
                                    <p>~</p>
                                    <Search_Date type="date" onChange={e => setSearchOfLast(e.target.value)} />
                                </>
                            )
                        }

                    </Search_in_Container_column>
                    <Search_Button onClick={() => handleSearchButton()}>검색</Search_Button>
                </Search_Row_Container>
            </Search_Col_Container>

            <Table_Container>
                <Table_Title>프레임 이름</Table_Title>
                <Table_Title>촬영수</Table_Title>
                <Table_Title>매출</Table_Title>
                <Table_Title>라이센스</Table_Title>
            </Table_Container>

            {
                searchData?.map(item => (
                    <Table_Container>
                        <Table_Content>{item.frameName}</Table_Content>
                        <Table_Content>{item.count}</Table_Content>
                        <Table_Content>{item.price}</Table_Content>
                        <Table_Content>{item.licence}</Table_Content>
                    </Table_Container>
                ))
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
`
const Search_Col_Container = styled.div`
    width: 100%;

    border-top: 0.5px solid #ced4da;
    border-bottom: 0.5px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: column;
`
const Search_Row_Container = styled.div`
    width: 100%;

    border-top: 0.5px solid #ced4da;
    border-bottom: 0.5px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Search_in_Container = styled.div`
    flex: 7;

    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    position: relative;
    display: flex;
    flex-direction: row;
`

const Search_in_Container_column = styled.div`
    flex: 7;

    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    position: relative;
    display: flex;
    flex-direction: row;

    @media ${({ theme }) => theme.device.mobile_big} {
        
        flex-direction: column;
    }
    @media ${({ theme }) => theme.device.mobile_small} {
        
        flex-direction: column;
    }
`

const Search_Title = styled.text`
    flex: 2;
    height: 100%;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: #F8F9FA;
`
const Search_Date = styled.input`
    margin: 0 4px;
    /* padding: 1px 2px; */
`
const Search_Button = styled.button`
    flex: 1;
    height: 50%;
    /* padding: 0.25rem; */

    font-size: 0.75em;
    line-height: 1.5rem;
    
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    
    align-self: center;
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

export default Frame_Style;