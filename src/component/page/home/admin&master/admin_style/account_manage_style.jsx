import { useContext, useState } from "react"
import styled from "styled-components"
import { AppContext } from "../../../../../layout/layout"
import { useNavigate } from "react-router-dom"

const Account_Manage_Style = (props) => {
    const { accessLevel, userData, masterData } = useContext(AppContext);
    const [searchData, setSearchData] = useState();
    const navigation = useNavigate();

    const search = (e) => {
        const text = e.target.value;
        console.log(text)
        if (!text) {
            setSearchData(userData);
        } else {
            let prev = [];
            userData.map(item => {
                if (item?.user_name?.indexOf(text) !== -1) {
                    prev = [...prev, item];
                    
                    return
                } 
                if (item?.user_id?.indexOf(text) !== -1) {
                    prev = [...prev, item];
                    
                    return
                } 
                if (item?.user_addr && item?.user_addr?.indexOf(text) !== -1) {
                    prev = [...prev, item];
                    
                    return
                } 
                if (item?.email && item?.user_email?.indexOf(text) !== -1) {
                    prev = [...prev, item];
                    
                    return
                } 
                if (item?.user_info && item?.user_info?.indexOf(text) !== -1) {
                    prev = [...prev, item];
                    
                    return
                } 
            })
            console.log(prev)
            setSearchData(prev);
        }
    }

    return (
        <Wrapper>
            <Search_Col_Container>
                <Search_Row_Container>
                    <Search_in_Container style={{flex: 6}}>
                        <Search_Input placeholder="검색" onChange={e => search(e)}/>
                    </Search_in_Container>
                    <Search_Button>검색</Search_Button>
                </Search_Row_Container>
            </Search_Col_Container>

            <Table_Container>
                <Table_Title>이름</Table_Title>
                <Table_Title>ID</Table_Title>
                <Table_Title>주소</Table_Title>
                <Table_Title>이메일</Table_Title>
                <Table_Title>정보</Table_Title>
            </Table_Container>

            {
                (searchData ? searchData : userData)?.map(item => {
                    if (item.delete_yn === 'y') {
                        return
                    }
                    const comp = (
                        (
                            <Table_Container onClick={() => navigation('/admin/account_fix', {state: {userData: item, masterData: masterData}})}>
                                <Table_Content>{item.user_name}</Table_Content>
                                <Table_Content>{item.user_id}</Table_Content>
                                <Table_Content>{item.user_addr}</Table_Content>
                                <Table_Content>{item.user_email}</Table_Content>
                                <Table_Content>{item.user_info}</Table_Content>
                            </Table_Container>
                        )
                    )
                    return comp
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
`

const Search_Col_Container = styled.div`
    width: 100%;

    /* border-top: 0.5px solid #ced4da;
    border-bottom: 0.5px solid #ced4da; */

    position: relative;
    display: flex;
    flex-direction: column;
`
const Search_Row_Container = styled.div`
    width: 100%;

    /* border-top: 0.5px solid #ced4da;
    border-bottom: 0.5px solid #ced4da; */

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
    margin-top: 1rem;
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

export default Account_Manage_Style;