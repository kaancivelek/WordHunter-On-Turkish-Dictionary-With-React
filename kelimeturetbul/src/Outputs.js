import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from "reactstrap";

/**
 * Üretilen rastgele kelimeleri listeleyen bileşen
 * @param {string[]} outputs - Üretilen rastgele kelimeler listesi
 */
export default class Outputs extends Component {
  render() {
    return (
      <div className="outputs-container">
        <h3>Üretilen Kelimeler</h3>
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
