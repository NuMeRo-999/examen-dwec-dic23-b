export default function saveLocalStorage(key, data) {
  // if(!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(data))
  // }else{
  //   const antiguoLS = JSON.parse(localStorage.getItem('key'));
  //   localStorage.setItem(key, JSON.stringify(Array.from(antiguoLS).concat(data)))
  // }
}