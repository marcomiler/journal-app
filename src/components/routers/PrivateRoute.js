import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component, //los componentes siempre se escriben con mayusculas al principio
    ...rest //el resto de propiedades
}) => {

    return (
        <Route { ...rest } 
            component={ ( props ) => (

                ( isAuthenticated )
                    ? <Component { ...props } />
                    : <Redirect to="/auth/login" />
            )}
        />
    );

}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
