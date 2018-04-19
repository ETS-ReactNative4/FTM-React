import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import classNames from 'classnames';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import './Filters.css';


class Filters extends Component {
  render() {
    const styles = theme => ({
      root: {
        flexGrow: 1,
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      card: {
        minWidth: 275,
      }
    });

    return (
      <div className={styles.root}>
        <div>
          <Card className={styles.card}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={styles.heading}>Include</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Filters for ingredients to include.
                </Typography>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Clear</Button>
                <Button size="small" color="primary">Save</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
          <Card className={styles.card}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={styles.heading}>Exclude</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Filters for ingredients to exlude.
          </Typography>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Clear</Button>
                <Button size="small" color="primary">Save</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
          <Card className={styles.card}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={styles.heading}>Time</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Filters to cooking duration.
          </Typography>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Clear</Button>
                <Button size="small" color="primary">Save</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
          <Card className={styles.card}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={styles.heading}>Difficulty</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Filter for various difficulties.
                </Typography>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Clear</Button>
                <Button size="small" color="primary">Save</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
          <Card className={styles.card}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={styles.heading}>Cuisine</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Filters for cuisines across the world.
          </Typography>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Clear</Button>
                <Button size="small" color="primary">Save</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
          <Card className={styles.card}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={styles.heading}>Diet</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Filters for specialized diet.
                </Typography>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button size="small">Clear</Button>
                <Button size="small" color="primary">Save</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Card>
        </div>

      </div>
    );
  }
}

export default Filters;