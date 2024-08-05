import styled from "styled-components"

const Sales_Manage_Style = (props) => {

    return (
        <Wrapper>
            <Search_Col_Container>
                <Search_Row_Container>
                    <Search_Title>조회 구분</Search_Title>
                    <Search_in_Container style={{ flex: 6 }}>

                    </Search_in_Container>
                    <Search_Button>엑셀 다운로드</Search_Button>
                </Search_Row_Container>

                <Search_Row_Container>
                    <Search_Title>기간 선택</Search_Title>
                    <Search_in_Container>
                        <Search_Input type="date" />
                        <p>~</p>
                        <Search_Input type="date" />
                    </Search_in_Container>
                </Search_Row_Container>

                <Search_Row_Container>
                    <Search_Title>점포이름</Search_Title>
                    <Search_in_Container style={{ flex: 6 }}>
                        <Search_Input />
                    </Search_in_Container>
                    <Search_Button>검색</Search_Button>
                </Search_Row_Container>

            </Search_Col_Container>

            <Table_Container>
                <Table_Title>경영주 이름</Table_Title>
                <Table_Title>매장 아이디</Table_Title>
                <Table_Title>총 매출</Table_Title>
                <Table_Title>키보드</Table_Title>
                <Table_Title>로열티</Table_Title>
            </Table_Container>
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
const Search_Title = styled.text`
    flex: 2;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: #F8F9FA;
`
const Search_Input = styled.input`
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

export default Sales_Manage_Style;