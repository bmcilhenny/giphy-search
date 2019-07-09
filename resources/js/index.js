

// GIPHY API info
const apiKey = '';
const searchEndpoint = 'http://api.giphy.com/v1/gifs/search?';

// Page Elements
const $input = $('#searchTerm');
const $submit = $('#button');
const $gifContainer = $('#gif-cards');

// grab gif objects from GIPHY search endpoint
const getSearch = async () => {
  const searchTerm = $input.val();
  const urlToFetch = `${searchEndpoint}&api_key=${apiKey}&q=${searchTerm}`;
  try {
      const response = await fetch(urlToFetch, {mode: 'cors'});
      
      if (response.ok) {
      const jsonResponse = await response.json();
      const giphyArray = jsonResponse;
      console.log(giphyArray);
      return giphyArray;
      }
    } 
  catch (error) {
    console.log(error);
    }
};

const renderGifs = (gifs) => {
    gifs.data.forEach(gif => {
        console.log("Current gif:", gif);
        const gifCard = createGif(gif);
        debugger;
        $gifContainer.append(gifCard);
    })
}

const createGif = (gifObj) => {
    const img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
    img.attr('src', gifObj.images.fixed_height_small.url);
    img.addClass('gif-card');
    return img;
}

const executeSearch = () => {
    getSearch().then(gifs => renderGifs(gifs))
}

$input.keyup(executeSearch);