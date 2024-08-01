import React from 'react';
import closeIcon from '../images/Close_Icon.png';

function PopupWithForm(props) {
    return (
        <>
        <div className={props.isOpen ? 'modal' : 'modal disabled'}>
            <h2 className='modal__title'>{props.title}</h2>
            <form onSubmit={props.onSubmit} className="modal__form form" novalidate>
                <input
                    className="modal__input modal__input_name form__input"
                    type="text"
                    minlength="2"
                    id="name-input"
                    placeholder={props.placeholderFirstInput}
                    value={props.fisrtValue}
                    onChange={props.handleChange}
                    ref={props.ref}
                />
                <span className="form__input-error name-input-error"></span>
                {props.placeholderSecondInput ? 
                    <input
                        type="text"
                        placeholder={props.placeholderSecondInput}
                        required
                        minlength="2"
                        maxlength="200"
                        id="profesion-input"
                        className="modal__input modal__input_job form__input"
                        value={props.secondValue}
                        onChange={props.handleChange}

                    />
                : ''}
                <span className="form__input-error profesion-input-error"></span>

                <button className="modal__button" type="submit">{props.saveMessage}</button>
            </form>
            <img
                className="modal__close modal__close-place"
                src={closeIcon}
                onClick={props.closeAllPopups}
                alt="close icon"
            />
        </div>
        </>
    )

}

export default PopupWithForm;