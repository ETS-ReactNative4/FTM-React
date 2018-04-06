import React, { Component } from 'react';
import { Grid, Card, CardMedia, Typography } from 'material-ui';
import axios from 'axios';
import RecipeInstructions from './recipeInstructions/RecipeInstructions';
import './Recipe.css';
import RecipeInfo from './recipeInfo/RecipeInfo';
import RecipeIngredients from './recipeIngredients/RecipeIngredients';

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
      title: 10,
    },
  },
};

class Recipe extends Component {
  async componentDidMount() {
    const recipe = await this.fetchRecipe();
    this.setState(recipe);
  }

  fetchRecipe = async () => {
    const data = {
      lmt: 5,
      query: 'cheese',
    };
    const options = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlcm5hcmRjb3NncmlmZkBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTUyMTM0MzA4MX0.ip_Syjb-CQd2payC0Oo6MS911XQZ3OMdDY1hJjnjZ1s',
      },
    };
    try {
      const response = await axios.post('http://localhost:8080/api/recipes', data, options);
      return response.data[0];
    } catch (err) {
      return {};
    }
  }

  render() {
    return (
      <div>
        <Grid className='pic-des-container' container spacing={styles.spacing} justify={'center'}>
          <Grid className='title-container' container item xs={styles.sizes.xs.title} sm={styles.sizes.sm.title}>
            <Card>
              <div className="recipe-title">
                <Typography>
                  Recipe Name
                </Typography>
              </div>
            </Card>
          </Grid>
          <Grid className='picture' item xs={styles.sizes.xs.picture} sm={styles.sizes.sm.picture}>
            <Card className="recipe-pic">
              <CardMedia image="https://foodtomake.blob.core.windows.net/images/best-quick-homemade-pizza-recipe.jpg" alt="hello" />
            </Card>
          </Grid>
          <Grid className='description' item xs={styles.sizes.xs.description} sm={styles.sizes.sm.description}>
            <Card>
              <Typography paragraph className='description-text' component="p">
                Words
              </Typography>
            </Card>
          </Grid>
          <Grid className='info' item xs={styles.sizes.xs.author} sm={styles.sizes.sm.author}>
            <RecipeInfo />
          </Grid>
          <Grid className='ingredients' item xs={styles.sizes.xs.instructions} sm={styles.sizes.sm.instructions}>
            <RecipeIngredients />
          </Grid>
          <Grid className='instructions' item xs={styles.sizes.xs.ingredients} sm={styles.sizes.sm.ingredients}>
            <RecipeInstructions />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Recipe;
