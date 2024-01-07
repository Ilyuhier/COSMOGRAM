import { photosArray } from "./dataGenerator.js"

export function bigPicture(evt){
  const body = document.querySelector('body')
  body.classList.add('modal-open')
  console.log(evt.target.tagName)
  const bigPic = document.querySelector('.big-picture')
  bigPic.classList.remove('hidden')
  console.log(typeof(evt.target.dataset.id))
  const bigPicImg = document.querySelector('.big-picture__img')
  const likesCount = document.querySelector('.likes-count')
  const commentsCount = document.querySelector('.comments-count')
  const socialCaption = document.querySelector('.social__caption')
  const pictureObject = photosArray.find(function(obj){
    return obj.id == evt.target.dataset.id 
  })
  console.log(pictureObject)
  bigPicImg.children[0].src = pictureObject.url
  likesCount.textContent = pictureObject.likes
  commentsCount.textContent = pictureObject.comments.length
  socialCaption.textContent = pictureObject.description
  //Ховаємо лічильник
  const commentsCounterBlock = document.querySelector('.social__comment-count')
  commentsCounterBlock.style.display = 'none'
  //Закінчили ховати

  showComments(pictureObject)

  const reset = document.querySelector('.big-picture__cancel')
  reset.addEventListener('click', closeBigPicture)
  document.addEventListener('keydown', keyCheck)
  function keyCheck(event){
    if (event.key === 'Escape'){
      closeBigPicture()
    }
  }


  function closeBigPicture(){
    body.classList.remove('modal-open')
    bigPic.classList.add('hidden')
    document.removeEventListener('keydown', keyCheck)
  }
}

function showComment(comment, socialComments){
  const socialComment = document.querySelector('#social__comment').cloneNode(true).content
  const socialCommentImg = socialComment.querySelector('.social__picture')
  const socialCommentAuthor = socialComment.querySelector('.social__author')
  const socialCommentText = socialComment.querySelector('.social__text')
  socialCommentImg.src = comment.avatar
  socialCommentImg.alt = comment.name
  socialCommentAuthor.textContent = comment.name
  socialCommentText.textContent = comment.message
  let fragment = document.createDocumentFragment()
  fragment.appendChild(socialComment)
  socialComments.appendChild(fragment)
}

function showComments(pictureObject){
  const socialComments = document.querySelector('.social__comments')
  socialComments.innerHTML = ''
  for(let i = 0; i<5; i++){
    showComment(pictureObject.comments[i], socialComments)
  }
}

