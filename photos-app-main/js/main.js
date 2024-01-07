import { generateData } from "./dataGenerator.js";
const photosArray = generateData()
import { displayPictures } from "./displayPicture.js";
displayPictures(photosArray)

import { bigPicture } from "./bigPicture.js"
document.querySelector('.pictures').addEventListener('click', checking)
function checking(evt){
  if (evt.target.tagName === 'IMG'||evt.target.tagName === 'P'||evt.target.tagName === 'SPAN'){
    bigPicture(evt)
  }
}

import { displayForm } from "./form.js";
document.querySelector('#upload-file').addEventListener('change', displayForm)
// displayForm()