import React, { Component } from 'react';
import { Grid, TextField, Button } from 'material-ui';
import { withApollo, Mutation, compose } from 'react-apollo';
import gql from 'graphql-tag';
import './CreateRecipe.css';
import withLocalData from '../withLocalData';

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
      images: [],
      name: null,
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

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

    await this.submitRecipe();
    // this.addToPublished(res.CreateRecipe.id);
  }

  uploadFile = async (e) => {
    const photo = e.variables.file;
    this.setState(previousState => ({
      images: [...previousState.images, photo],
    }), () => {
      console.log('uploaded image: ', this.state.images);
    });

    /*
    try {
      const { client } = this.props;
      console.log(photo);
      const { result } = await client.mutate({
        mutation: gql`
          mutation UploadPhoto($file: Upload!) {
            uploadPhoto(file: $file)
          }
        `,
        variables: {
          file: photo,
        },
      })
        .then((result) => {
          console.log('upload result: ', result);
          return result.data;
        });
    } catch (err) {
      console.log(err);
      return {};
    }
    */
  };

  UPLOAD_FILE = gql`
    mutation UploadPhoto($file: Upload!) {
      uploadPhoto(file: $file)
    }
  `;

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
        images: this.state.images,
      };
      console.log('new recipe info: ', data);
      const result = await client
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
                images
              }
            }
          `,
          variables: {
            recipe: {
              description: data.description,
              system: 'us',
              images: data.images,
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
          // this.addToPublished(result.data.createRecipe.id);
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
          <Mutation mutation={this.UPLOAD_FILE}>
            {uploadFile => (
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                required
                onChange={({
                  target: {
                    validity,
                    files: [file],
                  },
                }) => {
                  validity.valid && this.uploadFile({ variables: { file } });
                }}
              />
            )}
          </Mutation>
          <form className="recipe-form" onSubmit={this.submitRecipe}>
            <TextField
              id="textarea"
              placeholder="Recipe Title"
              fullWidth
              className="title"
              onChange={this.handleChange('name')}
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

export default compose(
  withLocalData,
  withApollo,
)(CreateRecipe);
