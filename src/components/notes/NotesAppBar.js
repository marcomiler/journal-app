import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetNote, startUploading } from '../../actions/notes';
import moment from 'moment';

const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const dateNow = moment().format('LL');

    const handleSave = () => {
        dispatch( startSetNote( active ) );
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if(file){
            dispatch( startUploading(file) );
        }

        //limpiamos el input para asi poder subir la misma imagen a otra nota(si deseamos) sin problemas 
        document.querySelector('#fileSelector').value = '';
        
    }

    const handlePicture = () => {
        document.querySelector('#fileSelector').click();
    }

    return (
        <div className="notes__appbar">
            <span>{ dateNow }</span>

            <input 
                id="fileSelector"
                type="file"
                name="file"
                onChange={ handleFileChange }
                style={{ display: 'none'}}
            />

            <div>

                <button 
                    className="btn"
                    onClick={ handlePicture }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
                
            </div>
        </div>
    );
}

export default NotesAppBar;