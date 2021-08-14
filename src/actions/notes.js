import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
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
        dispatch( addNewNote( doc.id, newNote ) );

    }
}

export const startLoadingNote = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSetNote = ( note ) => {
    return async ( dispatch, getstate ) => {

        try{
            const { uid } = getstate().auth;

            if( !note.url ){
                delete note.url;
            }

            const noteToFirestore = { ...note };
            delete noteToFirestore.id;

            await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );

            dispatch( refreshNote( note.id, noteToFirestore ) );
            
            Swal.fire('Saved', note.title, 'success');

        }catch (err){
            Swal.fire('Error', err.message, 'error');
        }
        
    }
}


export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,   
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSetNote( activeNote ) );

        Swal.close();

    }
}

export const startdeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        try{    

            const uid = getState().auth.uid;
            await db.doc(`${uid}/journal/notes/${id}`).delete();

            dispatch( deleteNote( id ) );

            Swal.fire('Deleted', 'La nota se borró correctamente', 'success');

        }catch (err) {

            console.log(err.message);
            Swal.fire('Error', err.message, 'error');

        }     

    }
}

//===================================================================//

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id, 
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});