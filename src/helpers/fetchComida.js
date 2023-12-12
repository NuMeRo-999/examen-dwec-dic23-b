export default async function fetchComida(callback) {
  
  fetch('http://localhost:4000/categories')
  .then( response => {
    if(!response.ok) {
      throw new Error('Error to fetch')
    }
    return response.json()
  })
  .then(data => callback(data))
  .catch(error => console.log(error.message))
  
}