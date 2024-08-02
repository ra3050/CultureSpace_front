import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layout/layout";
import React from "react";
import Login from "./component/page/login/login";
import Pointer_Of_Sales from "./component/page/home/user/point_of_sales";
import Point_Of_Frame from "./component/page/home/user/point_of_frame";
import Master_Create from "./component/page/home/admin&master/master_create";
import Account_Manage from "./component/page/home/admin&master/account_manage";
import Account_Fix from "./component/page/home/admin&master/account_fix";
import Sales_of_calendar from "./component/page/home/user/sales_of_calendar";
import Point_Of_Print from "./component/page/home/user/point_of_print";
import Sales_of_Premium from "./component/page/home/user/sales_of_premium";
import Change_Of_Password from "./component/page/home/user/change_of_password";
import Order_Manage from "./component/page/home/admin&master/order_manage";
import PrivacyPage from "./component/page/etc/privacy";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/privacy" element={<PrivacyPage />}/>

        <Route element={<Layout/>}>
          <Route path="/user/*">
            <Route index path="sales" element={<Pointer_Of_Sales/>}/> 
            <Route path="frame" element={<Point_Of_Frame/>}/>
            <Route path="calendar" element={<Sales_of_calendar/>}/>
            <Route path="print" element={<Point_Of_Print/>} />
            <Route path="premium" element={<Sales_of_Premium/>}/>
            <Route path="changePW" element={<Change_Of_Password/>}/>
          </Route>  

          <Route path="/admin/*">
            <Route index path="master_create" element={<Master_Create/>}/>
            <Route path="account_manage" element={<Account_Manage/>}/>
            <Route path="account_fix" element={<Account_Fix/>}/>
            <Route path="order_manage" element={<Order_Manage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
