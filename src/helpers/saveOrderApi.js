export default async function saveOrderApi(foodData) {
  fetch('http://localhost:4000/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(foodData)
  })
    .then(response => {
      if(!response.ok){
        throw new Error('Error al insertar la tarea')
      }
      return response.json()
    })
    .then(data => data)
    .catch(err => err)
}