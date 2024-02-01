import { displayPictures } from "./displayPicture.js";
export function filterSelect(evt, photosArray){
  const pictures = document.querySelectorAll('.picture')
  const oldChoosenFilter = document.querySelector('.img-filters__button--active')
  oldChoosenFilter.classList.remove('img-filters__button--active')
  evt.target.classList.add('img-filters__button--active')
  pictures.forEach(picture =>{
    picture.outerHTML = ''
  })
  switch (true){
    case evt.target.id === 'filter-default':
      displayPictures(photosArray)
      break;
    case evt.target.id === 'filter-random':
      randomFilter(photosArray)
      break;
    case evt.target.id === 'filter-discussed':
      discussedFilter(photosArray)
      break;
  }
}

function randomFilter(photosArray){
  const usedID = new Set
  const randomArray = []
  for (let i=0; i<10; i++){
    let id = randomize(photosArray.length)
    if (usedID.has(id)){
      id = randomize(photosArray.length)
    } else
    usedID.add(id)
    randomArray.push(photosArray[id])
  }
  displayPictures(randomArray)
}
function randomize(max){
  const min = 0;
  return Math.floor(Math.random() * (max - min) + min);
}

function discussedFilter(photosArray){
  const discussedArray = photosArray.concat()
  discussedArray.sort(function (a, b) {
    if (a.comments.length > b.comments.length) {
      return 1;
    }
    if (a.comments.length < b.comments.length) {
      return -1;
    }
    return 0;
  });
  displayPictures(discussedArray)
}

export  function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};