import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import Loader from '../utils/Loader';
import { login } from '../../actions/auth';
import AuthRouter from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import JournalScreen from '../journal/JournalScreen';
import { loadNotes } from '../../helpers/loadNotes';
import { setNotes } from '../../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    //firebase identifica la ultima sesion abierta asi q trabajaremos con esa funcionalidad
    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            
            if(user?.uid){//si el objeto user tiene algo, preguntamos por el uid
                
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                const notes = await loadNotes( user.uid );
                dispatch( setNotes( notes ) );

            }else{
                setIsLoggedIn( false );
            }
            
            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn])

    if( checking ) {
        return ( <Loader /> );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        isAuthenticated={ isLoggedIn }
                        component={ AuthRouter }
                    />

                    <PrivateRoute
                        exact 
                        path="/"
                        isAuthenticated={ isLoggedIn }
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default AppRouter;
