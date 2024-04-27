'use strict'

// Function to load a new image of a cat or dog based on the user's choice
async function loadAnimal() {
    // Determine the selected animal type (cat or dog)
    const animalType = document.querySelector('#animalType').value;
    
    // Define the API endpoint based on the selected animal type
    const endpoint = animalType === 'cat' ? 'https://api.thecatapi.com/v1/images/search' : 'https://dog.ceo/api/breeds/image/random';
    
    const response = await fetch(endpoint);
    
    if (response.ok) {
        const data = await response.json();
        let imgURL;
        if (animalType === 'cat') {
            imgURL = data[0].url;
        } else {
            imgURL = data.message;
        }
        console.log(imgURL);
        document.querySelector('#animalImage').src = imgURL;
    } else {
        console.log("No animal picture for you");
    }
}



const textInput = document.querySelector('#textInput');

const wordCountDisplay = document.querySelector('#wordCount');

const directionsDisplay = document.querySelector('#directions');

const wordLimitSelect = document.querySelector('#wordLimit');

textInput.value = localStorage.getItem('userText') || '';

// Updates the word count display based on the initial text
updateWordCount();

updateDirections();

textInput.addEventListener('input', function() {
    updateWordCount();
    
    localStorage.setItem('userText', this.value);
});

wordLimitSelect.addEventListener('change', function() {
    updateDirections();
});

function updateWordCount() {
    const text = textInput.value;
    
    const wordCount = countWords(text);
    
    wordCountDisplay.textContent = 'Word count: ' + wordCount;

        const wordLimit = parseInt(wordLimitSelect.value);
        if (wordCount % wordLimit === 0) {
            loadAnimal();
        }
}

function updateDirections() {
    const wordLimit = parseInt(wordLimitSelect.value);
    directionsDisplay.textContent = `Every ${wordLimit} words written will generate a new cute cat picture.`;
}

function countWords(text) {
    text = text.trim();
    const words = text.split(/\s+/);
    return words.filter(word => word !== '').length;
}

async function fetchCatFact() {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
            throw new Error('Failed to fetch cat fact');
        }
        const data = await response.json(); 
        return data.fact; 
    } catch (error) {
        console.error(error);
        return 'Failed to fetch cat fact';
    }
}

async function fetchDogFact() {
    try {
        const response = await fetch('https://dog-api.kinduff.com/api/facts?number=1');
 
        const data = await response.json();
        return data.facts[0]; 
    } catch (error) {
        console.error(error);
        return 'Failed to fetch dog fact';
    }
}

async function displayFunFact() {
    const animalType = document.querySelector('#animalType').value;
    const funFactContainer = document.querySelector('#funFact');

    funFactContainer.textContent = '';

    let fact;
    if (animalType === 'cat') {
        fact = await fetchCatFact();
    } else if (animalType === 'dog') {
        fact = await fetchDogFact();
    }
    funFactContainer.textContent = fact;
}

window.addEventListener('load', async () => {
    const catFact = await fetchCatFact();
    document.querySelector('#funFact').textContent = catFact;
});

document.querySelector('#animalType').addEventListener('change', displayFunFact);

// load an Image AND fact for a cat or dog
// interface - textarea