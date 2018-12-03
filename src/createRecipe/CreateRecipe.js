import React, { Component } from 'react';
import { Grid, TextField, Button } from 'material-ui';
import './CreateRecipe.css';
import gql from 'graphql-tag';

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
      notes: null,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
  }

  handleTitleChange = title => (event) => {
    this.setState({
      [title]: event.target.value,
    });
  };
  handleIngredients = ingredients => (event) => {
    this.setState({
      ingredients: event.target.value.split(','),
    });
  };
  handleInstructions = instructions => (event) => {
    this.setState({
      instructions: event.target.value.split(','),
    });
  };
  handleNotes = notes => (event) => {
    this.setState({
      notes: event.target.value.split(','),
    });
  };
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  async handleSubmit(e) {
    // e.preventDefault();
    // const { title } = this.state.title;
    // const { dispatch } = this.props;

    await this.submitRecipe();
    // this.addToPublished(res.CreateRecipe.id);
  }

  submitRecipe = async () => {
    try {
      const { client, userId } = this.props;
      const data = {
        name: this.state.title,
        description: this.state.description,
        prepTime: this.state.prepTime,
        cookTime: this.state.cookTime,
        difficulty: this.state.difficulty,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        notes: this.state.notes,
        sourceURL: 'www.foodtomake.com',
        servings: this.state.servings,
        user_id: userId,
      };
      console.log(data.name);
      console.log(data.ingredients);
      const result = client
        .mutate({
          mutation: gql`
            mutation CreateRecipe($recipe: NewRecipeInput!) {
              createRecipe(recipe: $recipe) {
                id
                name
                author {
                  id
                  username
                }
              }
            }
          `,
          variables: {
            recipe: {
              description: data.description,
              system: 'us',
              images: [],
              name: data.name,
              ingredients: data.ingredients,
              instructions: data.instructions,
              sourceURL: data.sourceURL,
              prepTime: data.prepTime,
              cookTime: data.cookTime,
              difficulty: data.difficulty,
              servings: data.servings,
              author: data.user_id,
              tags: [],
              notes: data.notes,
              published: false,
            },
          },
        })
        .then((result) => {
          console.log('created result: ', result.data);
          this.addToPublished(result.data.createRecipe.id);
          return result.data;
        });
      return result;
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  render() {
    return (
      <div>
        <Grid
          className="create-recipe-container"
          container
          spacing={styles.spacing}
          justify={'center'}
        >
          <form className="recipe-form" onSubmit={this.submitRecipe}>
            <TextField
              id="textarea"
              placeholder="Recipe Title"
              fullWidth
              className="title"
              onChange={this.handleChange('title')}
            />
            <TextField
              id="textarea"
              label="Description"
              multiline
              fullWidth
              className="description"
              onChange={this.handleChange('description')}
            />
            <TextField
              id="textarea"
              label="Prep Time"
              fullWidth
              className="preptime"
              onChange={this.handleChange('prepTime')}
            />
            <TextField
              id="textarea"
              label="Cook Time"
              fullWidth
              className="cooktime"
              onChange={this.handleChange('cookTime')}
            />
            <TextField
              id="textarea"
              label="Difficulty"
              fullWidth
              className="difficulty"
              onChange={this.handleChange('difficulty')}
            />
            <TextField
              id="textarea"
              label="Servings"
              fullWidth
              className="servings"
              onChange={this.handleChange('servings')}
            />
            <TextField
              id="textarea"
              label="Ingredients Separated by comma"
              fullWidth
              className="ingredients"
              onChange={this.handleIngredients('Ingredients')}
            />
            <TextField
              id="textarea"
              label="Instructions Separated by comma"
              fullWidth
              className="instructions"
              onChange={this.handleInstructions('Instructions')}
            />
            <TextField
              id="textarea"
              label="Notes Separated by comma"
              fullWidth
              className="notes"
              onChange={this.handleNotes('Notes')}
            />

            <Button onClick={this.handleSubmit}>Submit</Button>
          </form>
        </Grid>
      </div>
    );
  }
}

export default CreateRecipe;
