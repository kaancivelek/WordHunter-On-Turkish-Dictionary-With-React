import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from "reactstrap";

/**
 * Component that lists generated random words
 * @param {string[]} outputs - List of generated random words
 */
export default class Outputs extends Component {
  render() {
    return (
      <div className="outputs-container">
        <h3>Generated Words</h3>
        <ListGroup>
          {this.props.outputs.map((word, index) => (
            <ListGroupItem
              key={`output-${index}`}
              className="output-item"
            >
              {word}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
} 