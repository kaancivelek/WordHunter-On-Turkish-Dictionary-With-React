import React, { Component } from 'react'

/**
 * Oyun skorunu gösteren bileşen
 * @param {number} score - Oyuncunun mevcut puanı
 */
export default class Scoreboard extends Component {
  render() {
    return (
      <div className="scoreboard-container">
        <h1>Puan: {this.props.score}</h1>
      </div>
    )
  }
}
