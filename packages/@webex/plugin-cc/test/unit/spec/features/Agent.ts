import {
  STATION_LOGIN_TYPE,
  WebexSDK,
  BuddyAgentMediaType,
  BuddyAgentState,
} from '../../../../src/types';
import HttpRequest from '../../../../src/services/HttpRequest';
import AgentService from '../../../../src/services/AgentService';
import Agent from '../../../../src/features/Agent';
import {BuddyAgentsResponse, StationLoginSuccess} from '../../../../src/services/types';

jest.mock('../../../../src/services/AgentService');

describe('Agent', () => {
  let webex: WebexSDK;
  let httpRequest: HttpRequest;
  let agent: Agent;
  let agentServiceMock: jest.Mocked<AgentService>;

  beforeEach(() => {
    webex = {
      logger: {
        log: jest.fn(),
        error: jest.fn(),
      },
      internal: {
        device: {
          orgId: 'orgId',
        },
      },
    } as unknown as WebexSDK;

    httpRequest = {} as HttpRequest;
    agentServiceMock = new AgentService(webex, httpRequest) as jest.Mocked<AgentService>;
    agent = new Agent(webex, httpRequest);
    agent.agentService = agentServiceMock; // Replace the agentService with the mocked instance
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#stationLogin', () => {
    it('should successfully log in the agent', async () => {
      const options = {
        teamId: 'teamId',
        loginOption: STATION_LOGIN_TYPE.AGENT_DN,
        dialNumber: '1234567890',
      };

      const StationLoginSuccess: StationLoginSuccess = {
        eventType: 'AgentDesktopMessage',
        agentId: 'agentId',
        trackingId: 'trackingId',
        auxCodeId: 'auxCodeId',
        teamId: 'teamId',
        agentSessionId: 'agentSessionId',
        orgId: 'orgId',
        interactionIds: [],
        status: 'status',
        subStatus: 'Available',
        siteId: 'siteId',
        lastIdleCodeChangeTimestamp: Date.now(),
        lastStateChangeTimestamp: Date.now(),
        profileType: 'profileType',
        channelsMap: {},
        dialNumber: '1234567890',
        roles: [],
        supervisorSessionId: 'supervisorSessionId',
        type: 'AgentStationLoginSuccess',
      };
      agentServiceMock.stationLogin.mockResolvedValue(StationLoginSuccess);

      const result = await agent.stationLogin(options);

      expect(result).toBe(StationLoginSuccess);
      expect(agentServiceMock.stationLogin).toHaveBeenCalledWith(options);
      expect(webex.logger.log).toHaveBeenCalledWith('LOGIN API SUCCESS');
    });

    it('should handle login error', async () => {
      const options = {
        teamId: 'teamId',
        loginOption: STATION_LOGIN_TYPE.AGENT_DN,
        dialNumber: '1234567890',
      };

      const error = new Error('Login failed');
      agentServiceMock.stationLogin.mockRejectedValue(error);

      await expect(agent.stationLogin(options)).rejects.toThrow(
        'Error while performing agent login'
      );
      expect(agentServiceMock.stationLogin).toHaveBeenCalledWith(options);
      expect(webex.logger.error).toHaveBeenCalledWith(`Error during agent login: ${error}`);
    });
  });

  describe('getBuddyAgents', () => {
    const options = {
      agentProfileId: '12345',
      mediaType: 'telephony' as BuddyAgentMediaType,
      state: 'Available' as BuddyAgentState,
    };

    it('should return buddy agents on success', async () => {
      const buddyAgentsResponse: BuddyAgentsResponse = [
        {
          agentId: '12345',
          state: 'Available',
          teamId: 'abcd',
          dn: '1001',
          agentName: 'Agent1 Name1',
          siteId: 'site1',
        },
      ];
      agentServiceMock.getBuddyAgents.mockResolvedValue(buddyAgentsResponse);

      const result = await agent.getBuddyAgents(options);

      expect(result).toEqual(buddyAgentsResponse);
      expect(webex.logger.log).toHaveBeenCalledWith('Buddy Agents API SUCCESS');
      expect(agentServiceMock.getBuddyAgents).toHaveBeenCalledWith(options);
    });

    it('should throw an error when getBuddyAgents fails', async () => {
      const error = new Error('API Error');
      agentServiceMock.getBuddyAgents.mockRejectedValue(error);

      await expect(agent.getBuddyAgents(options)).rejects.toThrow(
        'Error while retrieving buddy agents'
      );
      expect(webex.logger.log).not.toHaveBeenCalled();
      expect(agentServiceMock.getBuddyAgents).toHaveBeenCalledWith(options);
    });
  });
});
