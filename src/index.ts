import { Wallet } from './lib/wallet';
import { Asset } from './lib/asset';
import { Connection } from './lib/connection';
import { User } from './lib/user';
import { Notification } from './lib/notification';
import { Configuration } from './lib/configuration';
import * as Ajv from 'ajv';

const pillarSdkConstructorSchema = require('../src/schemas/pillarsdk-constructor.json');

let ajv;

export class PillarSdk extends Configuration {
  wallet: Wallet = new Wallet();
  asset: Asset = new Asset();
  connection: Connection = new Connection();
  user: User = new User();
  notification : Notification = new Notification();
  configuration: Configuration = new Configuration();

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

    const valid = ajv.validate(pillarSdkConstructorSchema, incomingConfiguration);
    if (!valid && ajv.errors) {
      throw new TypeError(ajv.errorsText(ajv.errors));
    }

    this.initialise(incomingConfiguration);
  }
}
