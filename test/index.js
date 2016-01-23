'use strict';

import should        from 'should';
import sinon         from 'sinon';

import PlaybackQueue from '../lib/index';
import utils         from '../lib/utils';

const sandbox        = sinon.sandbox.create();

describe('PlaybackQueue', function() {

  describe('#constructor', function() {
    it('should initialize with the correct values if passed no options', function() {
      const queue = new PlaybackQueue();

      should(queue.currentTrack).be.null();
      queue.currentIndex.should.equal(-1);

      should(queue.isShuffled).be.false();
      should(queue.repeatState).equal('playlist');

      queue.shufflePool.should.eql([]);
      queue.shuffleIndex.should.equal(0);

      queue.playHistory.should.eql([]);
      queue.historyIndex.should.equal(0);
    });

    it('should initialize with the correct values if passed options', function () {
      const tracks = [];
      const shuffle = true;
      const repeat = 'track';
      const queue = new PlaybackQueue({
        tracks: tracks,
        shuffle: shuffle,
        repeat: 'track'
      });

      queue.queuePool.should.equal(tracks);
      queue.isShuffled.should.equal(shuffle);
      queue.repeatState.should.equal('track');

      should(queue.currentTrack).be.null();
      queue.currentIndex.should.equal(-1);

      queue.shufflePool.should.eql([]);
      queue.shuffleIndex.should.equal(0);

      queue.playHistory.should.eql([]);
      queue.historyIndex.should.equal(0);
    });
  });

  describe('#setTracks', function() {
    it('should reset all all pools and indices', function() {
      const tracks = [];
      const newTracks = [{ id: 1 }];
      const queue = new PlaybackQueue();

      queue.queuePool = tracks;
      queue.currentTrack = { id: 1 };
      queue.currentIndex = 5;
      queue.shufflePool = [{ id: 1 }];
      queue.shuffleIndex = 4;
      queue.playHistory = [{ id: 1 }];
      queue.historyIndex = 3;

      sandbox.stub(queue, 'nextTrack');
      queue.setTracks(newTracks);

      should(queue.queuePool).eql(newTracks);
      should(queue.currentTrack).be.null();
      queue.currentIndex.should.equal(-1);
      queue.shufflePool.should.eql([]);
      queue.shuffleIndex.should.eql(0);
      queue.playHistory.should.eql([]);
      queue.historyIndex.should.eql(0);
    });

    it('should call this.nextTrack', function() {
      const tracks = [];
      const newTracks = [{ id: 1 }];
      const queue = new PlaybackQueue({ tracks: tracks });
      const nextTrackStub = sandbox.stub(queue, 'nextTrack');

      queue.setTracks(newTracks);

      sinon.assert.calledOnce(nextTrackStub);
    });
  });

  describe('#nextTrack', function() {
    describe('when this.repeatState === track', function() {
      it('should return the current track', function() {
        const queue = new PlaybackQueue({ repeat: 'track' });
        const currentTrack = { id: 1 };

        queue.currentTrack = currentTrack;

        queue.nextTrack().should.eql(currentTrack);
      });
    });

    describe('when playing from playHistory', function() {
      it('should play the next song in playHistory', function() {
        const queue = new PlaybackQueue();
        const selectTrackStub = sandbox.stub(queue, 'selectTrack');
        const playHistory = [{ id : 1 }, { id: 2 }];
        const historyIndex = 1;

        queue.playHistory = playHistory;
        queue.historyIndex = historyIndex;
        queue.nextTrack();

        sinon.assert.calledWith(selectTrackStub, playHistory[historyIndex - 1]);
      });
    });

    describe('when shuffle is toggled on', function() {
      let queue;

      beforeEach(function() {
        queue = new PlaybackQueue({ shuffle: true });
      });

      it('should generate the shuffle pool if not done already', function() {
        const generateStub = sandbox.stub(queue, '_generateShufflePool');

        sandbox.stub(queue, 'selectTrack');
        queue.nextTrack();

        sinon.assert.calledOnce(generateStub);
      });

      it('should add track from shufflePool to playHistory, increase shuffleIndex, and select new track', function() {
        const tracks = [{ id: 1 }, { id: 2 }];
        const unshiftSpy = sandbox.spy(queue.playHistory, 'unshift');
        const selectTrackStub = sandbox.stub(queue, 'selectTrack');

        queue.queuePool = tracks;
        queue.nextTrack();

        sinon.assert.calledWith(unshiftSpy, queue.shufflePool[1]);
        sinon.assert.calledWith(selectTrackStub, queue.shufflePool[1]);
        queue.shuffleIndex.should.equal(2);
      });
    });

    describe('when shuffle is toggled off', function() {
      it('should add next track in queuePool to playHistory and play it', function() {
        const tracks = [{ id: 1 }, { id: 2 }];
        const queue = new PlaybackQueue({ tracks: tracks });
        const unshiftSpy = sandbox.spy(queue.playHistory, 'unshift');
        const selectTrackStub = sandbox.stub(queue, 'selectTrack');

        queue.nextTrack();

        sinon.assert.calledWith(unshiftSpy, tracks[0]);
        sinon.assert.calledWith(selectTrackStub, tracks[0]);
      });
    });
  });

  describe('#previousTrack', function() {
    describe('if previous song exists', function() {
      it('should increment historyIndex and select new track', function() {
        const queue = new PlaybackQueue();
        const selectTrackStub = sandbox.stub(queue, 'selectTrack');
        const historyIndex = 0;
        const playHistory = [{ id: 1 }, { id: 2 }];

        queue.playHistory = playHistory;
        queue.historyIndex = historyIndex;
        queue.previousTrack();

        queue.historyIndex.should.equal(historyIndex + 1);
        sinon.assert.calledWith(selectTrackStub, queue.playHistory[historyIndex + 1]);
      });
    });

    describe('if no previous song exists', function() {
      it('should move to the previous song in the playlist', function() {
        const queue = new PlaybackQueue();


        queue.currentIndex = 1;
      });
    });
  });

  describe('#selectTrack', function() {
    describe('when track exists in this.queuePool', function() {
      it('should update this.currentIndex and this.currentTrack and return new currentTrack', function() {
        const tracks = [{ id: 1 }, { id: 2 }];
        const track = tracks[1];
        const queue = new PlaybackQueue({ tracks: tracks });

        queue.selectTrack(track);

        queue.currentTrack.should.eql(track);
        queue.currentIndex.should.equal(1);
      });
    });

    describe('when track does not exist in this.queuePool', function() {
      it('should throw an error', function() {
        const tracks = [{ id: 1 }, { id: 2 }];
        const track = { id: 3 };
        const queue = new PlaybackQueue({ tracks: tracks });

        queue.selectTrack.bind(null, track).should.throw();
      });
    });
  });

  describe('#toggleShuffle', function() {
    describe('when this.isShuffled is false', function() {
      it('should set this.isShuffled to true', function() {
        const queue = new PlaybackQueue();

        queue.isShuffled = false;
        queue.toggleShuffle();

        queue.isShuffled.should.be.true();
      });
    });

    describe('when this.isShuffled is true', function() {
      it('should set this.isShuffled to false', function() {
        const queue = new PlaybackQueue();

        queue.isShuffled = true;
        queue.toggleShuffle();

        queue.isShuffled.should.be.false();
      });
    });
  });

  describe('#toggleRepeat', function() {
    describe('when repeat is set to none', function() {
      it('should set this.repeatState to playlist, or 0', function () {
        const queue = new PlaybackQueue({ repeat: 'none' });

        queue.toggleRepeat();

        queue.repeatState.should.equal('playlist');
      });
    });

    describe('when repeat is set to track', function() {
      it('should set this.repeatState to none, or 2', function () {
        const queue = new PlaybackQueue({ repeat: 'track' });

        queue.toggleRepeat();

        queue.repeatState.should.equal('none');
      });
    });

    describe('when repeat is set to playlist', function() {
      it('should set this.repeatState to track, or 1', function () {
        const queue = new PlaybackQueue({ repeat: 'playlist' });

        queue.toggleRepeat();

        queue.repeatState.should.equal('track');
      });
    });
  });

  describe('#sortTracks', function() {
    describe('when asc parameter === true', function() {
      it('should sort this.queuePool by given attribute and update currentIndex', function() {
        const tracks = [{ id: 3 }, { id: 1 }, { id: 2 }];
        const queue = new PlaybackQueue({ tracks: tracks });

        queue.selectTrack(tracks[0]);
        queue.sortTracks('id', true);

        queue.queuePool.should.eql([{ id: 1 }, { id: 2 }, { id: 3 }]);
        queue.currentIndex.should.equal(2);
      });
    });

    describe('when asc parameter === false', function() {
      it('should sort this.queuePool by given attribute and update currentIndex', function() {
        const tracks = [{ id: 3 }, { id: 1 }, { id: 2 }];
        const queue = new PlaybackQueue({ tracks: tracks });

        queue.selectTrack(tracks[0]);
        queue.sortTracks('id', false);

        queue.queuePool.should.eql([{ id: 3 }, { id: 2 }, { id: 1 }]);
        queue.currentIndex.should.equal(0);
      });
    });
  });

  describe('#_findTrackIndex', function() {
    describe('when track is in queuePool', function() {
      it('should return the index', function() {
        const tracks = [{ id: 1 }, { id: 2 }];
        const queue = new PlaybackQueue({ tracks: tracks });

        queue._findTrackIndex(tracks[0]).should.equal(0);
        queue._findTrackIndex(tracks[1]).should.equal(1);
      });
    });

    describe('when track is not in queuePool', function() {
      it('should return -1', function() {
        const queue = new PlaybackQueue();

        queue._findTrackIndex({ id: 1 }).should.equal(-1);
      });
    });
  });

  describe('#_generateShufflePool', function() {
    describe('if queuePool has tracks', function() {
      it('should build this.shufflePool by removing the current song, shuffling, and adding it back', function() {
        const tracks = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const queue = new PlaybackQueue({ tracks: tracks });
        const shuffleSpy = sandbox.spy(utils, 'shuffleArray');
        const currentIndex = 0;

        queue.currentIndex = currentIndex;
        queue._generateShufflePool();

        sinon.assert.calledWith(shuffleSpy, tracks.slice(1));
        queue.shufflePool[0].should.eql(tracks[currentIndex]);
      });
    });

    describe('if queuePool has no tracks', function() {
      it('sets shufflePool to an empty array and shuffleIndex to 0', function() {
        const queue = new PlaybackQueue();

        queue.shufflePool = [{ id: 1 }];
        queue.shuffleIndex = 7;
        queue._generateShufflePool();

        queue.shufflePool.should.eql(queue.queuePool);
        queue.shuffleIndex.should.equal(0);
      });
    });
  });

});
