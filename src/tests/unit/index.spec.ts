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
import { PillarSdk } from '../../index';
import { Configuration } from '../../lib/configuration';
import { Asset } from '../../lib/asset';
import { Connection } from '../../lib/connection';
import { Notification } from '../../lib/notification';
import { User } from '../../lib/user';
import { Wallet } from '../../lib/wallet';
import { Investments } from '../../lib/investments';

describe('The Pillar SDK Class', () => {
  it('should correctly instantiate and expose all sub-classes', () => {
    const pSdk = new PillarSdk({});

    expect(pSdk).toBeInstanceOf(PillarSdk);
    expect(pSdk.asset).toBeInstanceOf(Asset);
    expect(pSdk.connection).toBeInstanceOf(Connection);
    expect(pSdk.notification).toBeInstanceOf(Notification);
    expect(pSdk.user).toBeInstanceOf(User);
    expect(pSdk.wallet).toBeInstanceOf(Wallet);
    expect(pSdk.configuration).toBeInstanceOf(Configuration);
    expect(pSdk.investments).toBeInstanceOf(Investments);
  });

  it('should correctly instantiate with all properties', () => {
    const pSdk = new PillarSdk({
      oAuthTokens: {
        accessToken: 'oneAccessToken',
        refreshToken: 'oneRefreshToken',
      },
      updateOAuthFn: (response: {
        accessToken: string;
        refreshToken: string;
      }) => {
        return `Callback called: ${response}`;
      },
      notificationsUrl: 'http://localhost:8081',
      investmentsUrl: 'http://localhost:8082',
    });

    expect(pSdk).toBeInstanceOf(PillarSdk);
    expect(pSdk.asset).toBeInstanceOf(Asset);
    expect(pSdk.connection).toBeInstanceOf(Connection);
    expect(pSdk.notification).toBeInstanceOf(Notification);
    expect(pSdk.user).toBeInstanceOf(User);
    expect(pSdk.wallet).toBeInstanceOf(Wallet);
    expect(pSdk.configuration).toBeInstanceOf(Configuration);
    expect(pSdk.investments).toBeInstanceOf(Investments);
    expect(pSdk.getTokens()).toEqual({
      accessToken: 'oneAccessToken',
      refreshToken: 'oneRefreshToken',
    });
  });

  it('should fail to call due invalid apiUrl', () => {
    let errorThrown;
    try {
      new PillarSdk({
        apiUrl: 'localhos8080',
      });
    } catch (e) {
      errorThrown = e;
    }

    expect(errorThrown).toBeInstanceOf(Error);
  });
});
