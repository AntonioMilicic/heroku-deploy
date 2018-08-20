import React from 'react';

class Credits extends React.Component {
  render() {
    return (
      <div className="creditsContainer">
        <h3>Dev</h3>

        <ul>
          <li>
            <a href="https://github.com/zkrivo"
              target="_blank"
              rel="noopener noreferrer">
              Željka Krivo
            </a>
          </li>

          <li>
            <a href="https://github.com/tonijukica"
              target="_blank"
              rel="noopener noreferrer">
              Toni Jukica
            </a>
          </li>

          <li>
            <a href="https://github.com/Laseen"
              target="_blank"
              rel="noopener noreferrer">
              Antonio Miličić
            </a>
          </li>
        </ul>

        <h3>Mentor</h3>

        <ul>
          <li>
            <a href="https://github.com/b0rza"
              target="_blank"
              rel="noopener noreferrer">
              Ante Borzić
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Credits;
