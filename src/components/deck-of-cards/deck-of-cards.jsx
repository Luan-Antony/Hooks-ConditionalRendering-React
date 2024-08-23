import { useState, useEffect } from "react";

async function createDeck() {
    const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const deck = await response.json();
    return deck.deck_id;
}

async function getCards(deckId) {
    const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
    );
    return await response.json();
}

const CardsList = (props) => {
    return (
        <ul>
            {
                props.cards.map((card, index) => {
                    return (
                        <li key={index}>
                            <img src={card.image} alt={card.value} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

const DeckOfCards = () => {

    const [deck, setDeck] = useState({
        cards: []
    })
    //useState quando executado vai retornar, a variavel para popular as cartas e uma função responsavel por atualizar o array

    //setDeck vai ser usado para atualizar o deck
    //deck é a variavel e setDeck o metodo para atualizar
    //é uma atribuição via destruturação, pois estamos criando um array novo com o retono do useState

    useEffect(() => {
        const fetchData = async () => {
            const deckId = await createDeck()
            const data = await getCards(deckId)

            setDeck({
                cards: data.cards
            })
        }
        fetchData()
    }, []) //o array vazio como argumento faz com que o useEffect não entre em loop com o setDeck

    //useEffect causa um efeito colateral no componente, exercendo a mesma função do didMount. Muda o estado do componente com as informações novas

    //useEffect não aceita o async então é preciso adiciona-lo dentro de uma função: const fetchData = async () => {  } fetchData ()

    return (
        <section>
            {deck.cards.length > 0 ? <CardsList cards={deck.cards}/> : "nenhuma carta encontrada" }
        </section>
    )
}
//https://react.dev/learn/conditional-rendering (explicação linha 63-67 renderização condicional)

export default DeckOfCards;