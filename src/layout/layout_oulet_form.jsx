import styled from "styled-components";
import theme from "../styles/ThemeProps";
import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { useContext } from "react";
import { AppContext } from "./layout";

const Layout_Oulet_Form = (props) => {
    const { accessLevel } = useContext(AppContext)

    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Wrapper_row>
                    {
                        accessLevel ? <Sidebar/> : <None_sidebar/>
                    }
                    <Container> 
                        <Outlet/>
                    </Container>
                </Wrapper_row>
            </Wrapper>
        </ThemeProvider>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    
    position: relative;
    display: flex;
    flex-direction: column;
`

const Wrapper_row = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: row;
`

const None_sidebar = styled.div`
    @media ${({ theme }) => theme.device.computer } {
        max-width: calc((100% - 1140px + 6rem) / 2);
        width: 100%;
        padding: 0px 15px;    
    }
    
    @media ${({ theme }) => theme.device.laptop } {
        max-width: 992px;
        width: 100%;
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.tablet } {
        max-width: 720px;
        width: 0%;
        padding: 0px 0px;    
    }

    @media ${({ theme }) => theme.device.mobile_big } {
        width: 0;
        padding: 0px 0px;    
    }
    @media ${({ theme }) => theme.device.mobile_small } {
        width: 0;
        padding: 0px 0px;    
    }
    height: 100vh;
    margin-top: 1rem;

    align-self: left;
    display: flex;
    flex-direction: column;
    position: relative;
`

const Container = styled.div`
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
        max-width: 720px;
        width: 100%;
        padding: 0px 15px;    
    }

    @media ${({ theme }) => theme.device.mobile_big } {
        width: 100%;
        padding: 0px 15px;    
    }
    @media ${({ theme }) => theme.device.mobile_small } {
        width: 100%;
        padding: 0px 15px;    
    }
    height: 100vh;
    margin-top: 1rem;

    align-self: center;
    position: relative;
`

export default Layout_Oulet_Form;