'use strict';

const utils = {

  shuffleArray: (array) => {
    const arrayCopy = array.slice(0);
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while ( currentIndex !== 0 ) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arrayCopy[currentIndex];
      arrayCopy[currentIndex] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = temporaryValue;
    }

    return arrayCopy;
  }

};

export default utils;
