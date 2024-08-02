import styled, { ThemeProvider } from "styled-components"
import theme from "../../../../styles/ThemeProps"

const Login_Style = (props) => {
    const { setUserId, setUserPwd, handleLogin } = props;
    
    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Wrapper2>
                    <Login_Container>
                        <h2 style={{fontSize: '2rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '0.5rem'}}>컬처스페이스-로그인</h2>
                        <p style={{fontSize: '1rem', marginBottom: '1rem'}}>본사에서 발급된 계정을 사용하세요</p>
                        <Input_Container>
                            <Input name="account" onChange={e => setUserId(e.target.value)}/>
                        </Input_Container>
                        <Input_Container>
                            <Input name="password" type="password" onChange={e => setUserPwd(e.target.value)}/>
                        </Input_Container>
                        <Login_Button onClick={() => handleLogin()}>로그인</Login_Button>
                        
                    </Login_Container>
                </Wrapper2>
            </Wrapper>
        </ThemeProvider>
        
    )
}

const Wrapper = styled.div`
    width: 100%;
    
    position: relative;
    display: flex;
    flex-direction: column;
`

const Wrapper2 = styled.div`
    @media ${({ theme }) => theme.device.computer } {
        max-width: calc(1140px - 6rem);
        width: 100%;
        padding: 0px 15px;    
    }
    
    @media ${({ theme }) => theme.device.laptop } {
        max-width: 992px;
        width: 100%;
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.tablet } {
        width: 720px;
        width: 100%;
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.mobile_big } {
        width: 100%;
        padding: 0px 15px;    
    }
    margin: 3rem 0;

    align-self: center;
    position: relative;
`

const Login_Container = styled.div`
    width: 100%;
    height: auto;

    align-self: center;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
    background-color: white;
`

const Input_Container = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 1rem;

    border-radius: 0.25rem;
    border: 1px solid #ced4da;

    position: relative;
    display: flex;
`

const Input = styled.input`
    flex: 1;
    padding: 0.375rem 0.75rem;
    
    font-size: 1rem;
    line-height: 1.5rem;
    border-radius: 0.25rem;
    border: 0;
`

const Login_Button = styled.button`
    width: 100%;
    height: 50px;
    margin-bottom: 1rem;
    
    font-size: 1rem;
    border-radius: 0.25rem;

    color: white;
    background-color: black;
`
export default Login_Style;