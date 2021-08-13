import { db } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {//getState es una funcion para obetener el state(auth, ui, notes...)

        const { uid } = getState().auth; //extraemos el uid del usuario
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote ); //envio mi nota a la bd
        
        dispatch( activeNote( doc.id, newNote ) );

    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id, 
        ...note
    }
});

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});