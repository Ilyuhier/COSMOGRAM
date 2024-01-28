const body = document.querySelector('body')
const form = document.querySelector('.img-upload__overlay')
const imgUpload = document.querySelector('#upload-file')
const hashTagArea = form.querySelector('.text__hashtags')
const descriptionArea = form.querySelector('.text__description')
const hashTagInvalidSymbols = ['#','@','$','.',',','-']
const scaleControl = document.querySelector('.scale__control--value')
const preview = document.querySelector('.img-upload__preview').children[0]
let validHashTagsArray = true
const reader = new FileReader();

import { createSlider } from "./filter.js"
import { chooseFilter } from "./filter.js"
import { destroySlider } from "./filter.js"

export function displayForm(evt){
  const sellectedFile = evt.target.files[0];
  reader.onload = function(evt){
    preview.src = evt.target.result;
  }
  reader.readAsDataURL(sellectedFile);
  body.classList.add('modal-open')
  form.classList.remove('hidden')
  hashTagArea.required = false
  turnOnScale()
  const submitButton = document.querySelector('.img-upload__submit')
  submitButton.addEventListener('click', formCheck)
  const reset = document.querySelector('.img-upload__cancel')
  reset.addEventListener('click', closeBigPicture)
  document.addEventListener('keydown', keyCheck)
  createSlider()
  const effectList = document.querySelector('.effects__list')
  effectList.addEventListener('change', chooseFilter)
}

function formCheck(){
  validHashTagsArray = true
  const hashTagsSet = new Set ;
  const hashTagsArray = hashTagArea.value.split(' ')
  if (hashTagArea.value.length === 0){
    validHashTagsArray = true
  } else if (hashTagsArray.length > 5){
    hashTagArea.setCustomValidity(`не можна вказати більше п'яти хеш-тегів`)
    validHashTagsArray = false
  } else {
    hashTagsArray.forEach(hashTag => hashTagCheck(hashTag, hashTagsSet));
  }
  
  if (validHashTagsArray === true){
      hashTagArea.setCustomValidity('')
  }

  if (descriptionArea.value.length > 140){
    descriptionArea.setCustomValidity('довжина коментаря не може становити більше 140 символів')
  } else {
    descriptionArea.setCustomValidity('')
  }
  
  document.addEventListener('submit', publishing)
}

function hashTagCheck(hashTag, hashTagsSet){
  let validWord = true
  const lowerCaseHashTag = hashTag.toLowerCase()
  if (!hashTag.startsWith('#')){
    hashTagArea.setCustomValidity("хеш-тег починається із символу #")
    validWord = false;
  }
  if (hashTag.length > 20){
    hashTagArea.setCustomValidity("максимальна довжина одного хеш-тегу 20 символів, включаючи ґрати")
    validWord = false;
  }
  if (hashTag.length < 2){
    hashTagArea.setCustomValidity("хеш-тег не може складатися тільки з одного ґрат")
    validWord = false;
  }
  for(let i=1; i<hashTag.length; i++){
    hashTagInvalidSymbols.forEach(symbol =>{
      if (hashTag[i] === symbol){
        hashTagArea.setCustomValidity("рядок після ґрат має складатися з літер і чисел і не може містити прогалини, спецсимволи (#, @, $ і т. п.), символи пунктуації (тире, дефіс, кома тощо), емодзі і т.д.")
        validWord = false;
      } 
    })
  }
  if (hashTagsSet.has(lowerCaseHashTag)){
    hashTagArea.setCustomValidity("один і той же хеш-тег не може бути використаний двічі")
    validWord = false;
  }
  if (validWord === false){
    validHashTagsArray = false
  }
  hashTagsSet.add(lowerCaseHashTag)
}

function keyCheck(event){
  if (event.key === 'Escape'){
    closeBigPicture()
  }
}

function closeBigPicture(){
  if (document.activeElement === hashTagArea || document.activeElement === descriptionArea){
    return
  }
  body.classList.remove('modal-open')
  form.classList.add('hidden')
  hashTagArea.value =''
  descriptionArea.value =''
  imgUpload.value =''
  document.removeEventListener('keydown', keyCheck)
  document  .removeEventListener('click', closeBigPicture)
  destroySlider()
  reloadScale()
  preview.src = ''
}

function turnOnScale(){
  const scaleField = document.querySelector('.scale')
  scaleField.addEventListener('click', scaling)
}

function scaling(evt){
  let value = +scaleControl.value.split('%')[0]
  if (evt.target.classList.contains('scale__control--smaller') && value === 25 ||evt.target.classList.contains('scale__control--bigger') && value === 100 ){
    return
  }
  switch (true){
    case evt.target.classList.contains('scale__control--smaller'):
    value -= 25;
    break;
    case evt.target.classList.contains('scale__control--bigger'):
    value += 25;
    break;
  }
  scaleControl.value = `${value}%`
  preview.style.transform = `scale(${scaleControl.value})`
}

function reloadScale(){
  scaleControl.value = '100%'
  preview.style.transform = ''
}

async function publishing(evt){
  evt.preventDefault()
  const formToPublish = document.querySelector('.img-upload__form')
  const formData = new FormData(formToPublish)
  for (let key of formData.keys()) {
    console.log(`KEY: ${key}`)
    console.log(formData.get(key));
  }
  const url = 'http://localhost:3000/picture'
  const data = {}
  data.url = preview.src
  data.description = formData.get('description')
  data.hashtags = formData.get('hashtags')
  data.scale = formData.get('scale')
  data.effect = formData.get('effect')
  data.effectLevel = formData.get('effect-level')
  
  console.log(data)

  try {
    const init = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
      "Content-Type": "application/json",
    },
    }
    const response = await fetch(url, init);
    const json = await response.json();
    alert(`Congrats!!! ${JSON.stringify(json)}`)
  }
  catch (error){
    console.log(`Ooops ${error}`)
  }


  closeBigPicture()
}