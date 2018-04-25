import React, { Component } from 'react';
import { Grid } from 'material-ui';
import axios from 'axios';
import './Recipe.css';
import RecipeInstructions from './recipeInstructions/RecipeInstructions';
import RecipeInfo from './recipeInfo/RecipeInfo';
import RecipeIngredients from './recipeIngredients/RecipeIngredients';
import RecipeDescription from './recipeDescription/RecipeDescription';
import RecipePicture from './recipePicture/RecipePicture';

const styles = {
  spacing: 24,
  sizes: {
    xs: {
      picture: 8,
      description: 8,
      ingredients: 8,
      instructions: 8,
      author: 8,
      title: 8,
    },
    sm: {
      picture: 4,
      description: 4,
      ingredients: 8,
      instructions: 8,
      author: 8,
      title: 8,
    },
  },
};

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      instructions: [],
      description: null,
      image: null,
      title: this.props.match.params.title,
      stars: null,
      tags: [],
      author: this.props.match.params.author,
      authorImage: null,
      cookTime: null,
      prepTime: null,
      difficulty: null,
      sourceURL: null,
      servings: null,
      // recipe_id: this.props.match.params.recipe_id,
    };
    this.getDataFromAPI();
    console.log(this.state.recipe_id);
  }

  async getDataFromAPI() {
    const recipe = await this.fetchRecipe();
    console.log('recipe: \n', recipe);
    this.setState({
      title: recipe.name,
      author: recipe.author,
     // authorImage: recipe.author.image,
      image: recipe.images[0],
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      difficulty: recipe.difficulty,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      tags: recipe.tags,
      description: recipe.description,
      sourceURL: recipe.sourceURL,
      servings: recipe.servings,
      stars: Math.round(recipe.rating),
      //recipe_id: recipe._id,
    });
    if (this.state.authorImage == null || this.state.authorImage === '') {
      this.setState({
        authorImage: 'https://s3-us-west-2.amazonaws.com/foodtomake-photo-storage/person5-128.png',
      });
    }
  }

  fetchRecipe = async () => {
    const data = {
      query: this.state.title,
      limit: '1',
      offset: '0',
      filters: [
        {
          field: 'author',
          operator: '=',
          values: [this.state.author],
        },
      ],
    };
    try {
      const response = await axios.post('http://localhost:8081/public/recipes', data);
      console.log('completed GET request');
      console.log(data);
      return response.data.recipes[0];
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  render() {
    return (
      <div>
        <Grid className='pic-des-container' container spacing={styles.spacing} justify={'center'}>
          <Grid className='picture' item xs={styles.sizes.xs.picture} sm={styles.sizes.sm.picture}>
            <RecipePicture title={this.state.title} stars={this.state.stars} imageURL={this.state.image} />
          </Grid>
          <Grid className='description' item xs={styles.sizes.xs.description} sm={styles.sizes.sm.description}>
            <RecipeDescription desc={this.state.description}/>
          </Grid>
          <Grid className='info' item xs={styles.sizes.xs.author} sm={styles.sizes.sm.author}>
            <RecipeInfo authorImage={this.state.authorImage} authorName={this.state.author} prepTime={this.state.prepTime} cookTime={this.state.cookTime} difficulty={this.state.difficulty} tags={this.state.tags} />
          </Grid>
          <Grid className='ingredients' item xs={styles.sizes.xs.instructions} sm={styles.sizes.sm.instructions}>
            <RecipeIngredients ingredients={this.state.ingredients} servings={this.state.servings} />
          </Grid>
          <Grid className='instructions' item xs={styles.sizes.xs.ingredients} sm={styles.sizes.sm.ingredients}>
            <RecipeInstructions value={this.state.instructions} />
          </Grid>
          <Grid className='source-url' item xs={styles.sizes.xs.ingredients} sm={styles.sizes.sm.ingredients}>
            <span><a href={this.state.sourceURL}>Source</a></span>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Recipe;
