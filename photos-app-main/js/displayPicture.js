function displayPicture(photoObject){
  const photoElement = document.querySelector('#picture').cloneNode(true).content
  const photoImg = photoElement.querySelector('.picture__img')
  const photoComment = photoElement.querySelector('.picture__comments')
  const photoLikes = photoElement.querySelector('.picture__likes')
  photoImg.src = photoObject.url
  photoComment.textContent = photoObject.comments.length
  photoLikes.textContent = photoObject.likes
  photoImg.dataset.id = photoObject.id 
  // додоаю дата ід до всіх елементів, які можуть натиснутись
  photoComment.dataset.id = photoObject.id 
  photoLikes.dataset.id = photoObject.id 
  photoLikes.parentElement.dataset.id = photoObject.id 
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