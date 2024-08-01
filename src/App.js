import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import api from './utils/api';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { CardsContext } from './contexts/CardsContext';

import './App.css';

function App() {
  const [isEditProfilePopupOpen ,setIsEditProfilePopupOpen ] = React.useState(false) 
  const [isAddPlacePopupOpen ,setIsAddPlacePopupOpen ] = React.useState(false) 
  const [isEditAvatarPopupOpen ,setIsEditAvatarPopupOpen ] = React.useState(false) 
  const [overlay, setOverlay ] = React.useState(false);
  const [currentUser, setCurrentUser ] = React.useState([]);
  const [cards,setCards] = React.useState([]);

  function handleUpdateUser(data){
    fetch("https://around.nomoreparties.co/v1/web_es_11/users/me", {
      method: "PATCH",
      headers: {
        authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(() => {
      data.avatar = currentUser.avatar;
      data._id = currentUser._id;
      data.cohort = currentUser.cohort;
      setCurrentUser(data)
      closeAllPopups()
    });
  }

  function handleUpdateAvatar(data){
    fetch("https://around.nomoreparties.co/v1/web_es_11/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(() => {
      const newData = {
        name : currentUser.name,
        about : currentUser.about,
        avatar : data.avatar,
        _id : currentUser._id,
        cohort : currentUser.cohort,
      }
      setCurrentUser(newData);
      closeAllPopups()

    })
  }

  function handleAddPlaceSubmit(e){
    e.preventDefault();
    const titleCard = e.target[0].value;
    const linkCard = e.target[1].value;
    console.log(titleCard)
    console.log(linkCard)

    fetch("https://around.nomoreparties.co/v1/web_es_11/cards", {
      method: "POST",
      headers: {
        authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: titleCard,
        link: linkCard,
      }),
    }).then((res) => res.json())
    .then((data) => {
      const newCard = data
      setCards([newCard, ...cards]);
      closeAllPopups();
    })

  }

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

  function fetchUserInfo() {
    fetch(`${api.address}${api.groupId}/users/me`, {
      headers: {
          authorization: api.token,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setCurrentUser(data)
    });
  }
  React.useEffect(() => {
    fetchUserInfo();
    fetchCards();
  },[]);

  function fetchCards() {
    let initialCards = [];
    fetch(`${api.address}${api.groupId}/cards`, {
        headers: {
            authorization: api.token,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i <= 5; i++) {
          let likesCard = data[i].likes;
          let isLiked = false;
          likesCard.forEach((like) => {
            if (like._id == currentUser._id) {
              isLiked = true;
            }
          });
          initialCards.push({
            name: data[i].name,
            link: data[i].link,
            likes: data[i].likes,
            owner: data[i].owner,
            idCard: data[i]._id,
            isLiked: isLiked,
          });
        }
        setCards(initialCards)
    });
  }
  // React.useEffect(() => {
  //     fetchCards();
  // },[]);

  return (
    <div class="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Header />
          <Main onEditProfileClick={onEditProfileClick} onEditAvatarClick={onEditAvatarClick} onAddPlaceClick={onAddPlaceClick} closeAllPopups={closeAllPopups} />
          <Footer />
          <AddPlacePopup onUpdatePlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}></AddPlacePopup>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}></EditAvatarPopup>
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
          <div 
            className={overlay ? 'overlay' : 'overlay disabled'}
            onClick={closeAllPopups}
          ></div>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
