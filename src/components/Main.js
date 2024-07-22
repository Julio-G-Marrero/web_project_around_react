import React from 'react';
import api from '../utils/api';
import avatar from '../images/Avatar.png';
import editBtn from '../images/Edit_Button.svg';
import addBtn from '../images/Add_Button.png';
import closeIcon from '../images/Close_Icon.png';
import editAvatarIcon from '../images/editProfile.png';

import PopupWithForm from './PopupWithForm'
import Card from './Card'


function Main() {
    const [modalEditProfile, setmodalEditProfile ] = React.useState(false);
    const [modalEditAvatar, setmodalEditAvatar ] = React.useState(false);
    const [modalAddPlace, setmodalAddPlace ] = React.useState(false);
    const [overlay, setOverlay ] = React.useState(false);

    
    const [userName, setUserName] = React.useState(false);
    const [idUser, setIdUser] = React.useState()
    const [userDescription, setuserDescription] = React.useState(false);
    const [userAvatar, setuserAvatar] = React.useState(false);
    const [cards,setCards] = React.useState([])

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

    console.log(typeof(cards))
    function fetchUserInfo() {
        fetch(`${api.address}${api.groupId}/users/me`, {
            headers: {
                authorization: api.token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setUserName(data.name);
            setuserDescription(data.about);
            setuserAvatar(data.avatar);
            setIdUser(data._id);
        });
    }

    function fetchCards() {
        let initialCards = [];
        fetch(`${api.address}${api.groupId}/cards`, {
            headers: {
                authorization: api.token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            let isOwner = false;
            for (let i = 0; i <= 5; i++) {
              let likesCard = data[i].likes;
              let isLiked = false;
              likesCard.forEach((like) => {
                if (like._id == idUser) {
                  isLiked = true;
                }
              });
              if (data[i].owner._id == idUser) {
                isOwner = true;
              } else {
                isOwner = false;
              }
              initialCards.push({
                name: data[i].name,
                link: data[i].link,
                likes: data[i].likes,
                owner: isOwner,
                idCard: data[i]._id,
                isLiked: isLiked,
              });
            }
            console.log(typeof(cards))
            setCards(initialCards)
        });

    }


    React.useEffect(() => {
        fetchUserInfo();
    },[userName,userDescription,userAvatar]);

    React.useEffect(() => {
        fetchCards();
    },[]);
    
    return(
        <main className="places">
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
            <section className="modal modal-img-delete disabled">
                <h2 className="modal__title modal-img-delete__title">¿Estas seguro/a?</h2>
                <form className="modal__form form" novalidate>
                    <input type="text" name="idCard" className="disabled" />
                    <button
                    className="modal__button modal-img-delete__button idCard"
                    type="submit"
                    id="idCard"
                    >
                    Si
                    </button>
                </form>
            </section>
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
            <section className="modal-img disabled">
                <img
                className="modal-img__src"
                src="<%= require('./images/place__2.png')%>"
                alt="img"
                />
                <p className="modal-img__title"></p>
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
            <div class="places__elements">
                {cards.map(card =>  <Card title={card.name} imgSrc={card.link} likes={card.likes.length}/>)}
            </div>
        </main>
    )
}

export default Main;