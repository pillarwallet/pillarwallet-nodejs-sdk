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
import { Wallet } from './lib/wallet';
import { Register } from './lib/register';
import { Asset } from './lib/asset';
import { Connection } from './lib/connection';
import { ConnectionV2 } from './lib/connectionV2';
import { User } from './lib/user';
import { UserV2 } from './lib/userV2';
import { Notification } from './lib/notification';
import { Configuration } from './lib/configuration';
import { Investments } from './lib/investments';
import { Badge } from './lib/badge';

import * as Ajv from 'ajv';

const pillarSdkConstructorSchema = require('../src/schemas/pillarsdk-constructor.json');

let ajv;

export class PillarSdk extends Configuration {
  investments: Investments = new Investments();
  wallet: Wallet = new Wallet();
  asset: Asset = new Asset();
  connection: Connection = new Connection();
  connectionV2: ConnectionV2 = new ConnectionV2();
  user: User = new User();
  userV2: UserV2 = new UserV2();
  notification: Notification = new Notification();
  configuration: Configuration = new Configuration();
  register: Register = new Register();
  badge: Badge = new Badge();

  /**
   * Set the SDK variables
   * @param {PillarSdkConfiguration} incomingConfiguration
   */
  constructor(incomingConfiguration: PillarSdkConfiguration) {
    super();

    ajv = new Ajv({
      allErrors: true,
    });

    require('ajv-keywords')(ajv, 'instanceof');

    const valid = ajv.validate(
      pillarSdkConstructorSchema,
      incomingConfiguration,
    );
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }

    this.initialise(incomingConfiguration);
  }
}
