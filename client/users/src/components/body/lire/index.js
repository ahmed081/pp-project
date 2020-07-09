import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import Axios from 'axios';
 
export default class MyApp extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
  componentDidMount(){
    console.log("ahmed ..sss")
    Axios.get("http://localhost:3030/book/read/exemple.pdf").then(file=>{
      console.log("file")
    })
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <div>
        <Document
          file="http://localhost:3030/book/read/exemple.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}