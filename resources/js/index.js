// issues to debug
// console.log in beginning to make sure event listeners/handlers are firing
// i originally get a cors error, that's because I forgot to use http:// at beginning of fetch url
// then i get another 401 unauthorized error, so then i think something must still be wrong with my url because my api key is definitely correct. then i notice i am missing a "?" at the end of my url so I add one

    // I want to create a text input that should listen for key up events. 
// Grab the text input on key up
// Take the input and include it in my HTTP request to Giphy API
// Fire off the request then take that response and parse through the data I want, the actual gifs. I guess they’ll be urls
// I am then going to create DOM image elements and give them src attributes of the gif urls and append those image elements to the DOM.


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
    // potentially add a data attribute as a way to keep track of which gifs have already been appended, and if they have to keep them there and delete the old ones and add the new ones.... maybe. might be overkill
    $gifContainer.text('');
    gifs.data.forEach(gif => {
        // $gifContainer.text('')
        console.log("Current gif:", gif);
        const gifCard = createGif(gif);
        debugger;
        $gifContainer.append(gifCard);
    })
}

const createGif = (gifObj) => {
    const img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
    // debugger here to make sure we grab the right information, iterate through the object
    // potentially use a DataCleaner class to clean up the response
    img.attr('src', gifObj.images.fixed_height_small.url);
    img.addClass('gif-card');
    return img;
}

const executeSearch = () => {
    getSearch().then(gifs => renderGifs(gifs))
}

$input.keyup(executeSearch);