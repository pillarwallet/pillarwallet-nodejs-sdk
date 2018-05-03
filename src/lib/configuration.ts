export class Configuration {
  public static accessKeys: PillarSdkConfiguration = {
    privateKey: '',
  };

  initialise(incomingConfiguration: PillarSdkConfiguration) {
    Configuration.accessKeys = incomingConfiguration;
  }
}
