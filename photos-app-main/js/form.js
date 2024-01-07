const body = document.querySelector('body')
const form = document.querySelector('.img-upload__overlay')
const imgUpload = document.querySelector('#upload-file')
const hashTagArea = form.querySelector('.text__hashtags')
const descriptionArea = form.querySelector('.text__description')
const hashTagInvalidSymbols = ['#','@','$','.',',','-']
let validHashTagsArray = true

export function displayForm(){
  body.classList.add('modal-open')
  form.classList.remove('hidden')
  hashTagArea.required = false
  const submitButton = document.querySelector('.img-upload__submit')
  submitButton.addEventListener('click', formCheck)
  const reset = document.querySelector('.img-upload__cancel')
  reset.addEventListener('click', closeBigPicture)
  document.addEventListener('keydown', keyCheck)
}

function formCheck(){
  validHashTagsArray = true
  const hashTagsSet = new Set ;
  const hashTagsArray = hashTagArea.value.split(' ')
  console.log(hashTagsArray)
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
  console.log(validHashTagsArray)
  if (descriptionArea.value.length > 140){
    descriptionArea.setCustomValidity('довжина коментаря не може становити більше 140 символів')
  } else {
    descriptionArea.setCustomValidity('')
  }
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
  console.log(hashTagsSet)
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
}