import {STATION_LOGIN_TYPE, WebexSDK, HTTP_METHODS} from '../types';
import {
  AGENT,
  GET_BUDDY_AGENTS_API,
  BuddyAgentsEvent,
  BuddyAgentsRetrieveFailedEvent,
  LOGIN_API,
  WCC_API_GATEWAY,
  WEB_RTC_PREFIX,
} from './constants';
import HttpRequest from './HttpRequest';
import {BuddyAgentsSuccess, BuddyAgents, StationLoginSuccess} from './types';

export default class AgentService {
  private webex: WebexSDK;
  private httpRequest: HttpRequest;

  constructor(webex: WebexSDK, httpRequest: HttpRequest) {
    this.webex = webex;
    this.httpRequest = httpRequest;
  }

  private getDeviceId(loginOption: string, dialNumber: string): string {
    if (
      loginOption === STATION_LOGIN_TYPE.EXTENSION ||
      loginOption === STATION_LOGIN_TYPE.AGENT_DN
    ) {
      return dialNumber;
    }

    return WEB_RTC_PREFIX + dialNumber;
  }

  public async stationLogin(options: {
    teamId: string;
    loginOption: string;
    dialNumber: string;
  }): Promise<StationLoginSuccess> {
    try {
      const {teamId, loginOption, dialNumber} = options;
      const payload = {
        dialNumber,
        teamId,
        isExtension: loginOption === STATION_LOGIN_TYPE.EXTENSION,
        roles: [AGENT],
        deviceType: loginOption,
        deviceId: this.getDeviceId(loginOption, dialNumber),
      };

      const data = await this.httpRequest.sendRequestWithEvent({
        service: WCC_API_GATEWAY,
        resource: LOGIN_API,
        method: HTTP_METHODS.POST,
        payload,
        eventType: 'StationLogin',
        success: ['AgentStationLoginSuccess'],
        failure: ['AgentStationLoginFailed'],
      });

      return data;
    } catch (error) {
      this.webex.logger.error(`Error during station login: ${error}`);

      return Promise.reject(error);
    }
  }

  public async getBuddyAgents(options: BuddyAgents): Promise<BuddyAgentsSuccess> {
    try {
      const data = await this.httpRequest.sendRequestWithEvent({
        service: WCC_API_GATEWAY,
        resource: GET_BUDDY_AGENTS_API,
        method: HTTP_METHODS.POST,
        payload: {
          agentProfileId: options.agentProfileId,
          mediaType: options.channelName,
          state: options.state || undefined,
        },
        eventType: BuddyAgentsEvent,
        success: [BuddyAgentsEvent],
        failure: [BuddyAgentsRetrieveFailedEvent],
      });

      return data as BuddyAgentsSuccess;
    } catch (error) {
      this.webex.logger.error(`Error during get buddy agents: ${error}`);

      return Promise.reject(new Error('Error while retrieving buddy agents', error));
    }
  }
}
