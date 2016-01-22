'use strict';

import should from 'should';
import sinon from 'sinon';

import SongQueue from '../lib/index';

describe('SongQueue', function() {

  beforeEach(function() {
    this.queue = new SongQueue();
  });

  it('should something', function() {
    console.log(this.queue);
  });

});
