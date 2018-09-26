 page('/', index);
 page('/:categoryName', getRecipesList);
 page('/:categoryName/:recipeName', getRecipePage);
 page();

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
          <div id="${id}" class="section">
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
  data['drinks'].map(el => 
    $('#categories').append(`
      <div class="col s12 m6 l4">                            
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <a href="${Object.values(el)[0]}">
              <img width="305" height="229" src="https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-305x229.jpg" class="responsive-img wp-post-image" alt="Noble Café" title="Noble Café" srcset="https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-305x229.jpg 305w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-300x225.jpg 300w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c-768x576.jpg 768w, https://adbeus.com/wp-content/uploads/2016/11/s1odxcae9cjag71iye1c.jpg 800w" sizes="(max-width: 305px) 100vw, 305px" />
              <span class="card-title home">${Object.values(el)[0]}</span>
            </a>
          </div>
        </div>
      </div>
    `)
  );
}

function getRecipesList(ctx) {
  let thisCategory = ctx.params.categoryName;
  mainTemplateDefault('recipes-list', thisCategory);
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + thisCategory.replace(' ','_');
  let success = getEachRecipe;
  requestAPI(url, success);
}

function getRecipePage(ctx) {
  let drinkName = ctx.params.recipeName;
  console.log(drinkName);
}

function getEachRecipe(data) {
  data['drinks'].map((el, i) =>
    $('#recipes-list').append(`
      <div class="col s12 m6 l4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <a href="${$('.title').html()}/${data['drinks'][i]['strDrink']}">
            <img width="305" height="229" src="${data['drinks'][i]['strDrinkThumb']}" alt="${data['drinks'][i]['strDrink']}" title="${data['drinks'][i]['strDrink']}">
            </a>
          </div>
          <div class="card-content">
            <p class="area"><a href="${$('.title').html()}/${data['drinks'][i]['strDrink']}">See recipe</a></p>
            <a href="${$('.title').html()}/${data['drinks'][i]['strDrink']}" class="card-title activator brown-text text-darken-4">${data['drinks'][i]['strDrink']}</span></a>
          </div>
        </div>
      </div>
    `)
  );
}

function erro() {
  console.log(error);
}