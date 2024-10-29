import {STATION_LOGIN_TYPE, WebexSDK, HTTP_METHODS} from '../types';
import {
  AGENT,
  GET_BUDDY_AGENTS_API,
  GET_BUDDY_AGENTS_EVENT,
  GET_BUDDY_AGENTS_FAILED_EVENT,
  GET_BUDDY_AGENTS_SUCCESS_EVENT,
  LOGIN_API,
  WCC_API_GATEWAY,
  WEB_RTC_PREFIX,
} from './constants';
import HttpRequest from './HttpRequest';
import {
  BuddyAgentsEvent,
  BuddyAgentsResponse,
  GetBuddyAgentsOptions,
  StationLoginSuccess,
} from './types';

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

  public async getBuddyAgents(options: GetBuddyAgentsOptions): Promise<BuddyAgentsResponse> {
    try {
      const {agentProfileId, mediaType, state} = options;
      const payload = {
        agentProfileId,
        mediaType,
        state,
      };

      const data = await this.httpRequest.sendRequestWithEvent({
        service: WCC_API_GATEWAY,
        resource: GET_BUDDY_AGENTS_API,
        method: HTTP_METHODS.POST,
        payload,
        eventType: GET_BUDDY_AGENTS_EVENT,
        success: [GET_BUDDY_AGENTS_SUCCESS_EVENT],
        failure: [GET_BUDDY_AGENTS_FAILED_EVENT],
      });

      return (data as BuddyAgentsEvent).agentList;
    } catch (error) {
      this.webex.logger.error(`Error during get buddy agents: ${error}`);

      return Promise.reject(new Error('Error while retrieving buddy agents', error));
    }
  }
}
