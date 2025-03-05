import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from "reactstrap";

/**
 * Bulunan kelimeleri listeleyen bileşen
 * @param {string[]} foundWords - Oyuncunun bulduğu kelimeler listesi
 */
export default class Words extends Component {
  render() {
    return (
      <div className="words-container">
        <h3>Bulunan Kelimeler</h3>
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
