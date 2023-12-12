export default function renderFoodCard(container, foodData) {
  container.innerHTML = ""

  foodData.forEach(foodData => {
    const foodCard = `
    <div class="col-md-4">
      <div class="card">
        <img
          src="${foodData.strCategoryThumb}"
          class="card-img-top"
          alt="Imagen de comida"
        />
        <div class="card-body">
          <h5 class="card-title">${foodData.strCategory}</h5>
          <p class="card-text"> ${foodData.strCategoryDescription.slice(0, 30)}...</p>
          <p class="card-text">Precio: $${foodData.price}</p>
          <a href="#" data-precio=${foodData.price} data-id=${foodData.id} class="btn btn-link card-link">Añadir</a>
        </div>
      </div>
    </div>`
  
    container.innerHTML += foodCard;
  });
} 