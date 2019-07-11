// GIPHY API info
const apiKey = '';
const searchEndpoint = 'http://api.giphy.com/v1/gifs/search?';

// Page Elements
const input = document.getElementById("search-term");
const gifContainer = document.getElementById("gif-cards");

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
    gifContainer.innerHTML = '';
    jsonResponse.data.forEach(gif => {
        // console.log("Current gif:", gif);
        const gifCard = createGif(gif, 'fixed_height_small');
        // add watch here to see what's being returned when we call that function ^^ 
        gifContainer.appendChild(gifCard);
    })
}

const createGif = (gifObj, imageName) => {
    const img = document.createElement('img');
    // potentially use a DataCleaner class to clean up the response
    img.src = gifObj.images[imageName].url;
    // img.addClass('gif-card');
    return img;
}

const executeSearch = () => {
    if (input.value.length > 2) {
        getSearch().then(gifs => renderGifs(gifs));
    }
}

input.addEventListener( 'keyup', executeSearch);
