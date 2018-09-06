import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Tabs, Tab } from "@material-ui/core";
import "./Filter.css";

class HomeFilter extends Component {
  render() {
    return (
      <Tabs centered indicatorColor="primary" textColor="primary">
        <Tab label="item"/>
        <Tab label="item2"/>
      </Tabs>
    );
  }
}

HomeFilter.propTypes = {
  filter: PropTypes.string,
  color: PropTypes.color
};

export default HomeFilter;
