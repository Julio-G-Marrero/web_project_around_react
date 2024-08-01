import React from 'react';
import likeSvg from '../images/like.svg'
import trahsIcom from '../images/Trash.svg'
import closeIcon from '../images/Close_Icon.png';

import ImagePopup from './ImagePopup'


function Card(props) {
  const [selectedCard, setSelectedCard ] = React.useState(false);
  const [overlay, setOverlay ] = React.useState(false);
  const [likesCard, setLikesCard ] = React.useState(props.likes);
  const [isLikedCard, setIsLikedCard ] = React.useState(props.isLiked);
  const [isDeletPlaceOpen, setIsDeletePlaceOpen ] = React.useState(props.isLiked);

  function handleCardClick() {
    setSelectedCard(!selectedCard);
    setOverlay(!overlay);
  }
  
  function handleTrashBtnClikc(){
    setIsDeletePlaceOpen(!isDeletPlaceOpen)
    setOverlay(!overlay);
  }

  function closeAllPopupsCard() {
    setSelectedCard(false)
    setIsDeletePlaceOpen(false)
    setOverlay(false)
  }
  
  function handleCardDelete(e){
    e.preventDefault();
    console.log('eliminand')
    console.log(props.card.idCard)
    console.log(props)
    fetch(
      `https://around.nomoreparties.co/v1/web_es_11/cards/${props.card.idCard}`,
      {
        method: "DELETE",
        headers: {
          authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Algo salio mal ...");
      }
    });
  }
  function handleCardLike() {
    //Verifica una vez más si a esta tarjeta ya le han dado like
    if (!isLikedCard) {
      //No tiene Like
      fetch(
        `https://around.nomoreparties.co/v1/web_es_11/cards/likes/${props.card.idCard}`,
        {
          method: "PUT",
          headers: {
            authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLikesCard(data.likes.length)
          setIsLikedCard(true)
        });
    } else {
      //Tiene Like
      fetch(
        `https://around.nomoreparties.co/v1/web_es_11/cards/likes/${props.card.idCard}`,
        {
          method: "DELETE",
          headers: {
            authorization: "2c6f935b-ffae-4102-85aa-95446d3a4fd7",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.json())
      .then((data) => {
        setLikesCard(data.likes.length)
        setIsLikedCard(false)
      });
    }
  }
    return(
        <div className="cardElement">
        <div className="places__element">
          <div className="places__banner">
            <img className="places__image" src={props.imgSrc} alt="place image" 
            onClick={handleCardClick}/>
            <img
              className={props.isOwn ? 'places__trash-icon pointer' : 'places__trash-icon pointer disabled'}
              src={trahsIcom}
              alt="Trash svg"
              onClick={handleTrashBtnClikc}
            />
          </div>
          <div className="places__info">
            <h2 className="places__title">{props.title}</h2>
            <div className="places__image-container-likes">
              <button className={isLikedCard ? 'places__like like_active':'places__like '}
              onClick={handleCardLike}>
                <img
                  className="pointer"
                  src={likeSvg}
                  alt="like svg"
                />
                <p className="places__image_likes places__likes">{likesCard}</p>
              </button>
            </div>
          </div>
        </div>
        <ImagePopup selected={selectedCard} imgSrc={props.imgSrc} closeIcon={closeIcon} />
        <div 
          className={overlay ? 'overlay' : 'overlay disabled'}
          onClick={closeAllPopupsCard}
        ></div>  
        <section className={isDeletPlaceOpen ? "modal modal-img-delete" :"modal modal-img-delete disabled"}>
          <h2 className="modal__title modal-img-delete__title">¿Estas seguro/a?</h2>
          <form className="modal__form form" novalidate>
              <input type="text" name="idCard" className="disabled" />
              <button
              className="modal__button modal-img-delete__button idCard"
              type="submit"
              id="idCard"
              onClick={handleCardDelete}
              >
              Si
              </button>
          </form>
        </section>
      </div>
    )
}

export default Card