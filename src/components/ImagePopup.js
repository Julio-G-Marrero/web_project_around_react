import React from 'react';

function ImagePopup(props) {
    return(
        <div className={props.selected ? "modal-img" : "modal-img disabled"}>
            <img
            className="modal-img__src"
            src={props.imgSrc}
            alt="img"
            />
            <img
            className="modal-img__close"
            src={props.closeIcon}
            onClick={props.handleCardClick}
            alt="close icon"
            />
            <p className="modal-img__title">{props.title}</p>
        </div>
    )
}

export default ImagePopup;