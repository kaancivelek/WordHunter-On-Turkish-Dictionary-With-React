## 🇬🇧 English

### About the Project
This project is an entertaining word generation and finding game developed using React. The game generates words using random letters and tries to find meaningful Turkish words from these generated combinations.
#TO CHANGE LANGUAGE OF PROJECT TURKISH TO ENGLISH COPY AND PASTE SinifUygulamasiIki/src to SinifUygulamasiIki/kelimeturetbul/src
### How It Works
1. When the game starts, the system generates 10 random 9-letter words using Turkish vowels and consonants.
2. For each generated word:
   - Checks if the word itself is a meaningful Turkish word
   - Checks all possible meaningful words that can be formed using 2 to 8 letters from the generated word
3. For each meaningful word found:
   - Regular words: 5 points
   - Special words (e.g., "filhakika"): 10 points
4. Game end:
   - 70 points and above: Win
   - Below 70 points: Lose

### Technical Details
- **Algorithm**:
  - During word generation, vowels and consonants are used alternately
  - Both exact matches and subwords are checked for each generated word
  - Words are compared against a Turkish word database retrieved from API

- **Components**:
  - `App.js`: Main game logic and state management
  - `Scoreboard.js`: Score display
  - `Words.js`: List of found words
  - `Outputs.js`: List of generated random words
