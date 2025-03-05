import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from "reactstrap";

/**
 * Component that lists found words
 * @param {string[]} foundWords - List of words found by the player
 */
export default class Words extends Component {
  render() {
    return (
      <div className="words-container">
        <h3>Found Words</h3>
        <ListGroup>
          {this.props.foundWords.map((word, index) => (
            <ListGroupItem
              key={`word-${index}`}
              className="word-item"
            >
              {word}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
} 