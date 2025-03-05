import React, { Component } from "react";
import Scoreboard from "./Scoreboard";
import Words from "./Words";
import Outputs from "./Outputs";
import "./App.css";

/**
 * Word Generation and Finding Game
 * This component generates random words and tries to find meaningful words from them.
 */
export default class App extends Component {
  state = {
    words: [],        // Word list from API
    foundWords: [],   // Words found by the player
    outputs: [],      // Generated random words
    score: 0,         // Player's score
    isGameStarted: false, // State to check if the game has started
  };

  // Vowels in Turkish alphabet
  vowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];
  
  // Consonants in Turkish alphabet
  consonants = [
    "b", "c", "ç", "d", "f", "g", "ğ", "h",
    "j", "k", "l", "m", "n", "p", "r", "s",
    "ş", "t", "v", "y", "z",
  ];

  componentDidMount() {
    this.getWordsFromAPI();
  }

  /**
   * Fetches word list from API
   */
  getWordsFromAPI = () => {
    fetch("http://localhost:3000/words")
      .then((response) => response.json())
      .then((data) => this.setState({ words: data }));
  };

  /**
   * Starts the game and generates 10 random words
   */
  startGame = () => {
    if (this.state.isGameStarted) {
      // End game check
      if (this.state.score >= 70) {
        alert("Congratulations! You won! \nYour score: " + this.state.score);
      } else {
        alert("Sorry, you lost! \nYour score: " + this.state.score);
      }
      // Refresh page
      window.location.reload();
      return;
    }

    // Start game
    this.setState({ isGameStarted: true });
    for (let i = 0; i < 10; i++) {
      const randomWord = this.generateRandomWord(9);
      this.isItWord(randomWord);
    }
  };

  /**
   * Generates a random word of specified length
   * @param {number} length - Length of the word to generate
   * @returns {string} Generated word
   */
  generateRandomWord = (length) => {
    let word = "";
    let isVowel = true;

    for (let i = 0; i < length; i++) {
      const letterPool = isVowel ? this.vowels : this.consonants;
      word += letterPool[Math.floor(Math.random() * letterPool.length)];
      isVowel = !isVowel;
    }

    return word;
  };

  /**
   * Checks if the given input is a valid word
   * @param {string} input - Word to check
   */
  isItWord = (input) => {
    if (!this.state.outputs.includes(input)) {
      this.setState((prevState) => ({
        outputs: [...prevState.outputs, input],
      }));
    }
  
    this.checkWord(input);
    this.checkSubWords(input);
  };

  /**
   * Checks for exact word match
   * @param {string} word - Word to check
   */
  checkWord = (word) => {
    const found = this.state.words.find((w) => w.word === word);
    if (found) {
      const score = word === "filhakika" ? 10 : 5;
      this.addFoundWord(word, score);
    }
  };

  /**
   * Checks for subwords within the word
   * @param {string} word - Word to check
   */
  checkSubWords = (word) => {
    for (let size = 2; size <= Math.min(8, word.length); size++) {
      const leftPart = word.substring(0, size);
      const rightPart = word.substring(word.length - size);
  
      if (this.state.words.some((w) => w.word === leftPart)) {
        this.addFoundWord(leftPart, 5);
      }
  
      if (this.state.words.some((w) => w.word === rightPart)) {
        this.addFoundWord(rightPart, 5);
      }
    }
  };
  
  /**
   * Adds found word and score to state
   * @param {string} word - Found word
   * @param {number} scoreIncrease - Score to add
   */
  addFoundWord = (word, scoreIncrease) => {
    if (!this.state.foundWords.includes(word)) {
      this.setState((prevState) => ({
        foundWords: [...prevState.foundWords, word],
        score: prevState.score + scoreIncrease,
      }));
    }
  };

  render() {
    return (
      <div id="App">
        <button className="start-button" onClick={this.startGame}>
          {this.state.isGameStarted ? "End Game" : "Start Game"}
        </button>
        <div className="game-container">
          <div className="scoreboard">
            <Scoreboard score={this.state.score} />
          </div>
          <div className="game-content">
            <div className="words">
              <Words foundWords={this.state.foundWords} />
            </div>
            <div className="outputs">
              <Outputs outputs={this.state.outputs} />
            </div>
          </div>
        </div>
      </div>
    );
  }
} 