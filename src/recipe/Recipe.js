import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import gql from 'graphql-tag';
import { withApollo, compose, graphql } from 'react-apollo';
import './Recipe.css';
import RecipeInstructions from './Instructions/Instructions';
import RecipeInfo from './Info/Info';
import RecipeIngredients from './Ingredients/Ingredients';
import RecipeDescription from './Description/Description';
import RecipePicture from './Picture/Picture';
import Notes from './Notes/Notes';
import Comments from './Comments/Comments';
import withLocalData from '../withLocalData';

const jwt = require('jsonwebtoken');

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
      image: [],
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
      notes: null,
      comments: null,
      new_note: null,
      new_comment: null,
      note_dialog_open: false,
      comment_dialog_open: false,
    };
    this.saveRecipe = this.saveRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.noteSubmit = this.noteSubmit.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
    this.addNote = this.addNote.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleCommentClose = this.handleCommentClose.bind(this);
    this.handleCommentOpen = this.handleCommentOpen.bind(this);
    this.handleNoteInput = this.handleNoteInput.bind(this);
    // this.getDataFromAPI();
    // console.log(this.state.recipe_id);
  }

  handleDialogOpen = () => {
    this.setState({ note_dialog_open: true });
  };

  handleDialogClose = () => {
    this.setState({ note_dialog_open: false });
  };
  handleCommentOpen = () => {
    this.setState({ comment_dialog_open: true });
  };

  handleCommentClose = () => {
    this.setState({ comment_dialog_open: false });
  };

  handleNoteInput = (event) => {
    this.setState({
      new_note: event.target.value,
    });
  };
  handleCommentInput = (event) => {
    this.setState({
      new_comment: event.target.value,
    });
  }

  saveRecipe() {
    try {
      const { client, token } = this.props;
      const decoded = jwt.decode(token);
      console.log('save this recipe');
      const data = {
        user_id: decoded.id,
        recipe_id: this.state.recipe_id,
      };
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
          console.log('successfully saved recipe for: ', decoded.id);
          return result.data.recipeById;
        });
      return result;
    } catch (err) {
      console.log(err);
      console.log('failed to save recipe');
      return {};
    }
  }

  removeRecipe() {
    try {
      const { client, token } = this.props;
      const decoded = jwt.decode(token);
      console.log('remove this recipe');
      const data = {
        user_id: decoded.id,
        recipe_id: this.state.recipe_id,
      };
      const result = client
        .mutate({
          mutation: gql`
          mutation RemoveRecipe {           
            deleteSavedRecipe(
              userId: "${data.user_id}"
              recipeId: "${data.recipe_id}"
            )
          }
        `,
        })
        .then((result) => {
          console.log(result.data);
          console.log('successfully removed recipe for: ', decoded.id);
          return result.data;
        });
      return result;
    } catch (err) {
      console.log(err);
      console.log('failed to remove recipe');
      return {};
    }
  }

  noteSubmit() {
    console.log('note input: ', this.state.new_note);

    // append the new note to the current ones
    this.setState(previousState => ({
      notes: [...previousState.notes, this.state.new_note],
    }), this.addNote);
  }

  addNote() {
    console.log('notes: ', this.state.notes);
    try {
      const { client, token } = this.props;
      const decoded = jwt.decode(token);
      const data = {
        notes: this.state.notes,
        recipe_id: this.state.recipe_id,

      };
      const result = client
        .mutate({
          mutation: gql`
          mutation UpdateRecipe($recipe: UpdateRecipeInput!) {           
            updateRecipe(
              id: "${data.recipe_id}"
              recipe: $recipe
            ) {
              id
              name
              notes
            }
          }
        `,
          variables: {
            recipe: {
              notes: data.notes,
            },
          },
        })
        .then((result) => {
          console.log(result.data);
          console.log('successfully added the note');
          this.handleDialogClose();
          return result.data;
        });
      return result;
    } catch (err) {
      console.log(err);
      console.log('failed to add the note');
      return {};
    }
  }

  commentSubmit() {
    console.log('trying to post a new comment');
    console.log('comment input: ', this.state.new_comment);

    // append the new comment to the current ones
    this.setState(previousState => ({
      comments: [...previousState.comments, this.state.new_comment],
    }), this.postComment);
  }

  postComment() {
    console.log('comments: ', this.state.comments);
    try {
      const { client, token } = this.props;
      const decoded = jwt.decode(token);
      const data = {
        comments: this.state.comments,
        recipe_id: this.state.recipe_id,

      };
      const result = client
        .mutate({
          mutation: gql`
          mutation UpdateRecipe($recipe: UpdateRecipeInput!) {           
            updateRecipe(
              id: "${data.recipe_id}"
              recipe: $recipe
            ) {
              id
              name
              comments
            }
          }
        `,
          variables: {
            recipe: {
              comments: data.comments,
            },
          },
        })
        .then((result) => {
          console.log(result.data);
          console.log('successfully added the comment');
          this.handleCommentClose();
          return result.data;
        });
      return result;
    } catch (err) {
      console.log(err);
      console.log('failed to add the comment');
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
              ingredients
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
      notes: recipe.notes,
      comments: recipe.comments,
      // recipe_id: recipe._id,
    });
    if (this.state.authorImage == null || this.state.authorImage === '') {
      this.setState({
        authorImage:
          'https://s3-us-west-2.amazonaws.com/foodtomake-photo-storage/person5-128.png',
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
        <Notes notes={this.state.notes} />
        <Grid
          className="pic-des-container"
          container
          spacing={styles.spacing}
          justify={'center'}
        >
          <Grid
            className="picture"
            item
            xs={styles.sizes.xs.picture}
            sm={styles.sizes.sm.picture}
          >
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
          <Grid
            className="info"
            item
            xs={styles.sizes.xs.author}
            sm={styles.sizes.sm.author}
          >
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
            <Button
              variant="contained"
              color="secondary"
              className="remove-recipe-button"
              onClick={this.removeRecipe}
            >
              Remove From Saved
            </Button>
            <Button
              variant="contained"
              color="default"
              className="add-note-button"
              onClick={this.handleDialogOpen}
            >
              <Icon>edit_icon</Icon>Add A Note
            </Button>

            <Dialog
              open={this.state.note_dialog_open}
              onClose={this.handleDialogClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New Note</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  multiline
                  id="note-input"
                  label="New Note"
                  type="text"
                  fullWidth
                  onChange={this.handleNoteInput.bind(this)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.noteSubmit} color="primary" variant="contained">
                  Add Note
                </Button>
              </DialogActions>
            </Dialog>


            <a className="print-button" href="javascript:window.print();">
              <em className="fa fa-print"></em>

              <Button
                variant = "contained"
                color="secondary"
                className = "print-button"
                onClick = {this.printRecipe}
              >
                Print Recipe
              </Button>
            </a>
          </Grid>
          <Grid
            className="source-url"
            item
            xs={styles.sizes.xs.ingredients}
            sm={styles.sizes.sm.ingredients}
          >
            <span>
              <a href={(this.state.sourceURL === null || this.state.sourceURL === '') ? 'www.foodtomake.com' : this.state.URL}>Source</a>
            </span>
          </Grid>
          <Grid
            className="comments"
            item
            xs={styles.sizes.xs.ingredients}
            sm={styles.sizes.sm.ingredients}
          >
            <Comments comments={this.state.comments} />
            <Button
              variant="contained"
              color="default"
              className="post-comment-button"
              onClick={this.handleCommentOpen}
            >
              <Icon>add_icon</Icon>Post A Comment
            </Button>

            <Dialog
              open={this.state.comment_dialog_open}
              onClose={this.handleCommentClose}
              aria-labelledby="comment-dialog-title"
              className="comment-dialog"
            >
              <DialogTitle id="comment-dialog-title">New Comment</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  multiline
                  id="comment-input"
                  label="New Comment"
                  type="text"
                  fullWidth
                  onChange={this.handleCommentInput}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCommentClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.commentSubmit} color="primary" variant="contained">
                  Post Comment
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withLocalData,
  withApollo,
)(Recipe);
