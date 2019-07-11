// GIPHY API info
const apiKey = '';
const searchEndpoint = 'http://api.giphy.com/v1/gifs/search?';

// Page Elements
const input = document.getElementById("search-term");
const gifContainer = document.getElementById("gif-cards");
const loadingPlaceHolderContainer = document.getElementById("loading-placeholder");

// grab gif objects from GIPHY search endpoint
const getSearch = async () => {
  const searchTerm = input.value;
  const urlToFetch = `${searchEndpoint}&api_key=${apiKey}&q=${searchTerm}`;
  try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
      }
    } 
  catch (error) {
    console.log(error);
    }
};

const renderGifs = (jsonResponse) => {
    // potentially add a data attribute as a way to keep track of which gifs have already been appended, and if they have to keep them there and delete the old ones and add the new ones.... maybe. might be overkill
    jsonResponse.data.forEach((gif, i) => {
        // console.log("Current gif:", gif);
        createGif(gif, 'fixed_height_small', i);
        // add watch here to see what's being returned when we call that function ^^ 
        // gifContainer.appendChild(gifCard);
    })
}

const createGif = (gifObj, imageName, i) => {
    const img = document.createElement('img');
    img.id = `image-${i}`
    img.style.display = 'none';
    img.src = gifObj.images[imageName].url;
    img.addEventListener('load', () => {
        img.style.display = '';
        const placeholderDiv = document.querySelector(`#placeholder-${i}`);
        placeholderDiv.innerHTML = '';
        placeholderDiv.classList.remove("placeholder");
        placeholderDiv.className += "tiny image";
        placeholderDiv.appendChild(img);
    });
}

const addPlaceholder = (i) => {
    const outerDiv = document.createElement('div');
    outerDiv.className += "column";
    const appendedOuterDiv = loadingPlaceHolderContainer.appendChild(outerDiv);
    const segmentDiv = document.createElement('div');
    // segmentDiv.className += "ui segment";
    const appendedLastDiv = appendedOuterDiv.appendChild(segmentDiv);
    const placeHolderDiv = document.createElement('div');
    placeHolderDiv.className += "ui placeholder";
    placeHolderDiv.id = `placeholder-${i}`;
    const appendedPlaceholderDiv = appendedLastDiv.appendChild(placeHolderDiv);
    const imageDiv = document.createElement("div");
    imageDiv.className += "rectangle image";
    appendedPlaceholderDiv.appendChild(imageDiv);
}

const executeSearch = () => {
    if (input.value.length > 2) {
        loadingPlaceHolderContainer.innerHTML = '';
        gifContainer.innerHTML = '';
        for (let i = 0; i < 25; i++) {
            addPlaceholder(i);
        }
        getSearch().then(gifs => renderGifs(gifs));
    }
}


document.addEventListener("DOMContentLoaded", function(){
    $('h1').transition('tada');
    input.addEventListener( 'keyup', executeSearch);
});

