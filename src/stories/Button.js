import React from 'react';
import { Button } from '@material-ui/core';
import { action } from '@storybook/addon-actions';

export default function(props) {
  return (
    <Button variant="contained" onClick={action('clicked')} color={props.color}>
      {props.text}
    </Button>
  );
}
