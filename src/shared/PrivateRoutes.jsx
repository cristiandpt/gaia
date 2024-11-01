import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import { useCallback, useEffect } from "react";
import useAuthStore from "../stores/use-auth-store";
import UserDAO from "../daos/user-DAO";

const PrivateRoutes = ({ element }) => {
	//const { isAuthenticated } = useAuth();

	const isAuthenticated = true;//UserDAO.getUserFromLocalStorage();

   return isAuthenticated ? <Outlet /> : <Navigate to="/unauthenticated/gaia" />;
};

export default PrivateRoutes;
