import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const {pathname} = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate state={pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoutes;