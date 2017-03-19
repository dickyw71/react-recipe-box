/*
  Import the React Bootstrap components that you want to use.
  
  In a real environment (Webpack / Browserify, ES6) this would be:
    import { Tab, Tabs } from 'react-bootstrap';
*/
import React from 'react';
import { Accordion, PageHeader, 
     Panel, Jumbotron, 
     ListGroup, ListGroupItem, 
     Button, Modal,
     FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

/* 
let { Accordion, PageHeader, 
     Panel, Jumbotron, 
     ListGroup, ListGroupItem, 
     Button, Modal,
     FormGroup, FormControl, ControlLabel,
     HelpBlock } = ReactBootstrap;
*/

class RecipeBox extends React.Component {
  
  constructor(props) {
    super(props);
    if(window.localStorage) {
      // check if data in localStorage
      let recipesStr = localStorage.getItem("_dickyw71_recipes");
      if(recipesStr) {
        this.state = ( {
          recipes: JSON.parse(recipesStr)
        })
      }
      else {
        localStorage.setItem("_dickyw71_recipes", JSON.stringify(this.props.recipes)); 
      } 
    }
    this.state = ( {
        recipes: this.props.recipes
    })

    this.add = this.add.bind(this);   
    this.delete = this.delete.bind(this);
  }
  
  add(recipe) {
    let _recipes = this.state.recipes;
    _recipes.push(recipe);    
    this.setState((prevState) => {
      return {
        recipes: _recipes
      }
    })
    if(window.localStorage) {
      localStorage.setItem("_dickyw71_recipes", JSON.stringify(this.state.recipes)); 
    }
  }

  delete(recipeTitle) {
    let _recipes = this.state.recipes.filter((ele) => {
      return ele.title !== recipeTitle;
    })
    this.setState((prevState) => {
      return {
        recipes: _recipes
      }
    })
    if(window.localStorage) {
      localStorage.setItem("_dickyw71_recipes", JSON.stringify(this.state.recipes)); 
    }  
  }
  
  render() {
    
    return (
      <div>
        <RecipeBoxHeader />
        <RecipeBoxBody recipes={this.state.recipes} deleteRecipe={this.delete} />
        <AddRecipeButton addRecipe={this.add}/>
      </div>  
    )
  }
}


class RecipeBoxHeader extends React.Component {
  render() {
    return (
       <PageHeader>Recipe Box <small>using React and ReactBootstrap</small></PageHeader>
    )
  }
}

class RecipeBoxBody extends React.Component {

  render() {
    console.log(this.props.recipes)
   const _recipePanels = this.props.recipes.map((ele, index) => {
      return (
         <Panel header={ele.title} bsStyle="success" key={index.toString()} eventKey={index+1}>
            <RecipeBody ingredients={ele.ingredients} />
            <RecipeFooter delete={this.props.deleteRecipe} recipeTitle={ele.title} />
         </Panel>
        )
    })
    return (
      <Jumbotron>
        <Accordion>
          {_recipePanels}
        </Accordion>  
      </Jumbotron>
    )
  }
}

class AddRecipeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        title: "",
        ingredients: ""
      };
      
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);  
      this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
      this.cancel = this.cancel.bind(this);
      this.addRecipe = this.addRecipe.bind(this);
  }  
  
  open() {
    this.setState( { 
      showModal: true,
      title: "", 
      ingredients: "" 
    });    
  }
  close() {
    this.setState( { showModal: false } );
  }
  
  handleTitleChange(e) {
    this.setState( { title: e.target.value } );  
  }
 
  handleIngredientsChange(e) {
    this.setState( { ingredients: e.target.value } );
  }
  
  cancel() {
    this.close();
    this.setState( { title: "", ingredients: "" } );
  }
  
  addRecipe() {
    this.close();  
    this.props.addRecipe({ 
          title: this.state.title || "Untitled", 
          ingredients: this.state.ingredients.split(",") 
   }); 
  }
  
  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Add Recipe
        </Button>
        
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl type="text"
                value={this.state.title}
                placeholder="Enter a recipe title"
                onChange={this.handleTitleChange}
              />
            </FormGroup>  
            <FormGroup> 
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl type="ingredients"
                componentClass="textarea"
                value={this.state.ingredients}
                placeholder="Enter ingredients, seperated by commas"
                onChange={this.handleIngredientsChange}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addRecipe} bsStyle="primary">Add Recipe</Button>
            <Button onClick={this.cancel}>Cancel</Button>
          </Modal.Footer>   
        </Modal>
      </div>
    )
  }  
}

class RecipeBody extends React.Component {
  
  render() {
      var ingredientsList = this.props.ingredients.map((ele) => {
        return (
          <ListGroupItem key={ele}>{ele}</ListGroupItem>
        )
      })
      
      return (
        <div>    
          <ListGroup>
            <h4>Ingredients</h4>         
            {ingredientsList}        
          </ListGroup>   
        </div>   
      )
  }
}

class RecipeFooter extends React.Component {
  constructor(props) {
    super(props);

    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  deleteRecipe() {
    this.props.delete(this.props.recipeTitle);
  }

  render() {
    return (
      <div>
        <Button bsStyle="danger" onClick={this.deleteRecipe}>Delete</Button>
        <Button bsStyle="default">Edit</Button>     
      </div>  
      )
  }
}

export default RecipeBox;
