import React from 'react';
import api from '../utils/api';
import Card from './Card'

function Main() {
    const [idUser, setIdUser] = React.useState()
    const [cards,setCards] = React.useState([])

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
        </main>
    )
}

export default Main;