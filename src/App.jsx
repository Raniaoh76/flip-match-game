import { useState, useEffect } from 'react'
import './App.css'

const emojiList = ["🎀", "🍰", "💄", "🍓", "🧸", "🌸"];

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const initGame = () => {
    const shuffled = [...emojiList, ...emojiList]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffled);
    setSolved([]);
    setFlipped([]);
    setGameStarted(true);
  };

  useEffect(() => { initGame(); setGameStarted(false); }, []);

  const handleClick = (index) => {
    if (flipped.length === 2 || solved.includes(index) || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setSolved([...solved, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">FlipMatch</h1>
      
      {!gameStarted ? (
        <div className="welcome-screen">
          <div className="welcome-card">
            <p>Welcome to the game of</p>
            <h2 className="duo-name">✨ Duo Rania & Rain ✨</h2>
            <p className="sub-text">Ready to test your memory?</p>
            <button onClick={initGame} className="reset-btn">Start Game</button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid">
            {cards.map((card, index) => {
              const isVisible = flipped.includes(index) || solved.includes(index);
              return (
                <div 
                  key={index} 
                  className={`card ${isVisible ? 'active' : ''} ${solved.includes(index) ? 'matched' : ''}`}
                  onClick={() => handleClick(index)}
                >
                  <div className="card-content">
                    {isVisible ? card.emoji : "❤️"}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={initGame} className="reset-btn">New Game</button>

          {solved.length === cards.length && cards.length > 0 && (
            <div className="win-overlay">
              <div className="win-modal">
                <h2>✨ CONGRATULATIONS! ✨</h2>
                <p>You mastered the match! 🎀</p>
                <button onClick={() => setGameStarted(false)} className="reset-btn">Play Again</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App