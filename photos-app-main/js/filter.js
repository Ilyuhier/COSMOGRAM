import noUiSlider from '../node_modules/nouislider/dist/nouislider.mjs'
const slider = document.querySelector('#slider')
const preview = document.querySelector('.img-upload__preview').children[0]
const sliderRanges = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 0.5,
    class: 'effects__preview--chrome'
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 0.5,
    class: 'effects__preview--sepia'
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 60,
    class: 'effects__preview--marvin'
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 1.5,
    class: 'effects__preview--phobos'
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 0,
    max: 3,
    step: 0.1,
    start: 1.5,
    class: 'effects__preview--heat'
  }
}

export function createSlider(){
  noUiSlider.create(slider, {
    start: 50,
    connect: 'lower',
    range: {
        'min': 0,
        'max': 100
    },
    step: 25
  });
  slider.style.display = 'none'
  slider.noUiSlider.on('slide', setValue)
}

export function chooseFilter(evt){
  console.log(evt.target.value)
  switch (evt.target.value){
    case 'none':
      slider.style.display = 'none'
      preview.className = ''
      preview.style.filter = ''
      preview.style.webkitFilter = ''
      break;
    case 'chrome':
      updateSlider(sliderRanges.chrome);
      break;
    case 'sepia':
      updateSlider(sliderRanges.sepia);
      break;
    case 'marvin':
      updateSlider(sliderRanges.marvin);
      break;
    case 'phobos':
      updateSlider(sliderRanges.phobos);
      break;
    case 'heat':
      updateSlider(sliderRanges.heat);
      break;
  }
}

function setValue(){
  const valueInput = document.querySelector('.effect-level__value')
  valueInput.value = slider.noUiSlider.get()
  console.log(valueInput.value)
  console.log(typeof(preview.style.filter))
  preview.style.filter = `${preview.dataset.filter}(${Number(valueInput.value)}${preview.dataset.unit})`
  preview.style.webkitFilter = `${preview.dataset.filter}(${Number(valueInput.value)}${preview.dataset.unit})`
}



function updateSlider(parametrs){
  slider.style.display = ''
  console.log(parametrs)
  preview.className = ''
  preview.style.filter = ''
  preview.style.webkitFilter = ''
  preview.classList.add(parametrs.class)
  preview.dataset.filter = parametrs.filter
  preview.dataset.unit = parametrs.unit
  slider.noUiSlider.updateOptions({
    range: {
      'min': parametrs.min,
      'max': parametrs.max
    },
    step: parametrs.step,
    start: parametrs.start
  })
  setValue()
}