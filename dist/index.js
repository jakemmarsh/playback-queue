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

var REPEAT_STATES = {
  playlist: 0,
  track: 1,
  none: 2
};

var SongQueue = function () {
  function SongQueue() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, SongQueue);

    this.queuePool = options.tracks || [];
    this.currentTrack = null;
    this.currentIndex = null;

    this.isShuffled = options.shuffle && options.shuffle.toString() === 'true' ? true : false;
    this.repeatState = _lodash2.default.has(REPEAT_STATES, options.repeat) ? REPEAT_STATES[options.repeat] : REPEAT_STATES.none;

    this.shufflePool = [];
    this.shuffleIndex = 0;

    this.playHistory = [];
    this.playHistoryIndex = 0;
  }

  _createClass(SongQueue, [{
    key: 'nextTrack',
    value: function nextTrack() {
      if (this.repeatState == REPEAT_STATES.track) {
        return this.currentTrack;
      }

      if (this.playHistoryIndex > 0 && this.playHistory.length >= this.playHistoryIndex) {
        this.playHistoryIndex--;

        return this.selectTrack(this.playHistory[this.playHistoryIndex]);
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
      if (this.playHistory.length > 0 && this.playHistoryIndex + 1 < this.playHistory.length) {
        this.playHistoryIndex++;

        return this.selectTrack(this.playHistory[this.playHistoryIndex]);
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
      this.repeatState = (this.repeatState + 1) % 3;
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
    value: function sortTracks(attr) {}
  }, {
    key: 'generateShufflePool',
    value: function generateShufflePool() {
      this.shufflePool = this.queuePool.slice(0);

      if (this.queuePool.length > 1) {
        var currentSong = this.shufflePool.splice(this.currentIndex, 1);

        this.shufflePool = _utils2.default.shuffleArray(this.shufflePool);;

        this.shufflePool.unshift(currentSong);

        this.shuffleIndex = 1;
      } else {
        this.shuffleIndex = 0;
      }
    }
  }]);

  return SongQueue;
}();

exports.default = SongQueue;
