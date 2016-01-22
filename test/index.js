'use strict';

import should from 'should';
import sinon from 'sinon';

import PlaybackQueue from '../lib/index';

describe('PlaybackQueue', function() {

  describe('#constructor', function() {
    it('should initialize with the correct values if passed no options', function() {
      const queue = new PlaybackQueue();

      should(queue.currentTrack).be.null();
      should(queue.currentIndex).be.null();

      should(queue.isShuffled).be.false();
      should(queue.repeatState).equal(0);

      queue.shufflePool.should.eql([]);
      queue.shuffleIndex.should.equal(0);

      queue.playHistory.should.eql([]);
      queue.playHistoryIndex.should.equal(0);
    });

    it('should initialize with the correct values if passed options', function () {
      const tracks = [];
      const shuffle = true;
      const repeat = 'track';
      const queue = new PlaybackQueue({
        tracks: tracks,
        shuffle: shuffle,
        repeat: repeat
      });

      queue.queuePool.should.equal(tracks);
      queue.isShuffled.should.equal(shuffle);
      queue.repeatState.should.equal(1);

      should(queue.currentTrack).be.null();
      should(queue.currentIndex).be.null();

      queue.shufflePool.should.eql([]);
      queue.shuffleIndex.should.equal(0);

      queue.playHistory.should.eql([]);
      queue.playHistoryIndex.should.equal(0);
    });
  });

  describe('#nextTrack', function() {

  });

  describe('#previousTrack', function() {

  });

  describe('#selectTrack', function() {

  });

  describe('#toggleShuffle', function() {

  });

  describe('#toggleRepeat', function() {

  });

  describe('#findTrackIndex', function() {

  });

  describe('#sortTracks', function() {

  });

  describe('#generateShufflePool', function() {

  });

});
