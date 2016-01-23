'use strict';

import _     from 'lodash';

import utils from './utils';

const REPEAT_STATES = ['playlist', 'track', 'none'];

export default class PlaybackQueue {

  constructor(options = {}) {
    this.queuePool = options.tracks || [];
    this.currentTrack = null;
    this.currentIndex = -1;

    this.isShuffled = options.shuffle && options.shuffle.toString() === 'true' ? true : false;
    this.repeatState = _.indexOf(REPEAT_STATES, options.repeat) !== -1 ? options.repeat : 'playlist';

    this.shufflePool = [];
    this.shuffleIndex = 0;

    this.playHistory = [];
    this.historyIndex = 0;
  }

  setTracks(tracks = []) {
    this.queuePool = tracks;
    this.currentTrack = null;
    this.currentIndex = -1;

    this.shufflePool = [];
    this.shuffleIndex = 0;

    this.playHistory = [];
    this.historyIndex = 0;

    this.nextTrack();
  }

  nextTrack() {
    // Repeat the current track if repeat state === 1
    if ( this.repeatState == 'track' && this.currentTrack ) {
      return this.currentTrack;
    }

    // If playing from within playHistory
    if ( this.historyIndex > 0 && this.playHistory.length >= this.historyIndex ) {
      // move forward a song in the history
      this.historyIndex--;

      return this.selectTrack(this.playHistory[this.historyIndex]);
    } else {
      if ( this.isShuffled ) {
        if ( this.shuffleIndex === this.shufflePool.length ) {
          // Reshuffle for randomness
          this.generateShufflePool();
        }

        // Play the next shuffle song
        this.playHistory.unshift(this.shufflePool[this.shuffleIndex]);
        this.shuffleIndex++;

        // One less than shuffleIndex to counteract above increment
        return this.selectTrack(this.shufflePool[this.shuffleIndex - 1]);
      } else {
        // Not shuffled, play next song in queue
        let index = this.currentIndex + 1;

        if ( index === this.queuePool.length ) {
          index = 0;
        }

        // Add the song to history
        this.playHistory.unshift(this.queuePool[index]);
        return this.selectTrack(this.queuePool[index]);
      }
    }
  }

  previousTrack() {
    // Find previous song if it exists
    if ( this.playHistory.length > 0 && this.historyIndex + 1 < this.playHistory.length ) {
      // Increment history marker
      this.historyIndex++;

      return this.selectTrack(this.playHistory[this.historyIndex]);
    } else {
      // Move to the previous song in the playlist
      let index = this.currentIndex - 1;

      if ( index === -1 ) {
        index = this.queuePool.length - 1;
      }

      return this.selectTrack(this.queuePool[index]);
    }
  }

  selectTrack(track) {
    const indexInQueue = this.findTrackIndex(track);

    if ( indexInQueue === - 1 ) {
      throw new Error('That track is not in the currently selected playlist.');
      return;
    }

    this.currentIndex = indexInQueue;
    this.currentTrack = track;

    return this.currentTrack;
  }

  toggleShuffle() {
    this.isShuffled = !this.isShuffled;
  }

  toggleRepeat() {
    this.repeatState = REPEAT_STATES[(REPEAT_STATES.indexOf(this.repeatState) + 1) % 3];
  }

  findTrackIndex(track) {
    return _.findIndex(this.queuePool, (queueTrack) => {
      return _.isEqual(track, queueTrack);
    });
  }

  sortTracks(attr, asc = true) {
    this.queuePool =  _.sortBy(this.queuePool, (track) => { return track[attr]; });

    if ( asc === false ) {
      this.queuePool = _.reverse(this.queuePool);
    }

    this.currentIndex = this.findTrackIndex(this.currentTrack);
  }

  generateShufflePool() {
    this.shufflePool = this.queuePool.slice(0);

    if ( this.queuePool.length > 1 ) {
      // Remove current song
      const currentSong = this.shufflePool.splice(this.currentIndex, 1)[0];

      this.shufflePool = utils.shuffleArray(this.shufflePool);

      // Re-add current song at beginning
      this.shufflePool.unshift(currentSong);

      // Set shuffle index one song after current
      this.shuffleIndex = 1;
    } else {
      this.shuffleIndex = 0;
    }
  }

}
