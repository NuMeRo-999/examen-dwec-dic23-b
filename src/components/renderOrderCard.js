export default async function renderOrderCard(container, id) {
  const URL = `http://localhost:4000/categories/${id}`;
  try {
    const response = await fetch(URL);
    const data = await response.json()
    
    const orderCard = `
    <div class="card mb-2 text-center">
      <img src="${data.strCategoryThumb}" alt="" width="400">
      <h3 class="card-title name">${data.strCategory}</h3>
      <p class="card-price" >Precio: $${data.price}</p>
      <a href="#" class="btn btn-danger btn-delete" data-precio=${data.price} data-id=${data.id}>Eliminar</a>
    </div>
    `
    container.innerHTML += orderCard


  } catch (error) {
    console.log(error.message);
  }
}