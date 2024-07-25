import React from 'react';
import avatar from './images/Avatar.png';
import editBtn from './images/Edit_Button.svg';
import PopupWithForm from './components/PopupWithForm'
import api from './utils/api';

import addBtn from './images/Add_Button.png';
import closeIcon from './images/Close_Icon.png';
import editAvatarIcon from './images/editProfile.png';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import './App.css';

function App() {
  const [idUser, setIdUser] = React.useState()

  const [modalEditProfile, setmodalEditProfile ] = React.useState(false);
  const [modalEditAvatar, setmodalEditAvatar ] = React.useState(false);
  const [modalAddPlace, setmodalAddPlace ] = React.useState(false);
  const [overlay, setOverlay ] = React.useState(false);
  const [userName, setUserName] = React.useState(false);
  const [userDescription, setuserDescription] = React.useState(false);
  const [userAvatar, setuserAvatar] = React.useState(false);

  function handleEditProfileClick(){
    setmodalEditProfile(!modalEditProfile);
    setOverlay(!overlay);
  }
  function handleEditAvatarClick(){
    setmodalEditAvatar(!modalEditAvatar);
    setOverlay(!overlay);
  }
  function handleAddPlaceClick(){
    setmodalAddPlace(!modalAddPlace);
    setOverlay(!overlay);
  }

  function closeAllPopups(){
    setmodalEditProfile(false);
    setmodalEditAvatar(false);
    setmodalAddPlace(false);
    setOverlay(false);

  }
  function fetchUserInfo() {
    fetch(`${api.address}${api.groupId}/users/me`, {
        headers: {
            authorization: api.token,
        },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
        setUserName(data.name);
        setuserDescription(data.about);
        setuserAvatar(data.avatar);
        setIdUser(data._id);
    });
  }

  React.useEffect(() => {
    fetchUserInfo();
  },[userName,userDescription,userAvatar]);


  return (
    <div class="page">
      <Header />
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar">
            <img
            src={userAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
            alt="Avatar img"
            className="profile__avatar-img"
            />
            <img
            src={editAvatarIcon}
            alt="edit icon"
            className="profile__avatar-edit-img"
            onClick={handleEditAvatarClick}

            />
          </div>
          <div className="profile__info">
            <div className="profile__containter">
            <h1 className="profile__name">{userName}</h1>
            <img
                className="profile__button"
                src={editBtn}
                alt="edit button"
                onClick={handleEditProfileClick}
            />
            </div>
            <p className="profile__rol">{userDescription}</p>
          </div>
          <div className="profile__add">
            <img
            className="profile__add-place"
            src={addBtn}
            alt="add buton img"
            onClick={handleAddPlaceClick}
            />
          </div>
        </div>
      </section>
      <div className="places__elements">
        <template id="cardElement">
          <div className="places__element">
          <div className="places__banner">
              <img className="places__image" src="/" alt="place image" />
              <img
              className="places__trash-icon pointer"
              src="<%= require('./images/Trash.svg')%>"
              alt="Trash svg"
              />
          </div>
          <div className="places__info">
              <h2 className="places__title"></h2>
              <div className="places__image-container-likes">
              <button className="places__like">
                  <img
                  className="pointer"
                  src="<%= require('./images/like.svg')%>"
                  alt="like svg"
                  />
                  <p className="places__image_likes places__likes"></p>
              </button>
              </div>
          </div>
          </div>
        </template>
      </div>
      <section className={modalAddPlace ? 'modal modal-place' : 'modal modal-place disabled'}>
        <PopupWithForm title="Nuevo Lugar" placeholderFirstInput="Titulo" placeholderSecondInput="Enlace a imagen" saveMessage="Crear"/>
        <img
        className="modal__close modal__close-place"
        src={closeIcon}
        onClick={closeAllPopups}
        alt="close icon"
        />
      </section>
      <section className={modalEditAvatar ? 'modal modal-avatar-edit' : 'modal modal-avatar-edit disabled'}>
        <PopupWithForm title="Cambiar foto de perfil" placeholderFirstInput="Url" saveMessage="Guardar"/>
        <img
        className="modal__close modal__close-imgProfile"
        src={closeIcon}
        onClick={closeAllPopups}
        alt="close icon"
        />
      </section>
      <div 
        className={overlay ? 'overlay' : 'overlay disabled'}
        onClick={closeAllPopups}
      ></div>
      <section className={modalEditProfile ? 'modal modal-edit-profile' : 'modal modal-edit-profile disabled'}>
        <PopupWithForm title="Editar Perfil" placeholderFirstInput="Nombre" placeholderSecondInput="Profesion" saveMessage="Guardar"/>
        <img
        className="modal-img__close"
        src={closeIcon}
        onClick={closeAllPopups}
        alt="close icon"
        />
      </section>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
