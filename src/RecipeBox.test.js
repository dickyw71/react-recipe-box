import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './RecipeBox.js';

/** 
 * Test data
 */
var myRecipes = [{
      title: "Jam Sandwich",
      ingredients: ["White sliced bread", "Jam"]
    }, {
      title: "Chocolate Brownies",
      ingredients: ["3 Eggs", "250g Plain Flour", "2tbsp Bicarbinate of soda", "800g Cocca powder"]
}];

/**
 * RecipeBox tests
 */
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecipeBox recipes={myRecipes} />, div);
});


