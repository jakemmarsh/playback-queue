'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REPEAT_STATES = ['playlist', 'track', 'none'];

var PlaybackQueue = function () {
  function PlaybackQueue() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PlaybackQueue);

    this.queuePool = options.tracks || [];
    this.currentTrack = null;
    this.currentIndex = -1;

    this.isShuffled = options.shuffle && options.shuffle.toString() === 'true' ? true : false;
    this.repeatState = _lodash2.default.indexOf(REPEAT_STATES, options.repeat) !== -1 ? options.repeat : 'playlist';

    this.shufflePool = [];
    this.shuffleIndex = 0;

    this.playHistory = [];
    this.historyIndex = 0;
  }

  _createClass(PlaybackQueue, [{
    key: 'setTracks',
    value: function setTracks() {
      var tracks = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      this.queuePool = tracks;
      this.currentTrack = null;
      this.currentIndex = -1;

      this.shufflePool = [];
      this.shuffleIndex = 0;

      this.playHistory = [];
      this.historyIndex = 0;

      this.nextTrack();
    }
  }, {
    key: 'nextTrack',
    value: function nextTrack() {
      if (this.repeatState == 'track' && this.currentTrack) {
        return this.currentTrack;
      }

      if (this.historyIndex > 0 && this.playHistory.length >= this.historyIndex) {
        this.historyIndex--;

        return this.selectTrack(this.playHistory[this.historyIndex]);
      } else {
        if (this.isShuffled) {
          if (this.shuffleIndex === this.shufflePool.length) {
            this.generateShufflePool();
          }

          this.playHistory.unshift(this.shufflePool[this.shuffleIndex]);
          this.shuffleIndex++;

          return this.selectTrack(this.shufflePool[this.shuffleIndex - 1]);
        } else {
          var index = this.currentIndex + 1;

          if (index === this.queuePool.length) {
            index = 0;
          }

          this.playHistory.unshift(this.queuePool[index]);
          return this.selectTrack(this.queuePool[index]);
        }
      }
    }
  }, {
    key: 'previousTrack',
    value: function previousTrack() {
      if (this.playHistory.length > 0 && this.historyIndex + 1 < this.playHistory.length) {
        this.historyIndex++;

        return this.selectTrack(this.playHistory[this.historyIndex]);
      } else {
        var index = this.currentIndex - 1;

        if (index === -1) {
          index = this.queuePool.length - 1;
        }

        return this.selectTrack(this.queuePool[index]);
      }
    }
  }, {
    key: 'selectTrack',
    value: function selectTrack(track) {
      var indexInQueue = this.findTrackIndex(track);

      if (indexInQueue === -1) {
        throw new Error('That track is not in the currently selected playlist.');
        return;
      }

      this.currentIndex = indexInQueue;
      this.currentTrack = track;

      return this.currentTrack;
    }
  }, {
    key: 'toggleShuffle',
    value: function toggleShuffle() {
      this.isShuffled = !this.isShuffled;
    }
  }, {
    key: 'toggleRepeat',
    value: function toggleRepeat() {
      this.repeatState = REPEAT_STATES[(REPEAT_STATES.indexOf(this.repeatState) + 1) % 3];
    }
  }, {
    key: 'findTrackIndex',
    value: function findTrackIndex(track) {
      return _lodash2.default.findIndex(this.queuePool, function (queueTrack) {
        return _lodash2.default.isEqual(track, queueTrack);
      });
    }
  }, {
    key: 'sortTracks',
    value: function sortTracks(attr) {
      var asc = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      this.queuePool = _lodash2.default.sortBy(this.queuePool, function (track) {
        return track[attr];
      });

      if (asc === false) {
        this.queuePool = _lodash2.default.reverse(this.queuePool);
      }

      this.currentIndex = this.findTrackIndex(this.currentTrack);
    }
  }, {
    key: 'generateShufflePool',
    value: function generateShufflePool() {
      this.shufflePool = this.queuePool.slice(0);

      if (this.queuePool.length > 1) {
        var currentSong = this.shufflePool.splice(this.currentIndex, 1)[0];

        this.shufflePool = _utils2.default.shuffleArray(this.shufflePool);

        this.shufflePool.unshift(currentSong);

        this.shuffleIndex = 1;
      } else {
        this.shuffleIndex = 0;
      }
    }
  }]);

  return PlaybackQueue;
}();

exports.default = PlaybackQueue;