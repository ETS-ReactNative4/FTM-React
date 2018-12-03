import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  InputAdornment,
  InputLabel,
  IconButton,
  Button,
  Paper,
  FormControl,
  withStyles,
  Grid,
} from '@material-ui/core';
import { FilterList, Close } from '@material-ui/icons';
import { Spring, Trail, animated } from 'react-spring';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import HomeFilter from './Filter/Filter';
import SearchResult from './SearchResult/SearchResult';
import './Home.css';
import { Menu } from 'material-ui';
import FilterButton from './FilterButton/FilterButton';
import FilterChipsArray from './FilterChip/FilterChipsArray';
import FilterDialog from './FilterDialog/FilterDialog';

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  heading: {},
  secondaryHeading: {},
  column: {
    flexBasis: '33.33%',
    width: '30%',
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      recipes: [],
      loading: false,
      showFilter: false,
      hasFilterChips: false,
    };
    this.filterChipsRef = React.createRef();
  }

  handleEnterSearch = async (event) => {
    const { client } = this.props;
    if (event.key === 'Enter') {
      const { data } = await client.query({
        query: gql`
                query {
                  searchAllRecipes(query: "${this.state.query}") {
                    id
                    name
                    description
                    images
                  }
                }`,
      });
      this.setState({
        loading: true,
        recipes: data.searchAllRecipes,
      });
    }
  };

  handleButtonSearch = async () => {
    const { client } = this.props;
    const { data } = await client.query({
      query: gql`
                query {
                  searchAllRecipes(query: "${this.state.query}") {
                    id
                    name
                    description
                    images
                    cookTime
                    prepTime
                    difficulty
                    rating
                    ingredients
                  }
                }`,
    });
    this.setState({
      loading: true,
      recipes: data.searchAllRecipes,
    });
  };

  handleQueryChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  getFilterClassNames = () => {
    const classes = ['filter-card'];
    if (this.state.showFilter) {
      classes.push('showFilter');
    } else {
      classes.push('hideFilter');
    }
    return classes.join(' ');
  };

  handleMouseDown = (event) => {
    event.preventDefault();
  };

  handleAddFilterChip = (title, label) => {
    this.filterChipsRef.current.handleAddFilterChip(title, label);
  };

  handleHasFilterChips = (value) => {
    this.setState({ hasFilterChips: value });
  };

  handleIngredientsFilter = (includes, excludes) => {
    this.filterChipsRef.current.handleAddIngredientChips(includes, excludes);
  };

  render() {
    return (
      <div className="home-container">
        <Spring
          from={{ marginTop: 0 }}
          to={this.state.recipes.length > 0 ? { marginTop: 0 } : { marginTop: 0 }}
        >
          {({ marginTop, opacity }) => (
            <img
              className="logo"
              style={{ marginTop }}
              src="http://i63.tinypic.com/14joi09.png"
              alt="logo"
            />
          )}
        </Spring>
        <Spring
          from={{ marginTop: 0 }}
          to={this.state.recipes.length > 0 ? { marginTop: 0 } : { marginTop: 0 }}
        >
          {({ marginTop }) => (
            <div className="search-box" style={{ marginTop }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="search">Search for a recipe...</InputLabel>
                <Input
                  id="search"
                  onKeyPress={this.handleEnterSearch}
                  onChange={this.handleQueryChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onMouseDown={this.handleMouseDown} onClick={this.toggleFilter}>
                        <FilterList size={30} />
                      </IconButton>
                      <Button id="searchButton" onClick={this.handleButtonSearch}>
                        Search
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          )}
        </Spring>
        <Spring
          from={{ marginTop: 0 }}
          to={this.state.recipes.length > 0 ? { marginTop: 0 } : { marginTop: 0 }}
        >
          {({ marginTop, opacity }) => (
            <img
              className="logo"
              style={{ marginTop }}
              src="http://i63.tinypic.com/14joi09.png"
              alt="logo"
            />
          )}
        </Spring>
        <Spring
          native
          from={{ height: 0, opacity: 0 }}
          to={this.state.hasFilterChips ? { height: 50, opacity: 1 } : { height: 0, opacity: 0 }}
        >
          {({ height, opacity }) => (
            <animated.div className="search-chips" style={{ display: 'flex', height, opacity }}>
              <FilterChipsArray
                innerRef={this.filterChipsRef}
                handleHasFilterChips={this.handleHasFilterChips}
              />
            </animated.div>
          )}
        </Spring>
        <div
          className="search-filters"
          style={
            this.state.recipes.length > 0
              ? {
                marginTop: 0,
                display: 'flex',
                alignItems: 'center',
              }
              : {
                marginTop: 0,
                display: 'flex',
                alignItems: 'center',
              }
          }
        >
          <FilterButton
            title="Cook Time"
            items={['<= 10 min', '20 min', '45 min', '>60 min']}
            handleAddFilterChip={this.handleAddFilterChip}
          />
          <FilterButton
            title="Prep. Time"
            items={['<= 10 min', '20 min', '45 min', '>60 min']}
            handleAddFilterChip={this.handleAddFilterChip}
          />
          <FilterButton
            title="Difficulty"
            items={['One', 'Two', 'Three', 'Four', 'Five']}
            handleAddFilterChip={this.handleAddFilterChip}
          />
          <FilterButton
            title="Rating"
            items={['One', 'Two', 'Three', 'Four', 'Five']}
            handleAddFilterChip={this.handleAddFilterChip}
          />
          <FilterDialog handleIngredientsFilter={this.handleIngredientsFilter} />
          {/* <FilterButton
            title="Ingredients"
            items={['Need to add dialog']}
            handleAddFilterChip={this.handleAddFilterChip}
          /> */}
        </div>

        <div
          className="search-results"
          style={this.state.recipes.length > 0 ? { marginTop: 0 } : { marginTop: 0 }}
        >
          {this.state.recipes.length > 0 && (
            <Grid container>
              <Trail
                native
                keys={this.state.recipes.map(item => item.id)}
                from={{ marginTop: 500, opacity: 0 }}
                to={{ marginTop: 0, opacity: 1 }}
              >
                {this.state.recipes.map(recipe => (marginTop, index) => {
                  return (
                    <Grid item md={4} sm={6} xs={6} zeroMinWidth>
                      <animated.div key={index} style={marginTop}>
                        <SearchResult
                          key={recipe.id}
                          name={recipe.name}
                          style={marginTop}
                          description={recipe.description}
                          images={recipe.images}
                          r_id={recipe.id}
                        />
                      </animated.div>
                    </Grid>
                  );
                })}
              </Trail>
            </Grid>
          )}
        </div>
        <Paper className={this.getFilterClassNames()} elevation={5}>
          <IconButton className="close-filters" onClick={this.toggleFilter}>
            <Close />
          </IconButton>
          <HomeFilter filter="Time" color="primary" />
        </Paper>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withApollo,
)(Home);
