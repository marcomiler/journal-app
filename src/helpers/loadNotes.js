import { db } from "../firebase/firebase-config"

export const loadNotes = async ( uid ) => {

   const notesSnap = await db.collection(`${uid}/journal/notes`).get();
   const notes = [];
   
   //obtenemos la información de nuestras notas, repasar y hacer clg para entender mejor
   notesSnap.forEach( snapHijo => {
    // console.log(snapHijo.data());
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
   });

//    console.log(notes);
   return notes;

}