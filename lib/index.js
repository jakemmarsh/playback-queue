'use strict';

import _ from 'lodash';

const REPEAT_STATES = {
  playlist: 0,
  track: 1,
  none: 2
}

export default class SongQueue {

  constructor(options = {}) {
    this.tracks = options.tracks || [];
    this.currentTrack = null;

    this.isShuffled = options.shuffle && options.shuffle.toString() === 'true' ? true : false;
    this.repeatState = _.has(REPEAT_STATES, options.repeat) ? REPEAT_STATES[options.repeat] : REPEAT_STATES.none;

    this.queuePool = [];

    this.shufflePool = [];
    this.shuffleIndex = 0;

    this.playHistory = [];
    this.playHistoryIndex = 0;
  }

  findTrackIndex(track) {
    return _.findIndex(this.queuePool, (queueTrack) => {
      return _.isEqual(track, queueTrack);
    });
  }

  nextTrack() {
    if ( this.repeatState == REPEAT_STATES.track ) {
      return this.currentTrack;
    }

    let index = 0;

    if ( this.playHistoryIndex > 0 && this.playHistory.length >= this.playHistoryIndex ) {
      // move forward a song in the history
      this.playHistoryIndex--;
    }
  }

  previousTrack() {

  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
  }

  toggleRepeat() {
    this.repeatState = (this.repeatState + 1) % 3;
  }

}
