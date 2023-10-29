console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function(){

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let breeds = [];


// fetch

fetch(imgUrl)
    .then(response => response.json())
    .then(data => data.message.forEach(dogImage => renderImage(dogImage)))

fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        breeds = Object.keys(data.message)
        renderBreeds(breeds)
    })

// DOM selectors

const dropdown = document.getElementById('breed-dropdown')
const ul = document.getElementById('dog-breeds')

// Event Listeners
dropdown.addEventListener('change', handleChange)

// render functions
function renderImage(dogImage) {
    const container = document.querySelector('#dog-image-container')
    const image = document.createElement('img')
    image.src = dogImage
    container.append(image)
}

function renderBreeds(breeds) {
    // const ul = document.getElementById('dog-breeds')
    breeds.forEach(breed => {
        const li = document.createElement('li')
        li.innerText = breed
        ul.append(li)
        li.addEventListener('click', changeColor)
    })
}

// callback functions

function changeColor(event) {
    event.target.style.color = "orange"
}

function handleChange (event) {
    let letter = event.target.value
    let filterBreeds = breeds.filter(breed => breed.startsWith(letter))
    ul.innerHTML = ''
    renderBreeds(filterBreeds)
}
})