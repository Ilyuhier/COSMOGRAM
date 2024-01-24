let photosArray;
const socialComments = document.querySelector('.social__comments')
let commentsCounter = 0;
export function bigPicture(evt, globalPhotosArray){
  photosArray = structuredClone(globalPhotosArray)
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
  socialComments.innerHTML = ''

  const uploadMore = document.querySelector('#uploadMore')
  showComments()
  uploadMore.addEventListener('click', showComments)
  const reset = document.querySelector('.big-picture__cancel')
  reset.addEventListener('click', closeBigPicture)
  document.addEventListener('keydown', keyCheck)
  function keyCheck(event){
    if (event.key === 'Escape'){
      closeBigPicture()
    }
  }

  function closeBigPicture(){
    commentsCounter = 0
    uploadMore.classList.remove('hidden')
    body.classList.remove('modal-open')
    bigPic.classList.add('hidden')
    document.removeEventListener('keydown', keyCheck)
    uploadMore.removeEventListener('click', showComments)
    reset.removeEventListener('click', closeBigPicture)
  }

  function showComments(){
    const shownCounter = document.querySelector('.comments-shown')
    const countedComments = commentsCounter
    if ((pictureObject.comments.length - commentsCounter) <= 6){
      commentsCounter = pictureObject.comments.length
      uploadMore.classList.add('hidden')
      console.log('first if')
    } else{
      commentsCounter += 5; 
      console.log('second if')
    }
    for(let i = countedComments; i<commentsCounter; i++){
      showComment(pictureObject.comments[i])
    }
    console.log('else')
    // if (pictureObject.comments.length === commentsCounter && !uploadMore.classList.contains('hidden')){
    //   uploadMore.classList.add('hidden')
    // }
    shownCounter.textContent = commentsCounter
    console.log('comments counter '+commentsCounter) //wrkn' momnts
    console.log('counted comments '+countedComments)
    console.log('length '+pictureObject.comments.length)
  }
}

function showComment(comment){
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