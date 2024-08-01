import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props){
    const currentUser = React.useContext(CurrentUserContext)
    const [userName,setUserName] = React.useState();
    const [userDescription,setUserDescription] = React.useState();
    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
    }, [currentUser]);
    function handleChange(e) {
        if(e.target.id == "name-input") {
            setUserName(e.target.value);

        }else if(e.target.id == "profesion-input"){
            setUserDescription(e.target.value);
        }
    }
    function handleSubmit(e) {
        // Evita que el navegador navegue hacia la dirección del formulario
        e.preventDefault();
      
        // Pasa los valores de los componentes gestionados al controlador externo
        props.onUpdateUser({
            name: userName,
            about: userDescription
        });
      }
    return(
        <section className='modal-edit-profile'>
            <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} title="Editar Perfil" placeholderFirstInput="Nombre" placeholderSecondInput="Profesion" saveMessage="Guardar" closeAllPopups={props.onClose} fisrtValue={userName} secondValue={userDescription} handleChange={handleChange}/>
        </section>
    )
}

export default EditProfilePopup;