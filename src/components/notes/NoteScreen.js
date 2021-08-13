import React from 'react';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
    return (
        <div className="notes__main-cotent">
            
            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title ..."
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea 
                    placeholder="What happened today"
                    className="notes__textarea"
                >

                </textarea>

                <div className="notes__image">
                    <img 
                        src="https://haciendofotos.com/wp-content/uploads/las-mejores-fotos-de-paisajes-2020.jpg" 
                        alt="imagen form"
                    />
                </div>
                
            </div>

        </div>
    );
}

export default NoteScreen;