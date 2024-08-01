import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    return(
        <section className='modal-place'>
            <PopupWithForm onSubmit={props.onUpdatePlace} isOpen={props.isOpen} title="Nuevo Lugar" placeholderFirstInput="Titulo" placeholderSecondInput="Enlace a imagen" saveMessage="Crear" closeAllPopups={props.onClose}/>
        </section>
    )
}

export default AddPlacePopup;