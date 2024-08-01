import React from 'react';
import api from '../utils/api';
import Card from './Card'
import avatar from '../images/Avatar.png';
import editBtn from '../images/Edit_Button.svg';
import addBtn from '../images/Add_Button.png';
import editAvatarIcon from '../images/editProfile.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const cards = React.useContext(CardsContext)


  return(
    <main className="places">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar">
            <img
            src={currentUser.avatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
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
            <h1 className="profile__name">{currentUser.name}</h1>
            <img
            className="profile__button"
            src={editBtn}
            alt="edit button"
            onClick={props.onEditProfileClick}
            />
            </div>
            <p className="profile__rol">{currentUser.about}</p>
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
          <div class="places__elements">
              {cards.map(card => {     
                return <Card closeAllPopups={props.closeAllPopups} card={card} isLiked = {card.likes.some(i => i._id === currentUser._id)}  isOwn={card.owner._id === currentUser._id} title={card.name} imgSrc={card.link} likes={card.likes.length}/>
              })}
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