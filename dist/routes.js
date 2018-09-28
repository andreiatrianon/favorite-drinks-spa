 page('/', index);
 page('/:myFavoriteRecipes', getFavoriteList);
 page('/:search/:categoryName', getRecipesList);
 page('/:search/:categoryName/:recipeName', getRecipePage);
 page('*', notfound);
 page();


let favoriteList = [];
localStorage.setItem('favoriteList', favoriteList.toString);

$('#favorite-list-btn').click(redirectToFavoriteRecipesPage);

function redirectToFavoriteRecipesPage() {
  page.redirect('/myFavoriteRecipes');
}

function redirectToRecipesPage(categoryLink) {
  page('/search/' + categoryLink.name);
}

function redirectToOneRecipePage(recipeLink) {
  page('/search/' + recipeLink.name);
}

function index() {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  let success = getCategories;
  requestAPI(url, success);
}

function requestAPI(url, success) {
  $.ajax({
    type: 'GET',
    url,
    success,
    error: erro
  });
}

function getCategories(data) {
  mainTemplateDefault('categories', 'Choose a Category');
  getEachCategory(data);
}

function mainTemplateDefault(id, title) {
  $('main').html(`
  <div class="container">
    <div class="section">
      <div class="row">
        <div class="col s12">                    
          <div id="${id}" class="section to-list">
            <div class="col s12">
              <span class="title">${title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `);
}

function getEachCategory(data) {
  data['drinks'].map((el, i) => 
    $('#categories').append(`
      <div class="col s12 m6 l4">                            
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <a name="${Object.values(el)[0].replace(/\//g,'&&')}" href="" onclick="redirectToRecipesPage(this)">
              <img width="305" height="229" src="https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-305x229.jpg" class="responsive-img wp-post-image" alt="Noble Café" title="Noble Café" srcset="https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-305x229.jpg 305w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-300x225.jpg 300w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-768x576.jpg 768w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c.jpg 800w" sizes="(max-width: 305px) 100vw, 305px" />
              <span class="card-title home">${Object.values(el)[0]}</span>
            </a>
          </div>
        </div>
      </div>
    `)
  );
}

function getFavoriteList(ctx) {
  mainTemplateDefault('favorite-list', 'My Favorite Recipes');
  let favoriteList = localStorage.getItem('favoriteList').split(',');
  favoriteList.forEach( function (el) {
    let idDrink = el.split('-')[2];
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + idDrink;
    let success = getEachRecipe;
    requestAPI(url, success);
  });
}

function getRecipesList(ctx) {
  let categoryNameFromURI = ctx.params.categoryName;
  let thisCategory = categoryNameFromURI.replace(/&&/g,'/');
  mainTemplateDefault('recipes-list', thisCategory);
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + thisCategory.replace(' ','_');
  let success = getEachRecipe;
  requestAPI(url, success);
}

function getRecipePage(ctx) {
  let drinkNameFromURI = ctx.params.recipeName;
  let drinkName = drinkNameFromURI.replace(/&&/g,'/');
  recipeTemplateDefault(drinkName);
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName.replace(' ','_');
  let success = getEachInstruction;
  requestAPI(url, success);
}

function recipeTemplateDefault(drinkName) {
  $('main').html(`
    <div class="container my-font-color">
      <div class="section"> 
        <div class="row">      
          <div class="col l12">
            <article class="post-2548 post type-post status-publish format-standard has-post-thumbnail hentry category-downtown tag-mtlcafecrawl roaster-cut-coffee roaster-george-howell roaster-path-coffee-roasters roaster-st-henri roaster-the-barn-coffee-roasters roaster-transcend supplier-guillaume metro-orange metro-sherbrooke moods-community moods-philosophical purpose-social-meetups purpose-work" id="post-2548">
              <div class="row">
                <div class="col l8 s12">
                  <h4>${drinkName}</h4>
                  <img id="recipe-img" width="800" height="600" src="" class="single-photo responsive-img z-depth-3 wp-post-image" sizes="(max-width: 800px) 100vw, 800px">
                </div>
                <div class="col l4 s12">
                  <div class="card-panel my-bg-color" style="min-height: 640px;">
                    <h6>RECIPE</h6>
                    <hr>
                    <span class="detail-title"><i class="tiny material-icons">shopping_cart</i> Ingredients</span>
                    <ul id="ingredients-list"></ul>
                    <hr>
                    <span class="detail-title"><i class="tiny material-icons">menu</i> Instructions</span>
                    <p id="recipe-instructions"></p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function getEachInstruction(data) {
  let obj = data['drinks'][0];
  $("#recipe-img").attr('src', obj['strDrinkThumb']);
  getIngredients(obj);
  $('#recipe-instructions').html(obj['strInstructions']);  
}

function getIngredients(obj) {
  for (key in obj) {
    if ((key.slice(0, 13) === 'strIngredient') && (obj[key] !== '') && (obj[key] !== null)) {
      $('#ingredients-list').append(`
      <li><i class="tiny material-icons">check</i> ${obj[key]}</li>
      `);
    }
  }
}


function getEachRecipe(data) {
  let categoryNameToURI = $('.title').html().replace(/\//g,'&&');
  data['drinks'].map((el, i) =>
    $('.to-list').append(`
      <div class="col s12 m6 l4 to-remove">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <span class="card-title favorite-icon">
              <i id="favorite-recipe-${data['drinks'][i]['idDrink']}" class="medium material-icons ${verifyRecipeIsFavorite('favorite-recipe-' + data['drinks'][i]['idDrink'])}" onclick="toFavoriteRecipe(this)">favorite</i>
            </span>
            <a name="${categoryNameToURI}/${data['drinks'][i]['strDrink'].replace(/\//g,'&&')}" onclick="redirectToOneRecipePage(this)">
              <img width="305" height="229" src="${data['drinks'][i]['strDrinkThumb']}">
            </a>
          </div>
          <div class="card-content">
            <p class="area"><a name="${categoryNameToURI}/${data['drinks'][i]['strDrink'].replace(/\//g,'&&')}" onclick="redirectToOneRecipePage(this)">See recipe</a></p>
            <a name="${categoryNameToURI}/${data['drinks'][i]['strDrink'].replace(/\//g,'&&')}" onclick="redirectToOneRecipePage(this)" class="card-title activator brown-text text-darken-4">${data['drinks'][i]['strDrink']}</span></a>
          </div>
        </div>
      </div>
    `)
  );
}

function verifyRecipeIsFavorite(id) {
  let favoriteList = localStorage.getItem('favoriteList');
  if (favoriteList.includes(id)) {
    return 'favorite-icon-selected';
  } else {
    return 'favorite-icon-unselected';
  }
}

function toFavoriteRecipe(recipeSelected) {
  setClassToFavoriteIcon(recipeSelected);
  toUpdateFavoriteList(recipeSelected);
}

function setClassToFavoriteIcon(recipeSelected) {
  if ($(recipeSelected).hasClass('favorite-icon-selected')) {
    $(recipeSelected).removeClass('favorite-icon-selected');
    $(recipeSelected).addClass('favorite-icon-unselected');
    removeRecipeFromFavoriteList(recipeSelected);
  } else {
    $(recipeSelected).removeClass('favorite-icon-unselected');
    $(recipeSelected).addClass('favorite-icon-selected');
  }
}

function removeRecipeFromFavoriteList(recipeSelected) {
  $(recipeSelected).closest('#favorite-list .to-remove').fadeOut('slow');
}

function toUpdateFavoriteList(recipeSelected) {
  if ($(recipeSelected).hasClass('favorite-icon-selected')) {
    favoriteList.push(recipeSelected.id);
    $('#favorites-counter').html(favoriteList.length);
    localStorage.setItem('favoriteList', favoriteList);
  } else {
    favoriteList = favoriteList.filter(el => el !== recipeSelected.id);
    $('#favorites-counter').html(favoriteList.length);
    localStorage.setItem('favoriteList', favoriteList);
  }
}

function notfound() {
  $('main').html('Page not found');
}

function erro() {
  console.log('Error in API requesting');
}