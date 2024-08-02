import React, {useState} from "react";
import styled from "styled-components"

const koreaRegions = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
];

const Master_Create_Style = (props) => {
    const { setId, setPw, setName, setTel, setAddr, setEmail, setDescrypt, setUserType } = props
    const { handleRegionChange, handleCreateButton } = props


    return (
        <Wrapper>
            <Master_Col_Container>
                <Master_Row_Container>
                    <Master_Title>사용자 ID</Master_Title>
                    <Master_in_Container>
                        <Master_Input onChange={e => setId(e.target.value)}/>
                    </Master_in_Container>
                </Master_Row_Container>
                <Master_Row_Container>
                    <Master_Title>사용자 PW</Master_Title>
                    <Master_in_Container>
                        <Master_Input onChange={e => setPw(e.target.value)}/>
                    </Master_in_Container>
                </Master_Row_Container>
                <Master_Row_Container>
                    <Master_Title>사용자 이름</Master_Title>
                    <Master_in_Container>
                        <Master_Input onChange={e => setName(e.target.value)}/>
                    </Master_in_Container>
                </Master_Row_Container>
                <Master_Row_Container>
                    <Master_Title>사용자 주소</Master_Title>
                    <Master_in_Container>
                        <Master_Input onChange={e => setAddr(e.target.value)} />
                    </Master_in_Container>
                </Master_Row_Container>
                <Master_Row_Container>
                    <Master_Title>전화번호</Master_Title>
                    <Master_in_Container>
                        <Master_Input onChange={e => setTel(e.target.value)} type="number"/>
                    </Master_in_Container>
                </Master_Row_Container>
                <Master_Row_Container>
                    <Master_Title>이메일</Master_Title>
                    <Master_in_Container>
                        <Master_Input onChange={e => setEmail(e.target.value)} type="email"/>
                    </Master_in_Container>
                </Master_Row_Container>
                <Master_Row_Container>
                    <Master_Title>정보</Master_Title>
                    <Master_in_Container>
                        <Master_Input onChange={e => setDescrypt(e.target.value)}/>
                    </Master_in_Container>
                </Master_Row_Container>
                <Master_Row_Container>
                    <Master_Title>계정권한</Master_Title>
                    <Master_in_Container>
                        <select onChange={e => setUserType(e.target.value)} defaultValue={'USER_OWNER'}>
                            <option value='USER_OWNER'>점주</option>
                            <option value='USER_MASTER'>총판관리자</option>
                        </select>
                    </Master_in_Container>
                </Master_Row_Container>
                
                {/* <Master_Row_Container>
                    <Master_Title>담당지역</Master_Title>
                    <Master_in_Container>
                    <select value={selectedRegion} onChange={handleRegionChange}>
                        <option value="">선택하세요</option>
                        {koreaRegions.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                        ))}
                    </select>
                    </Master_in_Container>
                </Master_Row_Container> */}

                <Create_Button onClick={() => handleCreateButton()}>생성하기</Create_Button>
            </Master_Col_Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
`

const Master_Col_Container = styled.div`
    width: 100%;


    position: relative;
    display: flex;
    flex-direction: column;
`
const Master_Row_Container = styled.div`
    width: 100%;

    border-top: 0.5px solid #ced4da;
    border-bottom: 0.5px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Master_in_Container = styled.div`
    flex: 7;

    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    position: relative;
    display: flex;
    flex-direction: row;
`
const Master_Title = styled.text`
    flex: 2;
    font-size: 0.75em;
    line-height: 1.5rem;
    padding: 0.75rem;

    text-align: center;
    align-self: center;

    background-color: #F8F9FA;
`
const Master_Input = styled.input`
    flex: 1;
    margin: 0 4px;
    /* padding: 1px 2px; */
`

const Create_Button = styled.button`
    margin-top: 3rem;
    width: 150px;
    height: 50px;
    margin-bottom: 1rem;
    

    align-self: center;
    font-size: 1rem;
    border-radius: 0.25rem;

    color: white;
    background-color: black;
`

export default Master_Create_Style;