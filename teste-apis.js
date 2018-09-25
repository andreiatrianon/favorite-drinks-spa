// $(document).ready(() => {
//   jQuery.support.cors = true;

//   $.ajax({
//     type: 'GET',
//     url: 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyCeffF8Onk-iYLQUA1Xw0-wSFRXeRFHp9s',
//     crossDomain: true,
//     dataType: 'json',
//     success: carregarPosts,
//     error: erro
//   })

// })

///////////////////////////////////////////////////////////////////////////////////////

// const requesting = new XMLHttpRequest();
// // requesting.open('GET', 'https://places.cit.api.here.com/places/v1/autosuggest?at=-23.56287,-46.65466&q=ong&app_id=nhuH0A1unXJeLfVNb0aU&app_code=NoMbTMKyT60U2UeAQ4dlYg');
// requesting.open('GET', 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyCeffF8Onk-iYLQUA1Xw0-wSFRXeRFHp9s', true);
// requesting.onload = carregarPosts;
// requesting.onerror = erro;
// requesting.send();

// function carregarPosts() {
//   console.log(JSON.parse(this.responseText));
// }

// function erro() {
//   console.log('erro');
// }

//////////////////////////////////////////////////////////////////////////////////////

// // Instantiate the Platform class:
// var platform = new H.service.Platform({
//   app_id: 'nhuH0A1unXJeLfVNb0aU',
//   app_code: 'NoMbTMKyT60U2UeAQ4dlYg'
// });

// Pegar Categorias:


// // Obtain a Categories object through which to submit search requests:
// var categories = new H.places.Categories(platform.getPlacesService()),
//   categoriesResponse, error;

// // Define search parameters:
// var params = {
// //  Location context that indicates the search is in Berlin
//   'at': '-23.56287,-46.65466'
//   },
// //  Headers object required by the request() method (empty):
//   headers = {};

// // Run a request for categories, using the parameters, headers, and
// // callback functions:
// categories.request(params, headers, onResult, onError);

// // Success handler - fetch the first set of detailed place data from
// // the response:
// function onResult(data) {
//   categoriesResponse = data;
//   console.log(categoriesResponse);
//   // var arr = categoriesResponse['items'].map(el => el.id);
//   // console.log(arr);

// }

// // Define a callback to handle errors:
// function onError(data) {
//   error = data;
// }


////////////////////////////////////////////////////////////////////////////////

// Pegar Locais de acordo com a categoria:



// // Obtain an Explore object through which to submit search requests:
// var explore = new H.places.Explore(platform.getPlacesService()), exploreResult, error;

// // Define search parameters:
// var params = {
//   // Look for places matching the category "eat and drink":
//   'cat': 'education-facility',
//   // government-community-facility,education-facility,fair-convention-facility,sports-facility-venue',
//   // Search in the Chinatown district in San Francisco:
//   'in': '-23.56287,-46.65466'
// };

// // Run a search request with parameters, headers (empty), and callback functions:
// // explore.request(params, {}, onResult, onError);

// // Define a callback function to handle data on success:
// function onResult(data) {
//   exploreResult = data;
//   console.log(data);
// }

// // Define a callback function to handle errors:
// function onError(data) {
//   error = data;
// }

// // Run a search request with parameters, headers (empty), and callback functions:
// explore.request(params, {}, onResult, onError);