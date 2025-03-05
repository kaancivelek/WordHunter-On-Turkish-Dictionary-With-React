import React, { Component } from "react";
import Scoreboard from "./Scoreboard";
import Words from "./Words";
import Outputs from "./Outputs";
import "./App.css";

/**
 * Kelime Üretme ve Bulma Oyunu
 * Bu bileşen, rastgele kelimeler üretir ve bu kelimelerden anlamlı kelimeler bulmaya çalışır.
 */
export default class App extends Component {
  state = {
    words: [],      // API'den gelen kelime listesi
    foundWords: [], // Oyuncunun bulduğu kelimeler
    outputs: [],    // Üretilen rastgele kelimeler
    score: 0,       // Oyuncunun puanı
    isGameStarted: false, // Oyunun başlayıp başlamadığını kontrol eden state
  };

  // Türkçe alfabesindeki sesli harfler
  vowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];
  
  // Türkçe alfabesindeki sessiz harfler
  consonants = [
    "b", "c", "ç", "d", "f", "g", "ğ", "h",
    "j", "k", "l", "m", "n", "p", "r", "s",
    "ş", "t", "v", "y", "z",
  ];

  componentDidMount() {
    this.getWordsFromAPI();
  }

  /**
   * API'den kelime listesini çeker
   */
  getWordsFromAPI = () => {
    fetch("http://localhost:3000/kelimeler")
      .then((response) => response.json())
      .then((data) => this.setState({ words: data }));
  };

  /**
   * Oyunu başlatır ve 10 adet rastgele kelime üretir
   */
  startGame = () => {
    if (this.state.isGameStarted) {
      // Oyun sonu kontrolü
      if (this.state.score >= 70) {
        alert("Tebrikler! Kazandınız! \nPuanınız: " + this.state.score);
      } else {
        alert("Maalesef kaybettiniz! \nPuanınız: " + this.state.score);
      }
      // Sayfayı yenile
      window.location.reload();
      return;
    }

    // Oyunu başlat
    this.setState({ isGameStarted: true });
    for (let i = 0; i < 10; i++) {
      const randomWord = this.generateRandomWord(9);
      this.isItWord(randomWord);
    }
    
  };

  /**
   * Belirtilen uzunlukta rastgele bir kelime üretir
   * @param {number} length - Üretilecek kelimenin uzunluğu
   * @returns {string} Üretilen kelime
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
   * Verilen kelimenin geçerli bir kelime olup olmadığını kontrol eder
   * @param {string} input - Kontrol edilecek kelime
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
   * Kelimenin tam eşleşmesini kontrol eder
   * @param {string} word - Kontrol edilecek kelime
   */
  checkWord = (word) => {
    const found = this.state.words.find((w) => w.kelime === word);
    if (found) {
      const score = word === "filhakika" ? 10 : 5;
      this.addFoundWord(word, score);
    }
  };

  /**
   * Kelimenin alt kelimelerini kontrol eder
   * @param {string} word - Kontrol edilecek kelime
   */
  checkSubWords = (word) => {
    for (let size = 2; size <= Math.min(8, word.length); size++) {
      const leftPart = word.substring(0, size);
      const rightPart = word.substring(word.length - size);
  
      if (this.state.words.some((w) => w.kelime === leftPart)) {
        this.addFoundWord(leftPart, 5);
      }
  
      if (this.state.words.some((w) => w.kelime === rightPart)) {
        this.addFoundWord(rightPart, 5);
      }
    }
  };
  
  /**
   * Bulunan kelimeyi ve puanı state'e ekler
   * @param {string} word - Bulunan kelime
   * @param {number} scoreIncrease - Kazanılacak puan
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
          {this.state.isGameStarted ? "Oyunu Bitir" : "Oyunu Başlat"}
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
