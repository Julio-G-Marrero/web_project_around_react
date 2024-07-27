import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import PopupWithForm from './components/PopupWithForm'

import './App.css';

function App() {
  const [isEditProfilePopupOpen ,setIsEditProfilePopupOpen ] = React.useState(false) 
  const [isAddPlacePopupOpen ,setIsAddPlacePopupOpen ] = React.useState(false) 
  const [isEditAvatarPopupOpen ,setIsEditAvatarPopupOpen ] = React.useState(false) 
  const [overlay, setOverlay ] = React.useState(false);

  function onEditProfileClick(){
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    setOverlay(!overlay);
  }
  function onEditAvatarClick (){
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    setOverlay(!overlay);
  }
  function onAddPlaceClick(){
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    setOverlay(!overlay);
  }

  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setOverlay(false);

  }

  return (
    <div class="page">
      <Header />
      <Main onEditProfileClick={onEditProfileClick} onEditAvatarClick={onEditAvatarClick} onAddPlaceClick={onAddPlaceClick} closeAllPopups={closeAllPopups} />
      <Footer />
      <section className='modal-place'>
        <PopupWithForm isOpen={isAddPlacePopupOpen} title="Nuevo Lugar" placeholderFirstInput="Titulo" placeholderSecondInput="Enlace a imagen" saveMessage="Crear" closeAllPopups={closeAllPopups}/>

      </section>
      <section className='modal-avatar-edit'>
        <PopupWithForm isOpen={isEditAvatarPopupOpen} title="Cambiar foto de perfil" placeholderFirstInput="Url" saveMessage="Guardar" closeAllPopups={closeAllPopups}/>
      </section>
      <section className='modal-edit-profile'>
        <PopupWithForm isOpen={isEditProfilePopupOpen} title="Editar Perfil" placeholderFirstInput="Nombre" placeholderSecondInput="Profesion" saveMessage="Guardar" closeAllPopups={closeAllPopups}/>
      </section>
      <div 
        className={overlay ? 'overlay' : 'overlay disabled'}
        onClick={closeAllPopups}
      ></div>
    </div>
  );
}

export default App;
