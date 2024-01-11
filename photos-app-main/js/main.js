import { displayPictures } from "./displayPicture.js";

async function showData(){
  try{
    const response = await fetch('http://127.0.0.1:4026/photo')

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const photosArray = await response.json()
    console.log(photosArray)
    displayPictures(photosArray)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

showData()

import { bigPicture } from "./bigPicture.js"
document.querySelector('.pictures').addEventListener('click', checking)
function checking(evt){
  if (evt.target.tagName === 'IMG'||evt.target.tagName === 'P'||evt.target.tagName === 'SPAN'){
    bigPicture(evt)
  }
}

import { displayForm } from "./form.js";
document.querySelector('#upload-file').addEventListener('change', displayForm)