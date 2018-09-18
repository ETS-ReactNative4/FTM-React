import React, { Component } from 'react';
import { Grid, TextField, Button } from 'material-ui';
import './CreateRecipe.css';
import RecipeInstructions from './recipeInstructions/RecipeInstructions';
import RecipeInfo from './recipeInfo/RecipeInfo';
import RecipeIngredients from './recipeIngredients/RecipeIngredients';
import RecipeDescription from './recipeDescription/RecipeDescription';
import RecipePicture from './recipePicture/RecipePicture';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://api.foodtomake.com/graphql',
});

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


class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      instructions: null,
      description: null,
      image: null,
      title: null,
      stars: null,
      tags: null,
      author: null,
      authorImage: null,
      cookTime: null,
      prepTime: null,
      difficulty: null,
      sourceURL: null,
      servings: null,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleTitleChange = title => (event) => {
    this.setState({
      [title]: event.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log('trying submit');
    const { title } = this.state.title;
    const { dispatch } = this.props;
    this.submitRecipe(title);
  }

  submitRecipe = async () => {
    console.log('trying submit log with ', this.state.title);
    const data = {
      message: this.state.message,
      author: this.state.author,
    };
    try {
      const result = client
        .mutate({
          mutation: gql`
          mutation CreateRecipe {           
            createRecipe(
              name: "${data.title}"
            ) {
              id
              name
            }
          }
        `,
        })
        .then(result => console.log(result));
      return result.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  render() {
    return (
      <div>
        <Grid className='pic-des-container' container spacing={styles.spacing} justify={'center'}>
          <form className='recipe-form' onSubmit={this.handleSubmitRecipe} >
            <Grid className='picture' item xs={styles.sizes.xs.picture} sm={styles.sizes.sm.picture}>
              {/*<RecipePicture title={this.state.title} stars={this.state.stars} imageURL={this.state.image} />*/}
              <TextField
                id="textarea"
                placeholder="Recipe Title"
                fullWidth
                className="title"
                onChange={this.handleTitleChange('title')}
              />
            </Grid>
            <Grid className='description' item xs={styles.sizes.xs.description} sm={styles.sizes.sm.description}>
              <RecipeDescription desc={this.state.description}/>
            </Grid>
            <Grid className='info' item xs={styles.sizes.xs.author} sm={styles.sizes.sm.author}>
              {/*<RecipeInfo authorImage={this.state.authorImage} authorName={this.state.author} prepTime={this.state.prepTime} cookTime={this.state.cookTime} difficulty={this.state.difficulty} tags={this.state.tags} />*/}
            </Grid>
            <Grid className='ingredients' item xs={styles.sizes.xs.instructions} sm={styles.sizes.sm.instructions}>
              {/*<RecipeIngredients ingredients={this.state.ingredients} servings={this.state.servings} />*/}
            </Grid>
            <Grid className='instructions' item xs={styles.sizes.xs.ingredients} sm={styles.sizes.sm.ingredients}>
              {/*<RecipeInstructions value={this.state.instructions} />*/}
            </Grid>
            <Button type='submit' value='Submit' color="primary" className='submit'>
              Submit
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}

export default CreateRecipe;
