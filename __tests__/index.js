'use strict';

const SongQueue = require('../lib');

describe('SongQueue', function() {

  beforeEach(function() {
    this.queue = new SongQueue();
  });

  it('should something', function() {
    console.log(this.queue);
  });

});