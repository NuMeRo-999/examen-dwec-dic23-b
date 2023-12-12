import renderFoodCard from "./src/components/renderFoodCard";
import renderOrderCard from "./src/components/renderOrderCard";
import fetchComida from "./src/helpers/fetchComida";
import findFoodApi from "./src/helpers/findFoodApi.js";
import saveLocalStorage from "./src/helpers/saveLocalStorage";
import saveOrderApi from "./src/helpers/saveOrderApi.js";

const foodCards = document.querySelector('.cards');
const orderCards = document.querySelector('.order');
let precioTotal = 0;

fetchComida( data => renderFoodCard(foodCards, data));

foodCards.addEventListener('click', async e => {
  if(e.target.classList.contains('card-link')){
    e.target.closest('.card').classList.add('inserted');
    const precio = parseFloat(e.target.dataset.precio);
    precioTotal += precio;
    actualizarPrecio(precioTotal)

    if(orderCards.childElementCount > 0){
      if(!document.querySelector('.pagar')){
        const divPedido = document.createElement('div');
        divPedido.classList.add('pagar');
        divPedido.classList.add('text-center');
        divPedido.classList.add('mb-2');
        
        divPedido.innerHTML = 
        `
        <h4>Realizar Pedido</h4>
        <p>Precio Total: <b>$${precioTotal}</b></p>
        `
        
        const pagarBtn = document.createElement('button')
        pagarBtn.classList.add('btn');
        pagarBtn.classList.add('btn-primary');
        pagarBtn.classList.add('pagarBtn');
        pagarBtn.textContent = "PAGAR 💵";
        
        divPedido.appendChild(pagarBtn);
        orderCards.appendChild(divPedido);
      }
    }

    const productId = e.target.dataset.id;
    await renderOrderCard(orderCards, productId);
  }
})


orderCards.addEventListener('click', async e => {
  if(e.target.classList.contains('btn-delete')) {
    const insertedCards = document.querySelectorAll('.inserted');
    const precio = parseFloat(e.target.dataset.precio);
    precioTotal -= precio;
    actualizarPrecio(precioTotal)

    insertedCards.forEach(card => {
      const idFoodCard = card.querySelector('.card-link').dataset.id;
      if(idFoodCard === e.target.dataset.id){
        card.classList.remove('inserted');
        e.target.closest('.card').remove()
      }

      const cardName = card.querySelector('.card-title').textContent;
      const cardImage = card.querySelector('img').src;
      const cardPrice = parseFloat(card.querySelector('.card-price').textContent.replace('Precio: $', ''));
      cardData = {
        name: cardName,
        image: cardImage,
        price: cardPrice
      };
      data.push(cardData);
    })
  }

  if (e.target.classList.contains('pagarBtn')) {
    const data = [];
    let cardData = {};
    const cards = orderCards.querySelectorAll('.card');
  
    for (const card of cards) {
      console.log(card);
      cardData = {
        name: card.querySelector('.name').textContent,
        image: card.querySelector('img').src,
        price: parseFloat(card.querySelector('.card-price').textContent.replace('Precio: $', ''))
      };
      data.push(cardData);

      card.classList.remove('inserted')
      card.remove()
      const pagarElement = orderCards.querySelector('.pagar');
      if (pagarElement) {
        pagarElement.remove();
      }
    }
    const cardsConOpacity = foodCards.querySelectorAll(".card");

    for (const cardQuitOpacity of cardsConOpacity) {
      cardQuitOpacity.classList.remove("inserted");
    }
  
    const finalData = {
      productos: data,
      precioTotal
    };
  
    precioTotal = 0;
    saveLocalStorage('OrderFoods', finalData);
    await saveOrderApi(finalData);
  }
})

function actualizarPrecio(total) {
  const precio = document.querySelector('.pagar');
  if(precio) {
    precio.querySelector('b').textContent = `$${total.toFixed(2)}`
  }
}

const btnBuscar = document.querySelector('.buscar');
const buscador = document.querySelector('.form-control')

btnBuscar.addEventListener('click', async e => {
  if(buscador.value === ""){
    fetchComida( data => renderFoodCard(foodCards, data));
  }else{
    findFoodApi(foodCards, buscador.value)
  }
})

buscador.addEventListener('keydown', async e => {
  if(e.key === "Escape"){
    fetchComida( data => renderFoodCard(foodCards, data))
  }
})

