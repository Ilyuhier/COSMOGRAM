const photosArray = []
photosArray.length = 25
const descriptionsArray = ['Лисий мужик тримає руку над глобусом','Серферша на фосфорному серфі','Джоні Сільверхенд дедінсайдить','Хтось законсервував Шедоу','Дарт Вейдер','Чувак з джевеліном','Уосмічний корабель','Дєд в скафандрі','Ще живий Дарт Мол','Ікс-вінг потрапив в дтп','Здорова рука показує на мікрочєла','Якась тьотя з плащем','Quadra V-Tech','Великий спейсшип замело піском','Чувак в масці типу брата сталі','Чувіха з джевеліном','Українські євангеліони','Мужики варять пороги для потяга','Наворочений шагоход, газ вписаний','Мужики мідь крадуть на метал','Рідний подол після потопу в метро','Подругу не пропускають на кордоні','Роботи в них є, а на LED монітори грошей не аистачило','You look lonely, i can  fix that','Через податки на нерухомість, всі попереселялись в літаючу рухомість']
const commentsUsedId = new Set
for(let i = 1; i<=photosArray.length; i++ ){
  photosArray[i-1]  = createObjects(i)
}
console.log(photosArray)
console.log(commentsUsedId)
function createObjects(i){
  const photo = {}
  photo.id = i
  photo.url = `./photos/${i}.jpg`
  photo.description = createDescription(i)
  photo.likes = getrandomInt(15, 200)
  photo.comments = createComments()
  return photo
}

function createDescription(i){
  return descriptionsArray[i-1]
}

function createComments(){
  const comments = [];
  const commentsMin = 5;
  const commentsMax = 20;
  const amountOfComments = getrandomInt(commentsMin, commentsMax)
  for(let i = 1; i<=amountOfComments; i++){
    comments.push(createCommentObject())
  }
  return comments
}

function createCommentObject(){
  const comment = {}
  comment.id = createCommentId()
  comment.name = chooseName()
  comment.message = writeMessage()
  comment.avatar = chooseAvatar()
  return comment
}

function createCommentId(){
  let id = getrandomInt(1, 1000)
  if(commentsUsedId.has(id)){
    id = getrandomInt(1, 1000)
  } else 
  commentsUsedId.add(id)
  return id
}

function chooseAvatar(){
  const min = 1;
  const max = 6;
  const avatarNumber = getrandomInt(min, max)
  return `./img/avatar-${avatarNumber}.svg`
}

function writeMessage(){
  const messagesArray = ['Все відмінно!','Загалом все непогано. Але не всі.','Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.','Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.','Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.','Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?']
  const min = 0;
  const max = messagesArray.length - 1;
  const message = messagesArray[getrandomInt(min, max)]
  return message;
}

function chooseName(){
  const namesArray = ['Антон','Іван','Марія','Влад','Даша','Таня','Віталік','Степан','Галя','Аня','Вася','Ілля','Руслан','Саша','Наташа','Андрій','Назар','Світлана','Даня']
  const min = 0;
  const max = namesArray.length - 1;
  const name = namesArray[getrandomInt(min, max)]
  return name
}

function getrandomInt(min, max){
  return Math.floor(Math.random()*(max -min + 1) + min);
}