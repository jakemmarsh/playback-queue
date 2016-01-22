'use strict';

import should from 'should';
import sinon from 'sinon';

import PlaybackQueue from '../lib/index';

describe('PlaybackQueue', function() {

  beforeEach(function() {
    this.queue = new PlaybackQueue();
  });

  it('should something', function() {
    console.log(this.queue);
  });

});
