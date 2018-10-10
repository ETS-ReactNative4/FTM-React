import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PrimaryActionButton from './PrimaryActionButton';
import CancelButton from './CancelButton';
import DeleteButton from './DeleteButton';

const siteTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#651fff'
    },
    secondary: {
      main: '#00e5ff'
    }
  },
  themeName: 'Site Theme'
});

addDecorator(muiTheme([siteTheme]));

storiesOf('Button', module)
  .add('Primary Action', () => <PrimaryActionButton text="Save" />)
  .add('Cancel', () => <CancelButton text="Cancel" />)
  .add('Delete', () => <DeleteButton text="Delete" />);
