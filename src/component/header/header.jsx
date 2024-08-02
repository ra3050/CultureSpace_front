import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { requestLogout } from '../../Controller/Controller';
import { useContext } from 'react';
import { AppContext } from '../../layout/layout';

const customMaxWidth = 1140 - 6 * 16;

const logout = () => {
  requestLogout(data => {
    window.location = '/'
  })
}

const Header = () =>  {

  const { accessLevel } = useContext(AppContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{maxWidth: customMaxWidth}}>
        <Navbar.Brand href="/user/sales">컬처스페이스</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="사용자메뉴" id="basic-nav-dropdown">
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/user/sales">매출통계</NavDropdown.Item>
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/user/calendar">매출달력</NavDropdown.Item>
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/user/frame">프레임통계</NavDropdown.Item>
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/user/print">매장관리</NavDropdown.Item>
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/user/premium">정산관리</NavDropdown.Item>
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/privacy">개인정보 취급방침</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
            { accessLevel === 'USER_ADMIN' &&
              <NavDropdown title="관리자메뉴" id="basic-nav-dropdown">
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/admin/master_create">계정생성</NavDropdown.Item>
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/admin/account_manage">계정관리</NavDropdown.Item>
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/admin/order_manage">주문관리</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
            }

            { accessLevel === 'USER_MASTER' &&
              <NavDropdown title="관리자메뉴" id="basic-nav-dropdown">
                <NavDropdown.Item style={{marginBottom: '0.5rem'}} href="/admin/order_manage">주문관리</NavDropdown.Item>
              </NavDropdown>
            }
            
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Nav.Link style={{marginBottom: '0.5rem', marginTop: '0.5rem', marginRight: '1rem', color: '#616262'}} href="/user/changePW">비밀번호 변경</Nav.Link>
          <Nav.Link style={{marginBottom: '0.5rem', marginTop: '0.5rem', color: '#616262' }} onClick={() => { logout() }}>로그아웃</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;