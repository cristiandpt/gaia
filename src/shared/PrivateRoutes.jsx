import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import { useCallback, useEffect } from "react";
import useAuthStore from "../stores/use-auth-store";
import UserDAO from "../daos/user-DAO";

const PrivateRoutes = ({ element }) => {

	const { user } = useAuthStore();
	const isAuthenticated = (user != null);

   return isAuthenticated ? <Outlet /> : <Navigate to="/unauthenticated/gaia" />;
};

export default PrivateRoutes;
