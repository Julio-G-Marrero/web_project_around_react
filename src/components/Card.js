import React from 'react';
import likeSvg from '../images/like.svg'
import trahsIcom from '../images/Trash.svg'
import closeIcon from '../images/Close_Icon.png';

function Card(props) {
  const [selectedCard, setSelectedCard ] = React.useState(false);
  const [overlay, setOverlay ] = React.useState(false);

  function handleCardClick() {
    setSelectedCard(!selectedCard);
    setOverlay(!overlay);
  }
    return(
        <div className="cardElement">
        <div className="places__element">
          <div className="places__banner">
            <img className="places__image" src={props.imgSrc} alt="place image" 
            onClick={handleCardClick}/>
            <img
              className="places__trash-icon pointer"
              src={trahsIcom}
              alt="Trash svg"
            />
          </div>
          <div className="places__info">
            <h2 className="places__title">{props.title}</h2>
            <div className="places__image-container-likes">
              <button className="places__like">
                <img
                  className="pointer"
                  src={likeSvg}
                  alt="like svg"
                />
                <p className="places__image_likes places__likes">{props.likes}</p>
              </button>
            </div>
          </div>
        </div>
        <div className={selectedCard ? "modal-img" : "modal-img disabled"}>
          <img
            className="modal-img__src"
            src={props.imgSrc}
            alt="img"
          />
          <img
            className="modal-img__close"
            src={closeIcon}
            onClick={handleCardClick}
            alt="close icon"
          />
          <p className="modal-img__title"></p>
        </div>
        <div 
          className={overlay ? 'overlay' : 'overlay disabled'}
          onClick={handleCardClick}
        ></div>  
      </div>
    )
}

export default Card