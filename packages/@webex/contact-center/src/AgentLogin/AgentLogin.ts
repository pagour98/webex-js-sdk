import {HTTP_METHODS, WebexSDK} from '../types';

export default class AgentLogin {
  webex: WebexSDK;
  wccAPIURL: string;

  constructor(webex: WebexSDK, wccAPIURL: string) {
    this.webex = webex;
    this.wccAPIURL = wccAPIURL;
  }

  public async loginAgentWithSelectedTeam() {
    // const body = {
    //   dialNumber: this.deviceId,
    //   teamId,
    //   isExtension: true,
    //   roles: ['agent'],
    //   deviceType: 'BROWSER',
    //   deviceId: this.deviceId,
    // };

    try {
      const loginResponse = this.webex.request({
        method: HTTP_METHODS.POST,
        uri: `${this.wccAPIURL}v1/agents/login`,
        // body,
      });

      return loginResponse;
    } catch (error) {
      console.error('Error while performing agent login', error);

      return Promise.reject(new Error('Error while performing agent login', error));
    }
  }
}
