import React, { Component } from 'react';
import { Grid, TextField, Button } from 'material-ui';
import { Card, Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { withApollo, Mutation, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Route, Redirect } from 'react-router-dom';
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
      dialogOpen: false,
      success: false,
      recipe_id: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleInstructions = this.handleInstructions.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.successful = this.successful.bind(this);
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

  uploadFile = async (photos) => {
    this.setState({ images: photos });
  };

  UPLOAD_FILE = gql`
    mutation UploadPhoto($file: Upload!) {
      uploadPhoto(file: $file)
    }
  `;

  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  openDialog = () => {
    this.setState({ dialogOpen: true }, this.showDialog);
  };

  successful = (arg) => {
    console.log('recipe id: ', arg)
    this.setState({
      success: true,
      recipe_id: arg,
    });
  };


  submitRecipe = async () => {
    const { client, userId } = this.props;
    const data = {
      name: this.state.name,
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
            notes: [],
            published: false,
          },
        },
      })
      .then((result) => {
        console.log('created result: ', result.data);
        // this.addToPublished(result.data.createRecipe.id);
        this.successful(result.data.createRecipe.id);
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        this.openDialog();
        return {};
      });
  };

  render() {
    return (
      <div>
        <Grid
          className="pic-des-container"
          container
          spacing={styles.spacing}
          justify={'center'}
        >

          {/* ----- PICTURE ----- */}
          <Grid
            className="picture"
            item
            xs={styles.sizes.xs.picture}
            sm={styles.sizes.sm.picture}
          >
            <div className="fullSize">
              <Card className="recipe-pic">
                <Mutation mutation={this.UPLOAD_FILE}>
                  {uploadFile => (
                    <input
                      type="file"
                      accept="image/jpg, image/jpeg, image/png"
                      className="upload-pic"
                      required
                      onChange={({ target: { validity, files } }) => {
                        validity.valid && this.uploadFile(files);
                      }}
                    />
                  )}
                </Mutation>
                <TextField
                  id="textarea"
                  placeholder="Recipe Title"
                  fullWidth
                  className="recipe-title"
                  onChange={this.handleChange('name')}
                />
              </Card>
            </div>
          </Grid>

          {/* ----- DESCRIPTION ----- */}
          <Grid
            className="description"
            item
            xs={styles.sizes.xs.description}
            sm={styles.sizes.sm.description}
          >
            <div className="fullSize">
              <Card className="recipe-description-card">
                <TextField
                  id="textarea"
                  label="Description"
                  multiline
                  fullWidth
                  className="recipe-description"
                  onChange={this.handleChange('description')}
                />
              </Card>
            </div>
          </Grid>

          {/* ----- INFO ----- */}
          <Grid
            className="info"
            item
            xs={styles.sizes.xs.author}
            sm={styles.sizes.sm.author}
          >
            <Card className="recipeInfo">
              <TextField
                id="textarea"
                label="Prep Time (in minutes)"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
                className="preptime"
                onChange={this.handleChange('prepTime')}
              />
              <TextField
                id="textarea"
                label="Cook Time (in minutes)"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
                className="cooktime"
                onChange={this.handleChange('cookTime')}
              />
              <TextField
                id="textarea"
                label="Difficulty (0-5)"
                type="number"
                inputProps={{ min: 0, max: 5 }}
                fullWidth
                className="difficulty"
                onChange={this.handleChange('difficulty')}
              />
              <TextField
                id="textarea"
                label="Servings"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
                className="servings"
                onChange={this.handleChange('servings')}
              />
            </Card>
          </Grid>

          {/* ----- INGREDIENTS ----- */}
          <Grid
            className="ingredients"
            item
            xs={styles.sizes.xs.instructions}
            sm={styles.sizes.sm.instructions}
          >
            <div className="fullSize">
            
              <Card>
                <Typography className="instructions-title"> Instructions </Typography>
                
                
                <TextField
                  id="textarea"
                  label="Ingredients Separated by comma"
                  fullWidth
                  multiline
                  className="ingredients"
                  onChange={this.handleIngredients('Ingredients')}
                />
              </Card>
            </div>
          </Grid>

          {/* ----- INSTRUCTIONS ----- */}
          <Grid
            className="instructions"
            item
            xs={styles.sizes.xs.ingredients}
            sm={styles.sizes.sm.ingredients}
          >
            <Card>
              <Typography className="instructions-title"> Directions </Typography>
              <span>You can upload pictures to go to specific directions</span>
              <Mutation mutation={this.UPLOAD_FILE}>
                {uploadFile => (
                  <input
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    className="upload-pic"
                    required
                    onChange={({ target: { validity, files } }) => {
                      validity.valid && this.uploadFile(files);
                    }}
                  />
                )}
              </Mutation>
              <Grid item>
                <TextField
                  id="textarea"
                  label="Instructions Separated by comma"
                  fullWidth
                  multiline
                  className="instructions"
                  onChange={this.handleInstructions('Instructions')}
                />
              </Grid>
            </Card>
          </Grid>

          <Grid
            className="submitsection"
            item
            xs={styles.sizes.xs.ingredients}
            sm={styles.sizes.sm.ingredients}
          >
            <Button variant="contained" color="primary" className="create-recipe-button btn-margin" onClick={this.handleSubmit}>Submit</Button>
          </Grid>
        </Grid>

        {this.state.success ?
          {/*<Redirect to={`/recipe/${this.state.recipe_id}`} />*/}
          :
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleCloseDialog}
          >
            <DialogTitle>{'Error'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                There was an error creating the recipe. Please fill in all the fields.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}

export default compose(
  withLocalData,
  withApollo,
)(CreateRecipe);
