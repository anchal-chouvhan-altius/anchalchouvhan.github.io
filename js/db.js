// enable offline data
// db.enablePersistence({experimentalTabSynchronization:true})
//   .catch(function(err) {
//     if (err.code == 'failed-precondition') {
//       // probably multible tabs open at once
//       console.log('persistance failed');
//     } else if (err.code == 'unimplemented') {
//       // lack of browser support for the feature
//       console.log('persistance not available');
//     }
//   });
db.enablePersistence({experimentalTabSynchronization:true}).then(() => {
  console.log("Woohoo! Multi-Tab Persistence!");
});
// real-time listener
db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    console.log("change.type--------------"+change.type);
    if(change.type === 'added'){
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "modified") {
      console.log("Modified city: ", change.doc.data());
      updateRecipe(change.doc.id,change.doc.data());
  }
    if(change.type === 'removed'){
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const recipe = {
    name: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection('recipes').add(recipe)
    .catch(err => console.log(err));

  form.title.value = '';
  form.ingredients.value = '';
});

// remove a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('recipes').doc(id).delete();
  }
})