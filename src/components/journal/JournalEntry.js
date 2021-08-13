import React from 'react';

const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{ 
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://haciendofotos.com/wp-content/uploads/las-mejores-fotos-de-paisajes-2020.jpg)'
                }}
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un buen dia
                </p>
                <p className="journal__entry-content">
                   Voluptate dolores placeat omnis saepe expedita deserunt tenetur, porro itaque. Modi ab ducimus deserunt iusto.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28 Junio</h4>
            </div>
        </div>
    );
}

export default JournalEntry;
