# playback-queue [![npm version](https://badge.fury.io/js/playback-queue.svg)](https://badge.fury.io/js/playback-queue)
A fully-featured and generic playback queue for music objects including history, shuffle, and repeat.

## Usage
`npm install --save playback-queue`

```js
  import PlaybackQueue from 'playback-queue'

  const options = {};
  const queue = new PlaybackQueue(options);
```

## Options
- **`tracks`:** An array of tracks (or any other object you want in the queue). These will be the objects processed and returned by the queue.
  - **type:** `array`
  - **default:** `[]`
- **`shuffle`:** A flag indicating whether or not playback (and returned tracks) should be randomly shuffled.
  - **type:** `boolean`
  - **default:** `false`
- **`repeat`:** A string indicating how playback should be repeated.
  - **type:** `string`
  - **values:** `['playlist', 'track', 'none']`
  - **default:** `'playlist`'

## API
PlaybackQueue, once instantiated, exposes a handful of methods with which to operate on the queue and retrieve objects. Any methods not intended for outside use are prefixed with an underscore (`_`).

#### Methods
##### `setTracks(tracks)`
Manually sets the playlist of tracks in the queue, then resets all states (except shuffle and repeat) and selects the first track.

##### `nextTrack()`
Selects and returns the next track to be played, based on current repeat and shuffle states. Updates state and queues accordingly.

##### `previousTrack()`
Selects and returns the previous track played based on play history. Returns previous song in current playlist if no history. Updates state and queues accordingly.

##### `selectTrack(track)`
Manually selects the given track, updating state and queues accordingly. **Note:** Throws an error if provided track is not in current playlist.

##### `toggleShuffle()`
Toggles the shuffle state between shuffled and not shuffled.

##### `toggleRepeat()`
Toggles the shuffle state between 'playlist', 'track', and 'none'.

##### `sortTracks(attr, asc)`
Sorts the current playlist by the provided attribute (key). Also takes an `asc` parameter, specifying whether the sort should be ascending or not. Defaults to `true`.

#### Properties
- `queuePool`
- `currentTrack`
- `currentIndex`
- `isShuffled`
- `repeatState`
- `shufflePool`
- `shuffleIndex`
- `playHistory`
- `historyIndex`

## Running tests

1. `git clone https://github.com/jakemmarsh/playback-queue.git`
2. `cd playback-queue`
3. `npm install`
4. `npm test` (or `npm run test-watch` to continuously run on file change)
