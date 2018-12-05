import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  InputAdornment,
  InputLabel,
  Button,
  FormControl,
  withStyles,
  Grid,
} from '@material-ui/core';
import { Spring, Trail, animated } from 'react-spring';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SearchResult from './SearchResult/SearchResult';
import './Home.css';
import FilterButton from './FilterButton/FilterButton';
import CookTimeButton from './FilterButton/CookTimeButton';
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
      filters: [],
      recipes: [],
      loading: false,
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
    console.log(this.state.filters);
    const { client } = this.props;
    const { data } = await client.query({
      query: gql`
        query searchAllRecipes($query: String!, $filters: [SearchFilter]!) {
          searchAllRecipes(query: $query, filters: $filters) {
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
        }
      `,
      variables: {
        query: this.state.query,
        filters: this.state.filters,
      },
      fetchPolicy: 'network-only',
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

  handleAddFilterChip = (title, label) => {
    this.filterChipsRef.current.handleAddFilterChip(title, label);
    const currentFilters = this.state.filters;
    const args = label.split(' ');
    switch (title) {
    case 'Cook Time':
      switch (args[0]) {
      case '<=':
        currentFilters.push({ field: 'cookTime', operator: 'LTE', value: [args[1]] });
        break;
      case '>=':
        currentFilters.push({ field: 'cookTime', operator: 'GTE', value: [args[1]] });
        break;
      case '==':
        currentFilters.push({ field: 'cookTime', operator: 'EQ', value: [args[1]] });
        break;
      default:
      }
      break;
    case 'Prep. Time':
      switch (args[0]) {
      case '<=':
        currentFilters.push({ field: 'prepTime', operator: 'LTE', value: [args[1]] });
        break;
      case '>=':
        currentFilters.push({ field: 'prepTime', operator: 'GTE', value: [args[1]] });
        break;
      case '==':
        currentFilters.push({ field: 'prepTime', operator: 'EQ', value: [args[1]] });
        break;
      default:
      }
      break;
    case 'Difficulty':
      switch (args[0]) {
      case '<=':
        currentFilters.push({ field: 'difficulty', operator: 'LTE', value: [args[1]] });
        break;
      case '>=':
        currentFilters.push({ field: 'difficulty', operator: 'GTE', value: [args[1]] });
        break;
      case '==':
        currentFilters.push({ field: 'difficulty', operator: 'EQ', value: [args[1]] });
        break;
      default:
      }
      break;
    case 'Rating':
      switch (args[0]) {
      case '<=':
        currentFilters.push({ field: 'rating', operator: 'LTE', value: [args[1]] });
        break;
      case '>=':
        currentFilters.push({ field: 'rating', operator: 'GTE', value: [args[1]] });
        break;
      case '==':
        currentFilters.push({ field: 'rating', operator: 'EQ', value: [args[1]] });
        break;
      default:
      }
      break;
    default:
    }
  };

  handleHasFilterChips = (value) => {
    this.setState({ hasFilterChips: value });
  };

  handleIngredientsFilter = (includes, excludes) => {
    this.filterChipsRef.current.handleAddIngredientChips(includes, excludes);
  };

  handleDeleteFilterChips = (data) => {
    this.setState((state, props) => {
      const filters = [...state.filters];
      let chipToDelete = filters.indexOf();
      switch (data.title) {
      case 'Cook Time':
        switch (data.label) {
        case '<= 10 min':
          chipToDelete = filters.indexOf({
            field: 'cookTime',
            operator: 'LTE',
            value: ['10'],
          });
          break;
        case '20 min':
          break;
        case '45 min':
          break;
        case '>60 min':
          break;
        default:
        }
        break;
      case 'Prep. Time':
        break;
      case 'Difficulty':
        break;
      case 'Rating':
        break;
      case 'Include':
        break;
      case 'Exclude':
        break;
      default:
      }
      filters.splice(chipToDelete, 1);
      return { filters };
    });
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
                handleDeleteFilterChips={this.handleDeleteFilterChips}
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
          <CookTimeButton title="Cook Time" handleAddFilterChip={this.handleAddFilterChip} />
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
