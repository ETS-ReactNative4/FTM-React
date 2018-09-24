import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import './Recipe.css';
import RecipeInstructions from './Instructions/Instructions';
import RecipeInfo from './Info/Info';
import RecipeIngredients from './Ingredients/Ingredients';
import RecipeDescription from './Description/Description';
import RecipePicture from './Picture/Picture';

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
      title: null,
      stars: null,
      tags: [],
      author: null,
      authorImage: null,
      cookTime: null,
      prepTime: null,
      difficulty: null,
      sourceURL: null,
      servings: null,
      recipe_id: this.props.match.params.id,
    };
    this.saveRecipe = this.saveRecipe.bind(this);
    // this.getDataFromAPI();
    // console.log(this.state.recipe_id);
  }

  saveRecipe() {
    const { client } = this.props;
    console.log('save this recipe');
    const data = {
      user_id: '5b80e5924f300af2ea7f05cd',
      recipe_id: this.state.recipe_id,
    };
    try {
      const result = client
        .mutate({
          mutation: gql`
          mutation SaveRecipe {           
            addSavedRecipe(
              userId: "${data.user_id}"
              recipeId: "${data.recipe_id}"
            ) {
              id
            }
          }
        `,
        })
        .then((result) => {
          console.log(result.data);
          console.log('successfully saved recipe!');
          return result.data.recipeById;
        });
      return result;
    } catch (err) {
      console.log(err);
      console.log('failed to save recipe');
      return {};
    }
  }

  componentWillMount() {
    this.getDataFromAPI();
  }

  fetchRecipe = async () => {
    console.log('getting recipe from database ');
    const data = {
      recipe_id: this.state.recipe_id,
    };
    try {
      const { client } = this.props;
      const result = client
        .query({
          query: gql`
          query getRecipe {           
            recipeById(
              id: "${data.recipe_id}"
            ) {
              id
              created
              description
              system
              images
              name
              ingredients {name quantity unit}
              instructions
              sourceURL
              prepTime
              cookTime
              difficulty
              servings
              rating
              notes
              numReviews
              numShares
              tags
              comments
            }
          }
        `,
        })
        .then((result) => {
          // console.log(result.data.recipeById);
          return result.data.recipeById;
        });
      return result;
    } catch (err) {
      console.log(err);
      return {};
    }
  };

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
      // recipe_id: recipe._id,
    });
    if (this.state.authorImage == null || this.state.authorImage === '') {
      this.setState({
        authorImage: 'https://s3-us-west-2.amazonaws.com/foodtomake-photo-storage/person5-128.png',
      });
    }
  }

  render() {
    // don't render until we have data loaded
    if (!this.state.title) {
      return <div />;
    }

    return (
      <div>
        <Grid className="pic-des-container" container spacing={styles.spacing} justify={'center'}>
          <Grid className="picture" item xs={styles.sizes.xs.picture} sm={styles.sizes.sm.picture}>
            <RecipePicture
              title={this.state.title}
              stars={this.state.stars}
              imageURL={this.state.image}
            />
          </Grid>
          <Grid
            className="description"
            item
            xs={styles.sizes.xs.description}
            sm={styles.sizes.sm.description}
          >
            <RecipeDescription desc={this.state.description} />
          </Grid>
          <Grid className="info" item xs={styles.sizes.xs.author} sm={styles.sizes.sm.author}>
            <RecipeInfo
              authorImage={this.state.authorImage}
              authorName={this.state.author}
              prepTime={this.state.prepTime}
              cookTime={this.state.cookTime}
              difficulty={this.state.difficulty}
              tags={this.state.tags}
            />
          </Grid>
          <Grid
            className="ingredients"
            item
            xs={styles.sizes.xs.instructions}
            sm={styles.sizes.sm.instructions}
          >
            <RecipeIngredients
              ingredients={this.state.ingredients}
              servings={this.state.servings}
            />
          </Grid>
          <Grid
            className="instructions"
            item
            xs={styles.sizes.xs.ingredients}
            sm={styles.sizes.sm.ingredients}
          >
            <RecipeInstructions value={this.state.instructions} />
          </Grid>
          <Grid
            className="save-recipe"
            item
            xs={styles.sizes.xs.ingredients}
            sm={styles.sizes.sm.ingredients}
          >
            <Button
              variant="contained"
              color="primary"
              className="save-recipe-button"
              onClick={this.saveRecipe}
            >
              Save Recipe
            </Button>
          </Grid>
          <Grid
            className="source-url"
            item
            xs={styles.sizes.xs.ingredients}
            sm={styles.sizes.sm.ingredients}
          >
            <span>
              <a href={this.state.sourceURL}>Source</a>
            </span>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withApollo(Recipe);
