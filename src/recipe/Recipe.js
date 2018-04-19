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

const ingredientList = new Array(8);
let i;
for (i = 0; i < ingredientList.length; i++) {
  ingredientList[i] = "Item " + i;
}

const instructionsList = new Array(5);
for (i = 0; i < instructionsList.length; i++) {
  instructionsList[i] = i + ". Instruction here";
}

const descriptionText = "Here's a description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et convallis massa.  Maecenas posuere porttitor dui at tincidunt. Maecenas neque elit, ultrices at accumsan pulvinar, sodales eget sapien.   Duis id risus non eros vulputate consectetur. Nunc luctus sagittis tortor. Phasellus rhoncus blandit urna quis mollis.  Sed justo felis, commodo non imperdiet convallis, placerat vel arcu. Ut vitae arcu sed neque accumsan vestibulum sed non neque.  Morbi gravida metus et egestas congue. Integer sit amet fermentum tellus. Vivamus varius odio ut sollicitudin congue.  Duis congue lorem odio, ut placerat leo interdum eu. Suspendisse molestie nunc ut ullamcorper placerat. In hac habitasse platea dictumst.";

const tagsList = new Array(3);
for (i = 0; i < tagsList.length; i++) {
  tagsList[i] = "#Tag " + i;
}

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: ingredientList,
      instructions: instructionsList,
      description: descriptionText,
      image: 'https://foodtomake.blob.core.windows.net/images/best-quick-homemade-pizza-recipe.jpg',
      title: 'Recipe Title',
      stars: 'Four',
      tags: tagsList,
    };
  }

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
      const response = await axios.post('http://localhost:3000/api/recipes', data, options);
      return response.data[0];
    } catch (err) {
      return {};
    }   
  }

  render() {
    return (
      <div style={{width: "100% - 24px"}}>
        <Grid className='pic-des-container' container spacing={styles.spacing} justify={'center'}>
          <Grid className='picture' item xs={styles.sizes.xs.picture} sm={styles.sizes.sm.picture}>
            <RecipePicture title={this.state.title} stars={this.state.stars} imageURL={this.state.image} />
          </Grid>
          <Grid className='description' item xs={styles.sizes.xs.description} sm={styles.sizes.sm.description}>
            <RecipeDescription desc={this.state.description}/>
          </Grid>
          <Grid className='info' item xs={styles.sizes.xs.author} sm={styles.sizes.sm.author}>
            <RecipeInfo authorImage='https://i.pinimg.com/originals/88/2d/88/882d883fcf289d704c064da27ed4fa60.png' authorName='Mario' time='11 minutes' difficulty='easy' tags={this.state.tags} />
          </Grid>
          <Grid className='ingredients' item xs={styles.sizes.xs.instructions} sm={styles.sizes.sm.instructions}>
            <RecipeIngredients value={this.state.ingredients} />
          </Grid>
          <Grid className='instructions' item xs={styles.sizes.xs.ingredients} sm={styles.sizes.sm.ingredients}>
            <RecipeInstructions value={this.state.instructions} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Recipe;
