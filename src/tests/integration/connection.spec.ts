/*
Copyright (C) 2019 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const keys = require('../utils/generateKeyPair');
import { Requester } from '../../utils/requester';
import { PillarSdk } from '../..';

describe('Connection Class', () => {
  const requesterExecuteSpy: any = jest.spyOn(Requester, 'execute');
  let pSdk: PillarSdk;

  requesterExecuteSpy.mockImplementation(() => {});

  beforeEach(() => {
    pSdk = new PillarSdk({
      privateKey: keys.privateKey,
    });
  });

  afterEach(() => {
    requesterExecuteSpy.mockClear();
  });

  it('.invite', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection.invite(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.accept', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      targetUserAccessKey: 'hello',
    };

    pSdk.connection.accept(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.reject', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection.reject(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.cancel', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
    };

    pSdk.connection.cancel(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.block', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
      block: true,
    };

    pSdk.connection.block(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.mute', () => {
    const inputParams = {
      accessKey: 'abc123',
      walletId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      targetUserId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
      mute: true,
    };

    pSdk.connection.mute(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });

  it('.disconnect', () => {
    const inputParams = {
      targetUserId: '6e081b82-dbed-4485-bdbc-a808ad911758',
      sourceUserAccessKey: 'abc123',
      targetUserAccessKey: 'abc124',
      walletId: '8cc06db4-ec05-11e8-8eb2-f2801f1b9fd1',
    };

    pSdk.connection.disconnect(inputParams);

    /**
     * TODO: Currently waiting on a development
     * or testing environment before we can asset
     * a correct / expected response. For now, just
     * using a spy to ensure that the request was made.
     */
    expect(requesterExecuteSpy).toHaveBeenCalled();
  });
});
