import React from 'react';
import { Outlet } from 'react-router';
import NavBer from '../Components/NavBer/NavBer';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <NavBer></NavBer>
            <Outlet></Outlet>
             <Footer></Footer>
        </div>
    );
};

export default MainLayout;