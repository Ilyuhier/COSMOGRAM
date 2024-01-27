import { displayPictures } from "./displayPicture.js";
export let globalPhotosArray; 

async function showData(){
  try{
    const response = await fetch('http://127.0.0.1:4026/photo')

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const photosArray = await response.json()
    globalPhotosArray = structuredClone(photosArray)
    console.log(photosArray)
    displayPictures(photosArray)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

showData()
displayForm()//REMEMBER TO DELETE!!!
import * as bigPictureJs from "./bigPicture.js"
document.querySelector('.pictures').addEventListener('click', checking)
function checking(evt){
  if (evt.target.className === 'picture__img'||evt.target.tagName === 'P'){
    bigPictureJs.bigPicture(evt, globalPhotosArray)
  }
}

import { displayForm } from "./form.js";
document.querySelector('#upload-file').addEventListener('change', displayForm)