import Swal from "sweetalert2";

import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { noteLogout } from "./notes";

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => { //thunk nos lo ofrece directamente

        dispatch( startLoading() );
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user } ) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
            })
            .catch( err => {
                console.log(err.message);
                dispatch( finishLoading() );
                Swal.fire('Error', err.message, 'error');
            })

    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => { //thunk nos lo ofrece directamente
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user })  => {
                // console.log(user);
                dispatch( login( user.uid, user.displayName ) );
            })
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async ({ user })  => {

            await user.updateProfile( { displayName: name } );//modificamos el nombre de nuestro perfil, esto nos lo proeee firebase
            dispatch( login( user.uid, user.displayName ) );
        })
        .catch( err => {
            console.log(err.message);
        })
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

// ========================================================================== //

export const login = (uid, displayName) => ({//<> return
    type: types.login,
    payload: {
        uid, 
        displayName
    }
});


export const logout = () => ({
    type: types.logout
})