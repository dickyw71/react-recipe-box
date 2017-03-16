import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './RecipeBox.js';

var myRecipes = [{
      title: "Jam Sandwich",
      ingredients: ["White sliced bread", "Jam"]
    }, {
      title: "Chocolate Brownies",
      ingredients: ["3 Eggs", "250g Plain Flour", "2tbsp Bicarbinate of soda", "800g Cocca powder"]
}];

ReactDOM.render(
  <RecipeBox recipes={myRecipes} />,
  document.getElementById('root')
);
