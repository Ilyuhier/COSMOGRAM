function displayPicture(photoObject){
  const photoElement = document.querySelector('#picture').cloneNode(true).content
  const photoImg = photoElement.querySelector('.picture__img')
  const photoComment = photoElement.querySelector('.picture__comments')
  const photoLikes = photoElement.querySelector('.picture__likes')
  photoImg.src = photoObject.url
  photoComment.textContent = photoObject.comments.length
  photoLikes.textContent = photoObject.likes
  const imgUpload = document.querySelector('.img-upload')
  let fragment = document.createDocumentFragment()
  fragment.appendChild(photoElement)
  imgUpload.after(fragment)
}

export function displayPictures(photosArray){
  photosArray.forEach(element => {
    displayPicture(element)
  });
}