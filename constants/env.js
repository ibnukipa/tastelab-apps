import Constants from 'expo-constants';

function getEnvironment() {
  let releaseChannel = Constants.manifest.releaseChannel;

  if (releaseChannel === undefined) {
    return { envName: 'DEVELOPMENT', baseUrl: 'https://dev3-api.development.tastelabgroup.com/api/v1' };
  }
  if (releaseChannel.indexOf('prod') !== -1) {
    return { envName: 'PRODUCTION', baseUrl: 'https://staging-api.development.tastelabgroup.com/api/v1' };
  }
  if (releaseChannel.indexOf('staging') !== -1) {
    return { envName: 'STAGING', baseUrl: 'https://dev4-api.development.tastelabgroup.com/api/v1' };
  }
}

const ENV = getEnvironment()
export default ENV
