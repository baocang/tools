/*
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

import * as wct from '@polymer-tools/web-component-tester';
import {assert} from 'chai';
import * as sinon from 'sinon';

import {PolymerCli} from '../../../polymer-cli';

suite('test', () => {
  teardown(() => {
    sinon.restore();
  });

  test(
      '--npm flag is passed to WCT and sets the --component-dir flag',
      async () => {
        const wctCliRunStub =
            sinon.stub(wct.cli, 'run').returns(Promise.resolve());
        const cli = new PolymerCli(['test', '--npm']);
        await cli.run();

        const wctArgs = wctCliRunStub.args[0][1];
        assert.includeMembers(wctCliRunStub.args[0][1], ['--npm']);
        assert.includeMembers(wctArgs, [`--component-dir='node_modules/'`]);
      });

  test(
      '--component-dir flag overrides the default setting caused by the ' +
          '--npm flag',
      async () => {
        const wctCliRunStub =
            sinon.stub(wct.cli, 'run').returns(Promise.resolve());
        const cli =
            new PolymerCli(['test', '--npm', '--component-dir=path/to/deps/']);
        await cli.run();

        const wctArgs = wctCliRunStub.args[0][1];
        assert.includeMembers(wctArgs, ['--npm']);
        assert.includeMembers(wctArgs, [`--component-dir='path/to/deps/'`]);
      });

  test('--component-dir flag is passed to WCT', async () => {
    const wctCliRunStub = sinon.stub(wct.cli, 'run').returns(Promise.resolve());
    const cli = new PolymerCli(['test', '--component-dir=path/to/deps/']);
    await cli.run();

    const wctArgs = wctCliRunStub.args[0][1];
    assert.isOk(!wctArgs.includes('--npm'));
    assert.includeMembers(wctArgs, [`--component-dir='path/to/deps/'`]);
  });

  test('--module-resolution flag is passed to WCT', async () => {
    const wctCliRunStub = sinon.stub(wct.cli, 'run').returns(Promise.resolve());
    const cli = new PolymerCli(['test', '--module-resolution=none']);
    await cli.run();

    const wctArgs = wctCliRunStub.args[0][1];
    assert.includeMembers(wctArgs, [`--module-resolution=none`]);
  });
});
