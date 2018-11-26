import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

class RecipePDF extends Component {
  state = {
    numPages: 2,
    pageNumber: 1,
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file="recipes.pdf"
        >
          text here
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default RecipePDF;