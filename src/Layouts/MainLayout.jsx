import React from 'react';
import { Outlet } from 'react-router';
import NavBer from '../Components/NavBer/NavBer';

const MainLayout = () => {
    return (
        <div>
            <NavBer></NavBer>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;