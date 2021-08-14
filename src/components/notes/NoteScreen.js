import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startdeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    const [ formValues, handleInputchange, reset] = useForm( note );

    const { body, title, id } = formValues;

    const activeId = useRef( note.id );

    //el valor del useForm es estático por lo que debemos usar un effect para
    //resetar los valores de la nota activa
    useEffect(() => {
        
        if(note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        }

    },[note, reset]);

    useEffect(() => {
        
        //modificamos nuestro state active
        dispatch( activeNote( formValues.id, { ...formValues }) );

    }, [formValues, dispatch]);

    const handleDelete = () => {
        // console.log(id);
        dispatch( startdeleting( activeId.current ) );
    }

    return (
        <div className="notes__main-cotent">
            
            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title ..."
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    onChange={ handleInputchange }
                    value={ title }
                />

                <textarea 
                    placeholder="What happened today"
                    className="notes__textarea"
                    onChange={ handleInputchange }
                    name="body"
                    value={ body }
                >

                </textarea>
                {
                    note.url && 
                    <div className="notes__image">
                    <img 
                        src={note.url}
                        alt="imagen form"
                    />
                    </div>
                }
                
            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    );
}

export default NoteScreen;