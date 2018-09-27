import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf, addDecorator } from '@storybook/react';
import Button from './Button';

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
  .add('with primary color', () => <Button color="primary" text="primary" />)
  .add('with secondary color', () => (
    <Button color="secondary" text="secondary" />
  ));
