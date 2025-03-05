import React, { Component } from 'react'

/**
 * Component that displays the game score
 * @param {number} score - Current player score
 */
export default class Scoreboard extends Component {
  render() {
    return (
      <div className="scoreboard-container">
        <h1>Score: {this.props.score}</h1>
      </div>
    )
  }
} 