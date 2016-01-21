'use strict';

export default class SongQueue {

  constructor(options) {
    this.tracks = options.tracks || [];
    this.isShuffled = options.shuffle || false;
    this.isRepeating = options.repeat || false;
  }

  getNext() {

  }

  getPrevious() {

  }

  shuffle() {

  }

}
