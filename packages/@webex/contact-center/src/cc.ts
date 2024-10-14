/* eslint-disable no-console */
import {WebexPlugin} from '@webex/webex-core';
import AgentProfile from './AgentProfile/AgentProfile';
import {CCConfig, IContactCenter, WebexSDK} from './types';
import {WCC_API_GATEWAY} from './constants';
import {AgentProfileResponse} from './AgentProfile/AgentProfiletypes';
import AgentLogin from './AgentLogin/AgentLogin';

export default class ContactCenter extends WebexPlugin implements IContactCenter {
  namespace = 'WebexCC';
  $config: CCConfig;
  $webex: WebexSDK;
  wccAPIURL: string;
  agentProfile: AgentProfileResponse;

  constructor(...args) {
    super(...args);
    // @ts-ignore
    this.$config = this.config;
    // @ts-ignore
    this.$webex = this.webex;
  }

  async register(success: boolean): Promise<string> {
    this.wccAPIURL = this.$webex.internal.services.get(WCC_API_GATEWAY); // Added this change for Ravi's PR, he will move this under different function if needed.
    // TODO: Mercury Subsciption code should be added as part of this function
    // TODO: Mercury Subsciption code should be added as part of this function
    // Establishing Mercury Connection here to get CI Id, which will be used by getAgentProfile method
    // to get Agent Profile by passing CI Id as a parameter.
    const ciUserId = 'dummy_uuid';
    // const orgId = '17842240-df69-4620-87d7-e48fd178f79b';
    const agentProfile = new AgentProfile(ciUserId, this.$webex, this.wccAPIURL);
    this.agentProfile = await agentProfile.getAgentProfile(ciUserId);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve('Success: Dummy data returned');
        } else {
          reject(new Error('Simulated Error'));
        }
      }, 1000);
    });
  }

  async doAgentLogin() {
    try {
      const agentLogin = new AgentLogin(this.$webex, this.wccAPIURL);
      // fetch teamId:string from UI
      await agentLogin.loginAgentWithSelectedTeam();
    } catch (error) {
      console.error('Error While Logging Agent', error);
      Promise.reject(new Error('Error While Logging Agent', error));
    }
  }

  AgentLogin(): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeoutDuration = 20000; // Define your timeout duration here (e.g., 10 seconds)

      const timeout = setTimeout(() => {
        reject(new Error('Timeout: Agent Login  did not occur within the expected time frame'));
      }, timeoutDuration);

      this.ccMercury.on('event', (event) => {
        if (event.type === 'AgentStationLoginSuccess') {
          clearTimeout(timeout); // Clear the timeout if the Agent Login Successful.
          resolve(`Success: Agent Login Success!, ${event?.data}`);
        } else {
          reject(new Error(`Failure: Agent Login Failure!`));
        }
      });
    });
  }
}
