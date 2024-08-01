import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    const [userAvatar,setUserAvatar] = React.useState();
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: userAvatar
        });
    }
    function handleChange(e) {
        setUserAvatar(e.target.value)
    }
    return(
        <section className='modal-avatar-edit'>
            <PopupWithForm fisrtValue={userAvatar} ref={avatarRef} handleChange={handleChange} onSubmit={handleSubmit} isOpen={props.isOpen} title="Cambiar foto de perfil" placeholderFirstInput="Url" saveMessage="Guardar" closeAllPopups={props.onClose}/>
        </section>
    )
}

export default EditAvatarPopup;