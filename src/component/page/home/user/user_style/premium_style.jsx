import { useState } from "react";
import styled from "styled-components";

const Premium_sytle = (props) => {
    const { month, premiumState, totalprice, licence } = props
    const { handleDownload} = props

    return (
        <Wrapper>
            <State_Container>
                <State_In_Container>
                    <h2 style={{fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '3rem'}}>{`${month}월 정산 내용은 다음과 같습니다`}</h2>
                    
                    <p style={{fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem'}}>{'총매출'}</p>
                    <p style={{fontSize: '1rem', fontWeight: 500, marginBottom: '3rem'}}>{`${totalprice}원`}</p>

                    <p style={{fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem'}}>{'라이센스 비용'}</p>
                    <p style={{fontSize: '1rem', fontWeight: 500, marginBottom: '3rem'}}>{`${licence}원`}</p>

                    {
                        premiumState ? (
                            <p style={{fontSize: '0.8rem', marginBottom: '0.5rem'}}>{'정산 처리가 완료되었습니다'}</p>
                        ) : (
                            <p style={{fontSize: '1rem', color: 'red', marginBottom: '0.5rem'}}>{'정산이 이루어지지 않았습니다'}</p>
                        )
                    }
                    <Button onClick={() => handleDownload()}>정산내용 다운로드</Button>
                </State_In_Container>
            </State_Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-bottom: 16px;
    background-color: white;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const State_Container = styled.div`
    width: 100%;
    border: 0.5px solid #ced4da;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const State_In_Container = styled.div`
    margin: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Owner_Input = styled.input`
    
    padding: 0.375rem 0.75rem;
    font-size: 1rem;

    border: 1px solid #ced4da;
    border-radius: 0.25rem;
`

const State_Colunm_Container = styled.div`
    margin-bottom: 0.375rem;
    
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Button = styled.div`
    padding: 0.25rem;
    margin-bottom: 3rem;

    border: 0.5px solid #ced4da;
    border-radius: 0.25rem;

    font-size: 0.8rem;
`

export default Premium_sytle;