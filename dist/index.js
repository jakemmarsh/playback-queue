'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var REPEAT_STATES = {
  playlist: 0,
  track: 1,
  none: 2
};

var SongQueue = function () {
  function SongQueue(options) {
    _classCallCheck(this, SongQueue);

    this.tracks = options.tracks || [];
    this.currentTrack = null;

    this.isShuffled = options.shuffle.toString() === 'true' ? true : false;
    this.repeatState = _lodash2.default.has(REPEAT_STATES, options.repeat) ? REPEAT_STATES[options.repeat] : REPEAT_STATES.none;

    this.queuePool = [];

    this.shufflePool = [];
    this.shuffleIndex = 0;

    this.playHistory = [];
    this.playHistoryIndex = 0;
  }

  _createClass(SongQueue, [{
    key: 'findTrackIndex',
    value: function findTrackIndex(track) {
      return _lodash2.default.findIndex(this.queuePool, function (queueTrack) {
        return _lodash2.default.isEqual(track, queueTrack);
      });
    }
  }, {
    key: 'nextTrack',
    value: function nextTrack() {
      if (this.repeatState == REPEAT_STATES.track) {
        return this.currentTrack;
      }

      var index = 0;

      if (this.playHistoryIndex > 0 && this.playHistory.length >= this.playHistoryIndex) {
        // move forward a song in the history
        this.playHistoryIndex--;
      }
    }
  }, {
    key: 'previousTrack',
    value: function previousTrack() {}
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
  }]);

  return SongQueue;
}();

exports.default = SongQueue;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU0sZ0JBQWdCO0FBQ3BCLFlBQVUsQ0FBVjtBQUNBLFNBQU8sQ0FBUDtBQUNBLFFBQU0sQ0FBTjtDQUhJOztJQU1lO0FBRW5CLFdBRm1CLFNBRW5CLENBQVksT0FBWixFQUFxQjswQkFGRixXQUVFOztBQUNuQixTQUFLLE1BQUwsR0FBYyxRQUFRLE1BQVIsSUFBa0IsRUFBbEIsQ0FESztBQUVuQixTQUFLLFlBQUwsR0FBb0IsSUFBcEIsQ0FGbUI7O0FBSW5CLFNBQUssVUFBTCxHQUFrQixRQUFRLE9BQVIsQ0FBZ0IsUUFBaEIsT0FBK0IsTUFBL0IsR0FBd0MsSUFBeEMsR0FBK0MsS0FBL0MsQ0FKQztBQUtuQixTQUFLLFdBQUwsR0FBbUIsaUJBQUUsR0FBRixDQUFNLGFBQU4sRUFBcUIsUUFBUSxNQUFSLENBQXJCLEdBQXVDLGNBQWMsUUFBUSxNQUFSLENBQXJELEdBQXVFLGNBQWMsSUFBZCxDQUx2RTs7QUFPbkIsU0FBSyxTQUFMLEdBQWlCLEVBQWpCLENBUG1COztBQVNuQixTQUFLLFdBQUwsR0FBbUIsRUFBbkIsQ0FUbUI7QUFVbkIsU0FBSyxZQUFMLEdBQW9CLENBQXBCLENBVm1COztBQVluQixTQUFLLFdBQUwsR0FBbUIsRUFBbkIsQ0FabUI7QUFhbkIsU0FBSyxnQkFBTCxHQUF3QixDQUF4QixDQWJtQjtHQUFyQjs7ZUFGbUI7O21DQWtCSixPQUFPO0FBQ3BCLGFBQU8saUJBQUUsU0FBRixDQUFZLEtBQUssU0FBTCxFQUFnQixVQUFDLFVBQUQsRUFBZ0I7QUFDakQsZUFBTyxpQkFBRSxPQUFGLENBQVUsS0FBVixFQUFpQixVQUFqQixDQUFQLENBRGlEO09BQWhCLENBQW5DLENBRG9COzs7O2dDQU1WO0FBQ1YsVUFBSyxLQUFLLFdBQUwsSUFBb0IsY0FBYyxLQUFkLEVBQXNCO0FBQzdDLGVBQU8sS0FBSyxZQUFMLENBRHNDO09BQS9DOztBQUlBLFVBQUksUUFBUSxDQUFSLENBTE07O0FBT1YsVUFBSyxLQUFLLGdCQUFMLEdBQXdCLENBQXhCLElBQTZCLEtBQUssV0FBTCxDQUFpQixNQUFqQixJQUEyQixLQUFLLGdCQUFMLEVBQXdCOztBQUVuRixhQUFLLGdCQUFMLEdBRm1GO09BQXJGOzs7O29DQU1jOzs7b0NBSUE7QUFDZCxXQUFLLFVBQUwsR0FBa0IsQ0FBQyxLQUFLLFVBQUwsQ0FETDs7OzttQ0FJRDtBQUNiLFdBQUssV0FBTCxHQUFtQixDQUFDLEtBQUssV0FBTCxHQUFtQixDQUFuQixDQUFELEdBQXlCLENBQXpCLENBRE47Ozs7U0E3Q0kiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IFJFUEVBVF9TVEFURVMgPSB7XG4gIHBsYXlsaXN0OiAwLFxuICB0cmFjazogMSxcbiAgbm9uZTogMlxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb25nUXVldWUge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRyYWNrcyA9IG9wdGlvbnMudHJhY2tzIHx8IFtdO1xuICAgIHRoaXMuY3VycmVudFRyYWNrID0gbnVsbDtcblxuICAgIHRoaXMuaXNTaHVmZmxlZCA9IG9wdGlvbnMuc2h1ZmZsZS50b1N0cmluZygpID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5yZXBlYXRTdGF0ZSA9IF8uaGFzKFJFUEVBVF9TVEFURVMsIG9wdGlvbnMucmVwZWF0KSA/IFJFUEVBVF9TVEFURVNbb3B0aW9ucy5yZXBlYXRdIDogUkVQRUFUX1NUQVRFUy5ub25lO1xuXG4gICAgdGhpcy5xdWV1ZVBvb2wgPSBbXTtcblxuICAgIHRoaXMuc2h1ZmZsZVBvb2wgPSBbXTtcbiAgICB0aGlzLnNodWZmbGVJbmRleCA9IDA7XG5cbiAgICB0aGlzLnBsYXlIaXN0b3J5ID0gW107XG4gICAgdGhpcy5wbGF5SGlzdG9yeUluZGV4ID0gMDtcbiAgfVxuXG4gIGZpbmRUcmFja0luZGV4KHRyYWNrKSB7XG4gICAgcmV0dXJuIF8uZmluZEluZGV4KHRoaXMucXVldWVQb29sLCAocXVldWVUcmFjaykgPT4ge1xuICAgICAgcmV0dXJuIF8uaXNFcXVhbCh0cmFjaywgcXVldWVUcmFjayk7XG4gICAgfSk7XG4gIH1cblxuICBuZXh0VHJhY2soKSB7XG4gICAgaWYgKCB0aGlzLnJlcGVhdFN0YXRlID09IFJFUEVBVF9TVEFURVMudHJhY2sgKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50VHJhY2s7XG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gMDtcblxuICAgIGlmICggdGhpcy5wbGF5SGlzdG9yeUluZGV4ID4gMCAmJiB0aGlzLnBsYXlIaXN0b3J5Lmxlbmd0aCA+PSB0aGlzLnBsYXlIaXN0b3J5SW5kZXggKSB7XG4gICAgICAvLyBtb3ZlIGZvcndhcmQgYSBzb25nIGluIHRoZSBoaXN0b3J5XG4gICAgICB0aGlzLnBsYXlIaXN0b3J5SW5kZXgtLTtcbiAgICB9XG4gIH1cblxuICBwcmV2aW91c1RyYWNrKCkge1xuXG4gIH1cblxuICB0b2dnbGVTaHVmZmxlKCkge1xuICAgIHRoaXMuaXNTaHVmZmxlZCA9ICF0aGlzLmlzU2h1ZmZsZWQ7XG4gIH1cblxuICB0b2dnbGVSZXBlYXQoKSB7XG4gICAgdGhpcy5yZXBlYXRTdGF0ZSA9ICh0aGlzLnJlcGVhdFN0YXRlICsgMSkgJSAzO1xuICB9XG5cbn1cbiJdfQ==