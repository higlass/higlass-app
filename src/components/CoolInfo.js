import React from "react";

const CoolInfo = () => (
  <div className="app-info">
    <p>
      {
        "You wanna know why HiGlass is such a cool tool and handles those monstrous Hi-C matrices with a breeze? HiGlass wouldn't be able to do it without Nezar's outrageously awesome "
      }
      <a
        href="https://github.com/mirnylab/cooler"
        target="_blank"
        rel="noopener noreferrer"
      >
        cooler
      </a>
      {
        "! This magically marvelous one-of-a-kind piece of carefully handcrafted software provides a sparse, compressed, binary persistent storage format for storing genomic interaction data."
      }
    </p>
    <p>
      {
        "So don't be shy, head over to their "
      }
      <a
        href="https://github.com/mirnylab/cooler"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub repo
      </a>
      {
        " and stores some interaction data yourself to join the prestigious club of cool people!"
      }
    </p>
  </div>
);

export default CoolInfo;
