import React from 'react';
import api from '../utils/api';
import Card from './Card'
import avatar from '../images/Avatar.png';
import editBtn from '../images/Edit_Button.svg';

import addBtn from '../images/Add_Button.png';
import editAvatarIcon from '../images/editProfile.png';

function Main(props) {
    const [idUser, setIdUser] = React.useState()
    const [cards,setCards] = React.useState([])

    const [modalEditProfile, setmodalEditProfile ] = React.useState(false);
    const [modalEditAvatar, setmodalEditAvatar ] = React.useState(false);
    const [modalAddPlace, setmodalAddPlace ] = React.useState(false);
    const [userName, setUserName] = React.useState(false);
    const [userDescription, setuserDescription] = React.useState(false);
    const [userAvatar, setuserAvatar] = React.useState(false);
    const [overlay, setOverlay ] = React.useState(false);


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
              onClick={props.onEditAvatarClick }

              />
            </div>
            <div className="profile__info">
              <div className="profile__containter">
              <h1 className="profile__name">{userName}</h1>
              <img
              className="profile__button"
              src={editBtn}
              alt="edit button"
              onClick={props.onEditProfileClick}
              />
              </div>
              <p className="profile__rol">{userDescription}</p>
            </div>
            <div className="profile__add">
              <img
              className="profile__add-place"
              src={addBtn}
              alt="add buton img"
              onClick={props.onAddPlaceClick}
              />
            </div>
          </div>
        </section>
            {/* <section className="modal modal-img-delete disabled">
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
            </section> */}

            <div class="places__elements">
                {cards.map(card =>  <Card title={card.name} imgSrc={card.link} likes={card.likes.length}/>)}
            </div>
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
      </main>
    )
}

export default Main;