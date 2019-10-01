const recipes = document.querySelector('.recipes');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render recipe data
const renderRecipe = (data, id) => {

  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="/img/dish.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title">${data.name}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-edit">
      <i class="material-icons" data-id="${id}">edit_outline</i>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  recipes.innerHTML += html;

  navigator.serviceWorker.getRegistration().then(function(reg) {
    var options = {
      body: 'Recipe added successfully!!!',
      icon: '/img/dish.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'Visit altius',
          icon: '/img/dish.png'},
        {action: 'close', title: 'Close notification',
          icon: '/img/dish.png'},
      ]
    };
    reg.showNotification('Hello world!', options);
  }); 

};

// remove recipe
const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
  navigator.serviceWorker.getRegistration().then(function(reg) {
    var options = {
      body: 'Recipe deleted',
      icon: '/img/dish.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'Visit altius',
          icon: '/img/dish.png'},
        {action: 'close', title: 'Close notification',
          icon: '/img/dish.png'},
      ]
    };
    reg.showNotification('Hello world!', options);
  }); 
};