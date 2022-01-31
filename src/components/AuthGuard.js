import useAuth from "hooks/useAuth";
import Login from "pages/authentication/Login";
import React, { Fragment, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"; // component props interface
import { verifyPermission, routes } from 'lib/backofficeRoutes'
import * as usersRequests from 'lib/requests/usersRequests'
import { useNavigate } from "react-router";
import checkURLPermission from "lib/CheckUrlPermissions";

const AuthGuard = ({ children }) => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }

        return <Login />;
    }


    usersRequests.tokenPermission()
        .then(response => {

            if (!checkURLPermission(pathname, response.data.data)) {
                return navigate('/invalidPage')
            }
        })
        .catch(error => {
            console.error(error)
            return navigate('/invalidPage')
        })

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }
    return <Fragment>{children}</Fragment>;
};

export default AuthGuard;