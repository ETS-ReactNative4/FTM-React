import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title"  className={classes.heading}>About</Typography>
            <Typography variant="subheading" className={classes.secondaryHeading}>Welcome to Food to Make
            <Grid container justify="right" alignItems="right">
      <Avatar alt="logo" src="http://i63.tinypic.com/2wd348w.jpg" class="about" 
          width="794" height="497" srcset="http://i63.tinypic.com/2wd348w.jpg" className={classes.avatar} />
         </Grid> 
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body2">
          <b>Food to Make</b> is a website that provides recipe recommendations personalized to the individual's tastes, semantic recipe search, a digital recipe box.

          <Grid container justify="right" alignItems="right">
      <Avatar alt="logo" src="http://i63.tinypic.com/2wd348w.jpg" class="about" 
          width="794" height="497" srcset="http://i63.tinypic.com/2wd348w.jpg" className={classes.avatar} />
         </Grid> 
         </Typography>
        </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title" className={classes.heading}>Login and Signup</Typography>
            <Typography variant="subheading" className={classes.secondaryHeading}>
            Connect to customize your recipe discovery
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="subtitle2" align="left"> 
            Having a Food to Make <b>account</b> will allow you to <b>create</b> your own taste profile, <b>save</b> and organize your <b>favorite recipes</b>,receive recipe recommendations personalized for you, and share the recipes with your family and friends! You can create an account via Facebook, Google+, or Email.


            <Grid container justify="right" alignItems="right">
             <img alt="" src="http://i68.tinypic.com/16kxkaq.png" class="login" 
          width="477" height="248" srcset="http://i68.tinypic.com/16kxkaq.png2x"
          data-pin-nopin="true"></img>
            </Grid> 
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title"  className={classes.heading}>Finding Recipe </Typography>
            <Typography variant="subheading" className={classes.secondaryHeading}>
             Browsing for Recipes
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography  variant="body2" align="left" paragraph>

             <b>Food to Make wants to make it as easy as possible </b>for you to find what you are looking for, so we have created several ways to search for recipes to ensure that you do!

             <Grid container justify="center" alignItems="left">
             <img alt="" src="http://i65.tinypic.com/156afep.jpg" class="login" 
          width="794" height="497" srcset="http://i65.tinypic.com/156afep.jpg2x"
          data-pin-nopin="true"></img>
            </Grid>
             
             
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title" className={classes.heading}>Advanced Filtering Option</Typography>
            <Typography className={classes.secondaryHeading}>
            Customize Your Search Result
            </Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <CardContent>
           <Typography variant="subtitle2" align="left" ><b>Ingredient Search:</b> </Typography>
              <Typography variant="body2" align="left" paragraph>
              Search for recipes that contain the ingredients you want! Click on the words Ingredient Search at the top of any page. After clicking Ingredient Search you will be taken to a form where you can enter up to four ingredients that you would like to include and also up to four ingredients you would like to exclude. Be sure to click the plus or minus after each ingredient.  Click on the spy glass icon after entering all the ingredients you are looking to include and exclude to see your results.
            </Typography>
            <Typography variant="subtitle2" color="red" align="left">
              <b>Recipes for special dietary requirements and healthy cooking:</b></Typography>
              <Typography variant="body2" align="left" paragraph> 
              foottomake.com has recipe collections for every special diet, and ways to filter your search for recipes that will fit your lifestyle.
              </Typography>
              </CardContent>
          </ExpansionPanelDetails>
        </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title" className={classes.heading}>Recipe Box</Typography>
            <Typography className={classes.secondaryHeading}>
            How to use Food to Make to Save Recipes?
            </Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <CardContent>
           <Typography variant="subtitle2" align="left" ><b>How to Add a Recipe:</b> </Typography>
              <Typography variant="body2" align="left" paragraph>
              When searching or browsing for recipes, press the ‘Heart’ button on the recipe you want to save or If you want, select the Collection you want to add the recipe to.
            </Typography>
            <Typography variant="subtitle2" align="left">
              <b>How to Remove a Recipe:</b></Typography>
              <Typography variant="body2" align="left" paragraph> 
              On your profile, press the 'X' button on the recipe that you want to remove.  
              </Typography>
              <Typography variant="subtitle2" align="left">
              <b>Edit Recipe: </b></Typography>
              <Typography variant="body2" align="left" paragraph> 
              If you want to edit a collection, you can do so by clicking on the collection you want to edit. You can edit the name and description of the collection through Edit Collection. 
              </Typography>

              <Typography variant="subtitle2" align="left">
              <b>Print Recipe:</b></Typography>
              <Typography variant="body2" align="left" paragraph> 
              Print your favorite recipe by clicking on print option or you can save it as .pdf file.  
              </Typography>

               <Typography variant="subtitle2" align="left">
              <b>Share Recipes:</b></Typography>
              <Typography variant="body2" align="left" paragraph> 
              Let friends and family know about your awesome Collection!  Click  Share to share your collection on social media. 
              </Typography>

                      
              </CardContent>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);