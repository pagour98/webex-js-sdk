/* eslint-disable valid-jsdoc */
/*
 This file acts as a utility to create a mock Webex object that can be imported
 into UT. As we can see, the methods have been replaced with mock jest.fn().
 In our respective UTs, we can specify the return values of these functions
 using webex.request.mockReturnValue() or webex.request.mockReturnValueOnce().
*/
import {MediaConnectionConfig} from '@webex/internal-media-core';
import platform from 'platform';
import {MobiusServers} from './types';

const MediaSDKMock = jest.createMockFromModule<typeof import('@webex/internal-media-core')>(
  '@webex/internal-media-core'
);

/**
 * Returns a fresh copy of the webex object per call.
 */
export function getTestUtilsWebex() {
  return {
    // top level primitives/funcs
    version: '1.1.1',
    canAuthorize: true,
    credentials: {
      getUserToken: jest.fn(),
    },
    ready: true,
    request: jest.fn(),
    // internal plugins
    internal: {
      metrics: {
        submitClientMetrics: jest.fn(),
      },
      mercury: {
        on: jest.fn(),
        off: jest.fn(),
        connected: true,
        connecting: false,
      },
      calendar: null,
      device: {
        url: 'https://wdm-intb.ciscospark.com/wdm/api/v1/devices/c5ae3b86-1bb7-40f1-a6a9-c296ee7e61d5',
        deviceId: 'c5ae3b86-1bb7-40f1-a6a9-c296ee7e61d5',
        userId: '8a67806f-fc4d-446b-a131-31e71ea5b0e9',
        orgId: '1704d30d-a131-4bc7-9449-948487643793',
        version: '1',
        callingBehavior: 'NATIVE_WEBEX_TEAMS_CALLING',
        features: {
          entitlement: {
            models: [{_values: {key: 'bc-sp-standard'}}],
          },
        },
      },
      encryption: {
        decryptText: jest.fn(),
        encryptText: jest.fn(),
        kms: {
          createUnboundKeys: jest.fn(),
          createResource: jest.fn(),
          bindKey: jest.fn(),
        },
      },
      presence: jest.fn(),
      support: jest.fn(),
      services: {
        _hostCatalog: {},
        _serviceUrls: {
          mobius: 'https://mobius.aintgen-a-1.int.infra.webex.com/api/v1',
          identity: 'https://identity-b-us.webex.com',
          janus: 'https://janus-intb.ciscospark.com/janus/api/v1',
          wdm: 'https://wdm-a.wbx2.com/wdm/api/v1',
          broadworksIdpProxy: 'https://broadworks-idp-proxy-a.wbx2.com/broadworks-idp-proxy/api/v1',
          hydra: 'https://hydra-a.wbx2.com/v1/',
          mercuryApi: 'https://mercury-api-intb.ciscospark.com/v1',
          'ucmgmt-gateway': 'https://gw.telemetry.int-ucmgmt.cisco.com',
          contactsService: 'https://contacts-service-a.wbx2.com/contact/api/v1',
        },
        fetchClientRegionInfo: jest.fn(),
      },
    },
    // public plugins
    logger: {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      trace: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
    },
    messages: null,
    memberships: null,
    people: {
      list: jest.fn(),
    },
    rooms: null,
    teams: null,
  };
}

export const registration = {
  triggerRegistration: () => jest.fn(),
};

export const mediaConnection = new MediaSDKMock.RoapMediaConnection(
  {} as MediaConnectionConfig,
  {
    localTracks: {},
    direction: {
      audio: 'sendrecv',
      video: 'sendrecv',
      screenShareVideo: 'sendrecv',
    },
  },
  ''
);

/**
 * @param count - Number of Promises to flush.
 */
export const flushPromises = async (count: number): Promise<void> => {
  await Promise.all([...Array(count)].map(() => Promise.resolve()));
};

export const mockCallingClient = {
  emit: jest.fn(),
  register: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

export const getMockRequestTemplate = () => {
  return {
    headers: {
      'cisco-device-url':
        'https://wdm-intb.ciscospark.com/wdm/api/v1/devices/c5ae3b86-1bb7-40f1-a6a9-c296ee7e61d5',
      'spark-user-agent': 'webex-calling/beta',
    },
    service: 'mobius',
  };
};

export const getMobiusDiscoveryResponse = () => {
  return {
    primary: {
      region: 'US-EAST',
      uris: ['https://mobius-dfw.webex.com/api/v1'],
    },
    backup: {
      region: 'US-WEST',
      uris: ['https://mobius-sjc.webex.com/api/v1'],
    },
  } as MobiusServers;
};

/**
 * Returns a mocked deviceInfo object.
 */
export const getMockDeviceInfo = () => {
  return {
    device: {
      deviceId: 'beb3c025-8c6a-3c44-8f3d-9b7d65363ac1',
      uri: 'https://mobius.aintgen-a-1.int.infra.webex.com/api/v1/calling/web/devices/beb3c025-8c6a-3c44-8f3d-9b7d65363ac1',
      status: 'active',
      lastSeen: '2022-04-05T05:08:46Z',
      addresses: ['sip:pbs9p4cbr9_G6JJNI5DD5NP@64941297.int10.bcld.webex.com'],
      clientDeviceUri: 'https://clientDeviceUrl',
    },
  };
};

/**
 * Returns a sample SCIM response object.
 */
export const getSampleScimResponse = () => {
  const sampleAvatar =
    'https://avatar-int-us-east-1.webexcontent.com/Avtr~V1~1704d30d-a131-4bc7-9449-948487643793/V1~bf911e86a1561896d7d0053b46a8d0c9ed82a7bc434a1f84621c2c45cc825f37~3720694b1e4340818a3d12d70eb2b6e1~80';

  return {
    totalResults: '1',
    itemsPerPage: '1',
    startIndex: '1',
    schemas: ['urn:scim:schemas:core:1.0', 'urn:scim:schemas:extension:cisco:commonidentity:1.0'],
    Resources: [
      {
        userName: 'atlas.test.wxcwebrtc+user8@gmail.com',
        emails: [
          {
            primary: true,
            type: 'work',
            value: 'atlas.test.wxcwebrtc+user8@gmail.com',
          },
        ],
        name: {
          givenName: 'Cathy',
          familyName: 'James',
        },
        phoneNumbers: [
          {
            primary: false,
            type: 'personal',
            value: '5009',
          },
          {
            primary: true,
            type: 'work',
            value: '5008',
          },
        ],
        entitlements: [
          'basic-meeting',
          'basic-message',
          'bc-sp-standard',
          'screen-share',
          'spark',
          'spark-test-account',
          'squared-call-initiation',
          'webex-squared',
        ],
        cisSyncSource: 'SCIM',
        photos: [
          {
            type: 'photo',
            value: sampleAvatar,
          },
          {
            type: 'thumbnail',
            value: sampleAvatar,
          },
        ],
        id: '652fe0c7-05ce-4acd-8bda-9a080830187f',
        meta: {
          created: '2022-03-16T16:13:53.847Z',
          lastModified: '2022-05-31T14:39:12.782Z',
          lastLoginTime: '2022-05-31T14:39:12.780Z',
          version: 'W/"66025591113"',
          location:
            'https://identitybts.webex.com/identity/scim/1704d30d-a131-4bc7-9449-948487643793/v1/Users/652fe0c7-05ce-4acd-8bda-9a080830187f',
          organizationID: '1704d30d-a131-4bc7-9449-948487643793',
          creator: '97fe25e3-d3e8-400e-856b-5b0cd5b0c790',
          modifier: '8c7abf2f-0c8e-49cf-b8e4-693d4ec7daee',
        },
        displayName: 'Cathy',
        active: true,
        licenseID: ['BCSTD_8c81f40c-e848-484e-8ca8-0fb6dabc75a5'],
        userSettings: ['{"spark.signUpDate":"1648547902173"}', '{"user-origin":"admin-invited"}'],
        sipAddresses: [
          {
            type: 'cloud-calling',
            value: 'atlas.test.wxcwebrtc+user8@webrtcmobius.call.wbx2.com',
            primary: true,
          },
        ],
        isTeamsOnJabberEnabled: false,
        isUCCallOnJabberEnabled: false,
        userType: 'user',
        mfaEnabled: false,
        teamsClusterId: 'urn:TEAM:us-east-1_int13',
      },
    ],
  };
};

/**
 * Returns a sample people list response object.
 */
export const getSamplePeopleListResponse = () => {
  // cSpell:disable
  return {
    notFoundIds: null,
    items: [
      {
        id: 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS9iODUzYmJkMS0xMTM2LTRkMjUtOTM4ZC0wYzM3NTMxYjEyMzM',
        emails: ['atlas.test.wxcwebrtc+user2@gmail.com'],
        phoneNumbers: [
          {type: 'work', value: '+12142865899'},
          {type: 'work', value: '+12142865890'},
        ],
        displayName: 'Krishna Kumar Rai',
        nickName: 'Krishna Kumar',
        firstName: 'Krishna Kumar',
        lastName: 'Rai',
        avatar:
          'https://avatar-int-us-east-1.webexcontent.com/Avtr~V1~1704d30d-a131-4bc7-9449-948487643793/V1~63bb91536457f9b7d88739ae7cf78515800e468e0a4b59491b9c85b174c26eec~f10e91b5c0c0465ca8098f075ddec0b8~1600',
        orgId:
          'Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8xNzA0ZDMwZC1hMTMxLTRiYzctOTQ0OS05NDg0ODc2NDM3OTM',
        created: '2022-03-16T14:07:21.266Z',
        lastModified: '2023-01-16T11:10:40.693Z',
        lastActivity: '2023-01-27T08:21:06.988Z',
        status: 'inactive',
        type: 'person',
      },
    ],
  };
  // cSpell:enable
};

/**
 * Returns webrtc stats in raw and parsed format
 * statsWithVoOneWayDelayAndNw: raw & parsed,
 * statsWithoutVoOneWayDelayAndNw: raw & parsed.
 */
export const getSampleRawAndParsedMediaStats = () => {
  return {
    statsWithVoOneWayDelayAndNw: {
      raw: [
        {
          id: 'CF83:C5:E4:93:FE:3B:4A:A4:34:F3:E7:84:80:2A:A6:1F:BF:CA:AE:48:98:5F:9E:14:32:8E:EC:7E:FA:EB:71:D9',
          timestamp: 1680187470045.045,
          type: 'certificate',
          fingerprint:
            '83:C5:E4:93:FE:3B:4A:A4:34:F3:E7:84:80:2A:A6:1F:BF:CA:AE:48:98:5F:9E:14:32:8E:EC:7E:FA:EB:71:D9',
          fingerprintAlgorithm: 'sha-256',
          base64Certificate:
            'MIIBFTCBvKADAgECAgg7QZ5hqSYvvjAKBggqhkjOPQQDAjARMQ8wDQYDVQQDDAZXZWJSVEMwHhcNMjMwMzI5MTQ0NDAzWhcNMjMwNDI5MTQ0NDAzWjARMQ8wDQYDVQQDDAZXZWJSVEMwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQmOwLsh05ty2dg9Z4lMP0eGKOEXiYK0aD7R6t9ZhmQGsnXOoJo6uI9PPep6KtwXu8gmsNgpWCFXchYqCXUc9XLMAoGCCqGSM49BAMCA0gAMEUCIAzhwwwBNgeoGDdmuP+E6bxa+jPCpUNxAojCvva483GQAiEAm1sV7ObKt0SWAxzYk4hBw3anywSTUb/mRmrqpctykPU=',
        },
        {
          id: 'CFE6:62:7C:70:64:BA:49:37:F7:66:64:53:B7:80:14:DC:03:D0:70:E2',
          timestamp: 1680187470045.045,
          type: 'certificate',
          fingerprint: 'E6:62:7C:70:64:BA:49:37:F7:66:64:53:B7:80:14:DC:03:D0:70:E2',
          fingerprintAlgorithm: 'sha-1',
          base64Certificate:
            'MIIBrTCCAVMCAQEwCQYHKoZIzj0EATBjMQswCQYDVQQGEwJYWDEcMBoGA1UECgwTRGVmYXVsdCBDb21wYW55IEx0ZDE2MDQGA1UEAwwtbWVkaWEtcG9vbDAud2Rmd3d4Yy1pbnQtMi5pbnQuaW5mcmEud2ViZXguY29tMB4XDTIzMDMzMDEyMDg1M1oXDTMzMDMyNzEyMDg1M1owYzELMAkGA1UEBhMCWFgxHDAaBgNVBAoME0RlZmF1bHQgQ29tcGFueSBMdGQxNjA0BgNVBAMMLW1lZGlhLXBvb2wwLndkZnd3eGMtaW50LTIuaW50LmluZnJhLndlYmV4LmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABLxQbeY82wxCshXKWPfwPAD3aDF2oA5yvHnXAWBGHSO+yIqyEb5gOpoTgDNNrWerEQmjZQ0FeFAWv062KTS9FOIwCQYHKoZIzj0EAQNJADBGAiEA23zp5TJYq5OXFfOEc3ds0LHDyt7KQCLTItBJgXKik9oCIQCCA0qyNKx1v+AOtnkgDbBFjVArLF/5Sd3TIXMgc4VsnA==',
        },
        {
          id: 'CIT01_111_minPtime=10;useInbandFec=1',
          timestamp: 1680187470045.045,
          type: 'codec',
          transportId: 'T01',
          payloadType: 111,
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
          sdpFmtpLine: 'minPtime=10;useInbandFec=1',
        },
        {
          id: 'COT01_111_minPtime=10;useInbandFec=1',
          timestamp: 1680187470045.045,
          type: 'codec',
          transportId: 'T01',
          payloadType: 111,
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
          sdpFmtpLine: 'minPtime=10;useInbandFec=1',
        },
        {
          id: 'RTCIceCandidatePair_CPg7Va+n9f_xvQ5iqnX',
          timestamp: 1680187470045.045,
          type: 'candidate-pair',
          transportId: 'T01',
          localCandidateId: 'RTCIceCandidate_Ig7Va+n9f',
          remoteCandidateId: 'IxvQ5iqnX',
          state: 'succeeded',
          priority: 9114756780671369000,
          nominated: true,
          writable: true,
          packetsSent: 1036,
          packetsReceived: 1015,
          bytesSent: 103064,
          bytesReceived: 100460,
          totalRoundTripTime: 3.611,
          currentRoundTripTime: 0.303,
          availableOutgoingBitrate: 300000,
          requestsReceived: 0,
          requestsSent: 12,
          responsesReceived: 12,
          responsesSent: 0,
          consentRequestsSent: 9,
          packetsDiscardedOnSend: 0,
          bytesDiscardedOnSend: 0,
        },
        {
          id: 'DEPRECATED_S_default',
          timestamp: 1680187470045.045,
          type: 'stream',
          streamIdentifier: 'default',
          trackIds: ['DEPRECATED_TI2'],
        },
        {
          id: 'DEPRECATED_TI2',
          timestamp: 1680187470045.045,
          type: 'track',
          trackIdentifier: '22012ddf-1185-4f85-978c-b71bcabe347e',
          remoteSource: true,
          ended: false,
          detached: false,
          kind: 'audio',
          jitterBufferDelay: 84508.8,
          jitterBufferEmittedCount: 958080,
          audioLevel: 0.004272591326639607,
          totalAudioEnergy: 0.6976435552354842,
          totalSamplesReceived: 987200,
          totalSamplesDuration: 21.480000000000558,
          concealedSamples: 27623,
          silentConcealedSamples: 21400,
          concealmentEvents: 8,
          insertedSamplesForDeceleration: 3844,
          removedSamplesForAcceleration: 2129,
        },
        {
          id: 'DEPRECATED_TO1',
          timestamp: 1680187470045.045,
          type: 'track',
          trackIdentifier: '1fc9f3fc-358e-4434-ba18-10b89e8a118f',
          mediaSourceId: 'SA1',
          remoteSource: false,
          ended: false,
          detached: false,
          kind: 'audio',
          echoReturnLoss: 13.656129837036133,
          echoReturnLossEnhancement: 7.137247085571289,
        },
        {
          id: 'DEPRECATED_VO1',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'vpn',
          ip: '10.227.211.139',
          address: '10.227.211.139',
          port: 9,
          protocol: 'tcp',
          candidateType: 'host',
          priority: 1518214911,
          foundation: '2654339674',
          usernameFragment: 'V+QJ',
          tcpType: 'active',
        },
        {
          id: 'IKm2fnMou',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'wifi',
          ip: '192.168.1.65',
          address: '192.168.1.65',
          port: 9,
          protocol: 'tcp',
          candidateType: 'host',
          priority: 1518280447,
          foundation: '1437462698',
          usernameFragment: 'V+QJ',
          tcpType: 'active',
        },
        {
          id: 'IT01A1746541880',
          timestamp: 1680187470045.045,
          type: 'inbound-rtp',
          ssrc: 1746541880,
          kind: 'audio',
          trackId: 'DEPRECATED_TI2',
          transportId: 'T01',
          codecId: 'CIT01_111_minPtime=10;useInbandFec=1',
          mediaType: 'audio',
          jitter: 0.008,
          packetsLost: 3,
          trackIdentifier: '22012ddf-1185-4f85-978c-b71bcabe347e',
          mid: '0',
          remoteId: 'ROA1746541880',
          packetsReceived: 1003,
          packetsDiscarded: 0,
          fecPacketsReceived: 0,
          fecPacketsDiscarded: 0,
          bytesReceived: 76880,
          headerBytesReceived: 12036,
          lastPacketReceivedTimestamp: 1680187470035,
          jitterBufferDelay: 84508.8,
          jitterBufferTargetDelay: 92793.6,
          jitterBufferMinimumDelay: 92640,
          jitterBufferEmittedCount: 958080,
          totalSamplesReceived: 987200,
          concealedSamples: 27623,
          silentConcealedSamples: 21400,
          concealmentEvents: 8,
          insertedSamplesForDeceleration: 3844,
          removedSamplesForAcceleration: 2129,
          audioLevel: 0.004272591326639607,
          totalAudioEnergy: 0.6976435552354842,
          totalSamplesDuration: 21.480000000000558,
        },
        {
          id: 'IUzJLjNLE',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'wifi',
          ip: '192.168.1.65',
          address: '192.168.1.65',
          port: 58574,
          protocol: 'udp',
          candidateType: 'host',
          priority: 2122260223,
          foundation: '727847474',
          usernameFragment: 'V+QJ',
        },
        {
          id: 'RTCIceCandidate_Ig7Va+n9f',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'vpn',
          ip: '10.227.211.139',
          address: '10.227.211.139',
          port: 64898,
          protocol: 'udp',
          candidateType: 'host',
          priority: 2122194687,
          foundation: '3774472386',
          usernameFragment: 'V+QJ',
        },
        {
          id: 'IxvQ5iqnX',
          timestamp: 1680187470045.045,
          type: 'remote-candidate',
          transportId: 'T01',
          isRemote: true,
          ip: '207.182.171.180',
          address: '207.182.171.180',
          port: 19608,
          protocol: 'udp',
          candidateType: 'host',
          priority: 2130706431,
          foundation: 'mse',
          usernameFragment: 'S3cv',
        },
        {
          id: 'OT01A2728789632',
          timestamp: 1680187470045.045,
          type: 'outbound-rtp',
          ssrc: 2728789632,
          kind: 'audio',
          trackId: 'DEPRECATED_TO1',
          transportId: 'T01',
          codecId: 'COT01_111_minPtime=10;useInbandFec=1',
          mediaType: 'audio',
          mediaSourceId: 'SA1',
          remoteId: 'RIA2728789632',
          mid: '0',
          packetsSent: 1026,
          retransmittedPacketsSent: 0,
          bytesSent: 79294,
          headerBytesSent: 12312,
          retransmittedBytesSent: 0,
          targetBitrate: 32000,
          nackCount: 0,
          active: true,
        },
        {
          id: 'P',
          timestamp: 1680187470045.045,
          type: 'peer-connection',
          dataChannelsOpened: 0,
          dataChannelsClosed: 0,
        },
        {
          id: 'RIA2728789632',
          timestamp: 1680187469719,
          type: 'remote-inbound-rtp',
          ssrc: 2728789632,
          kind: 'audio',
          transportId: 'T01',
          codecId: 'COT01_111_minPtime=10;useInbandFec=1',
          jitter: 0.0055625,
          packetsLost: 0,
          localId: 'OT01A2728789632',
          roundTripTime: 0.665,
          fractionLost: 0,
          totalRoundTripTime: 2.509,
          roundTripTimeMeasurements: 4,
        },
        {
          id: 'ROA1746541880',
          timestamp: 1680187467829,
          type: 'remote-outbound-rtp',
          ssrc: 1746541880,
          kind: 'audio',
          transportId: 'T01',
          codecId: 'CIT01_111_minPtime=10;useInbandFec=1',
          packetsSent: 895,
          bytesSent: 68669,
          localId: 'IT01A1746541880',
          remoteTimestamp: 1680187467378,
          reportsSent: 5,
          roundTripTimeMeasurements: 0,
          totalRoundTripTime: 0,
        },
        {
          id: 'SA1',
          timestamp: 1680187470045.045,
          type: 'media-source',
          trackIdentifier: '1fc9f3fc-358e-4434-ba18-10b89e8a118f',
          kind: 'audio',
          audioLevel: 0.006469924008911405,
          totalAudioEnergy: 0.7681144799128602,
          totalSamplesDuration: 26.650000000001366,
          echoReturnLoss: 13.656129837036133,
          echoReturnLossEnhancement: 7.137247085571289,
        },
        {
          id: 'T01',
          timestamp: 1680187470045.045,
          type: 'transport',
          bytesSent: 103064,
          packetsSent: 1036,
          bytesReceived: 100460,
          packetsReceived: 1015,
          dtlsState: 'connected',
          selectedCandidatePairId: 'RTCIceCandidatePair_CPg7Va+n9f_xvQ5iqnX',
          localCertificateId:
            'CF83:C5:E4:93:FE:3B:4A:A4:34:F3:E7:84:80:2A:A6:1F:BF:CA:AE:48:98:5F:9E:14:32:8E:EC:7E:FA:EB:71:D9',
          remoteCertificateId: 'CFE6:62:7C:70:64:BA:49:37:F7:66:64:53:B7:80:14:DC:03:D0:70:E2',
          tlsVersion: 'tls1.2',
          dtlsCipher: 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
          dtlsRole: 'client',
          srtpCipher: 'AES_CM_128_HMAC_SHA1_80',
          selectedCandidatePairChanges: 1,
          iceRole: 'controlling',
          iceLocalUsernameFragment: 'V+QJ',
          iceState: 'connected',
        },
      ],
      parsed: {
        'rtp-rxstat': {
          LostPkt: 3,
          Pkt: 1003,
          LatePkt: 0,
          Oct: 76880,
          Dur: 26.650000000001366,
          AvgJit: 0.08820641282565131,
          VQMetrics: {
            maxJitter: 0,
            VoPktSizeMs: 20,
            VoOneWayDelayMs: 0.313625,
            hwType: `${platform.os}/${platform.name}-${platform.version}`,
            networkType: 'vpn',
            VoRxCodec: 'opus',
          },
        },
        'rtp-txstat': {
          Pkt: 1026,
          Oct: 79294,
          Dur: 26.650000000001366,
          VQMetrics: {VoTxCodec: 'opus', rtpBitRate: 32000},
        },
      },
    },
    statsWithoutVoOneWayDelayAndNw: {
      raw: [
        {
          id: 'CF83:C5:E4:93:FE:3B:4A:A4:34:F3:E7:84:80:2A:A6:1F:BF:CA:AE:48:98:5F:9E:14:32:8E:EC:7E:FA:EB:71:D9',
          timestamp: 1680187470045.045,
          type: 'certificate',
          fingerprint:
            '83:C5:E4:93:FE:3B:4A:A4:34:F3:E7:84:80:2A:A6:1F:BF:CA:AE:48:98:5F:9E:14:32:8E:EC:7E:FA:EB:71:D9',
          fingerprintAlgorithm: 'sha-256',
          base64Certificate:
            'MIIBFTCBvKADAgECAgg7QZ5hqSYvvjAKBggqhkjOPQQDAjARMQ8wDQYDVQQDDAZXZWJSVEMwHhcNMjMwMzI5MTQ0NDAzWhcNMjMwNDI5MTQ0NDAzWjARMQ8wDQYDVQQDDAZXZWJSVEMwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQmOwLsh05ty2dg9Z4lMP0eGKOEXiYK0aD7R6t9ZhmQGsnXOoJo6uI9PPep6KtwXu8gmsNgpWCFXchYqCXUc9XLMAoGCCqGSM49BAMCA0gAMEUCIAzhwwwBNgeoGDdmuP+E6bxa+jPCpUNxAojCvva483GQAiEAm1sV7ObKt0SWAxzYk4hBw3anywSTUb/mRmrqpctykPU=',
        },
        {
          id: 'CFE6:62:7C:70:64:BA:49:37:F7:66:64:53:B7:80:14:DC:03:D0:70:E2',
          timestamp: 1680187470045.045,
          type: 'certificate',
          fingerprint: 'E6:62:7C:70:64:BA:49:37:F7:66:64:53:B7:80:14:DC:03:D0:70:E2',
          fingerprintAlgorithm: 'sha-1',
          base64Certificate:
            'MIIBrTCCAVMCAQEwCQYHKoZIzj0EATBjMQswCQYDVQQGEwJYWDEcMBoGA1UECgwTRGVmYXVsdCBDb21wYW55IEx0ZDE2MDQGA1UEAwwtbWVkaWEtcG9vbDAud2Rmd3d4Yy1pbnQtMi5pbnQuaW5mcmEud2ViZXguY29tMB4XDTIzMDMzMDEyMDg1M1oXDTMzMDMyNzEyMDg1M1owYzELMAkGA1UEBhMCWFgxHDAaBgNVBAoME0RlZmF1bHQgQ29tcGFueSBMdGQxNjA0BgNVBAMMLW1lZGlhLXBvb2wwLndkZnd3eGMtaW50LTIuaW50LmluZnJhLndlYmV4LmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABLxQbeY82wxCshXKWPfwPAD3aDF2oA5yvHnXAWBGHSO+yIqyEb5gOpoTgDNNrWerEQmjZQ0FeFAWv062KTS9FOIwCQYHKoZIzj0EAQNJADBGAiEA23zp5TJYq5OXFfOEc3ds0LHDyt7KQCLTItBJgXKik9oCIQCCA0qyNKx1v+AOtnkgDbBFjVArLF/5Sd3TIXMgc4VsnA==',
        },
        {
          id: 'CIT01_111_minPtime=10;useInbandFec=1',
          timestamp: 1680187470045.045,
          type: 'codec',
          transportId: 'T01',
          payloadType: 111,
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
          sdpFmtpLine: 'minPtime=10;useInbandFec=1',
        },
        {
          id: 'COT01_111_minPtime=10;useInbandFec=1',
          timestamp: 1680187470045.045,
          type: 'codec',
          transportId: 'T01',
          payloadType: 111,
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
          sdpFmtpLine: 'minPtime=10;useInbandFec=1',
        },
        {
          id: 'CPg7Va+n9f_xvQ5iqnX',
          timestamp: 1680187470045.045,
          type: 'candidate-pair',
          transportId: 'T01',
          localCandidateId: 'Ig7Va+n9f',
          remoteCandidateId: 'IxvQ5iqnX',
          state: 'succeeded',
          priority: 9114756780671369000,
          nominated: true,
          writable: true,
          packetsSent: 1036,
          packetsReceived: 1015,
          bytesSent: 103064,
          bytesReceived: 100460,
          totalRoundTripTime: 3.611,
          currentRoundTripTime: 0.303,
          availableOutgoingBitrate: 300000,
          requestsReceived: 0,
          requestsSent: 12,
          responsesReceived: 12,
          responsesSent: 0,
          consentRequestsSent: 9,
          packetsDiscardedOnSend: 0,
          bytesDiscardedOnSend: 0,
        },
        {
          id: 'DEPRECATED_S_default',
          timestamp: 1680187470045.045,
          type: 'stream',
          streamIdentifier: 'default',
          trackIds: ['DEPRECATED_TI2'],
        },
        {
          id: 'DEPRECATED_TI2',
          timestamp: 1680187470045.045,
          type: 'track',
          trackIdentifier: '22012ddf-1185-4f85-978c-b71bcabe347e',
          remoteSource: true,
          ended: false,
          detached: false,
          kind: 'audio',
          jitterBufferDelay: 84508.8,
          jitterBufferEmittedCount: 958080,
          audioLevel: 0.004272591326639607,
          totalAudioEnergy: 0.6976435552354842,
          totalSamplesReceived: 987200,
          totalSamplesDuration: 21.480000000000558,
          concealedSamples: 27623,
          silentConcealedSamples: 21400,
          concealmentEvents: 8,
          insertedSamplesForDeceleration: 3844,
          removedSamplesForAcceleration: 2129,
        },
        {
          id: 'DEPRECATED_TO1',
          timestamp: 1680187470045.045,
          type: 'track',
          trackIdentifier: '1fc9f3fc-358e-4434-ba18-10b89e8a118f',
          mediaSourceId: 'SA1',
          remoteSource: false,
          ended: false,
          detached: false,
          kind: 'audio',
          echoReturnLoss: 13.656129837036133,
          echoReturnLossEnhancement: 7.137247085571289,
        },
        {
          id: 'DEPRECATED_VO1',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'vpn',
          ip: '10.227.211.139',
          address: '10.227.211.139',
          port: 9,
          protocol: 'tcp',
          candidateType: 'host',
          priority: 1518214911,
          foundation: '2654339674',
          usernameFragment: 'V+QJ',
          tcpType: 'active',
        },
        {
          id: 'IKm2fnMou',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'wifi',
          ip: '192.168.1.65',
          address: '192.168.1.65',
          port: 9,
          protocol: 'tcp',
          candidateType: 'host',
          priority: 1518280447,
          foundation: '1437462698',
          usernameFragment: 'V+QJ',
          tcpType: 'active',
        },
        {
          id: 'IT01A1746541880',
          timestamp: 1680187470045.045,
          type: 'inbound-rtp',
          ssrc: 1746541880,
          kind: 'audio',
          trackId: 'DEPRECATED_TI2',
          transportId: 'T01',
          codecId: 'CIT01_111_minPtime=10;useInbandFec=1',
          mediaType: 'audio',
          jitter: 0.008,
          packetsLost: 3,
          trackIdentifier: '22012ddf-1185-4f85-978c-b71bcabe347e',
          mid: '0',
          remoteId: 'ROA1746541880',
          packetsReceived: 1003,
          packetsDiscarded: 0,
          fecPacketsReceived: 0,
          fecPacketsDiscarded: 0,
          bytesReceived: 76880,
          headerBytesReceived: 12036,
          lastPacketReceivedTimestamp: 1680187470035,
          jitterBufferDelay: 84508.8,
          jitterBufferTargetDelay: 92793.6,
          jitterBufferMinimumDelay: 92640,
          jitterBufferEmittedCount: 958080,
          totalSamplesReceived: 987200,
          concealedSamples: 27623,
          silentConcealedSamples: 21400,
          concealmentEvents: 8,
          insertedSamplesForDeceleration: 3844,
          removedSamplesForAcceleration: 2129,
          audioLevel: 0.004272591326639607,
          totalAudioEnergy: 0.6976435552354842,
          totalSamplesDuration: 21.480000000000558,
        },
        {
          id: 'IUzJLjNLE',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'wifi',
          ip: '192.168.1.65',
          address: '192.168.1.65',
          port: 58574,
          protocol: 'udp',
          candidateType: 'host',
          priority: 2122260223,
          foundation: '727847474',
          usernameFragment: 'V+QJ',
        },
        {
          id: 'Ig7Va+n9f',
          timestamp: 1680187470045.045,
          type: 'local-candidate',
          transportId: 'T01',
          isRemote: false,
          networkType: 'vpn',
          ip: '10.227.211.139',
          address: '10.227.211.139',
          port: 64898,
          protocol: 'udp',
          candidateType: 'host',
          priority: 2122194687,
          foundation: '3774472386',
          usernameFragment: 'V+QJ',
        },
        {
          id: 'IxvQ5iqnX',
          timestamp: 1680187470045.045,
          type: 'remote-candidate',
          transportId: 'T01',
          isRemote: true,
          ip: '207.182.171.180',
          address: '207.182.171.180',
          port: 19608,
          protocol: 'udp',
          candidateType: 'host',
          priority: 2130706431,
          foundation: 'mse',
          usernameFragment: 'S3cv',
        },
        {
          id: 'OT01A2728789632',
          timestamp: 1680187470045.045,
          type: 'outbound-rtp',
          ssrc: 2728789632,
          kind: 'audio',
          trackId: 'DEPRECATED_TO1',
          transportId: 'T01',
          codecId: 'COT01_111_minPtime=10;useInbandFec=1',
          mediaType: 'audio',
          mediaSourceId: 'SA1',
          remoteId: 'RIA2728789632',
          mid: '0',
          packetsSent: 1026,
          retransmittedPacketsSent: 0,
          bytesSent: 79294,
          headerBytesSent: 12312,
          retransmittedBytesSent: 0,
          targetBitrate: 32000,
          nackCount: 0,
          active: true,
        },
        {
          id: 'P',
          timestamp: 1680187470045.045,
          type: 'peer-connection',
          dataChannelsOpened: 0,
          dataChannelsClosed: 0,
        },
        {
          id: 'RIA2728789632',
          timestamp: 1680187469719,
          type: 'remote-inbound-rtp',
          ssrc: 2728789632,
          kind: 'audio',
          transportId: 'T01',
          codecId: 'COT01_111_minPtime=10;useInbandFec=1',
          jitter: 0.0055625,
          packetsLost: 0,
          localId: 'OT01A2728789632',
          roundTripTime: 0.665,
          fractionLost: 0,
          totalRoundTripTime: 2.509,
          roundTripTimeMeasurements: 0,
        },
        {
          id: 'ROA1746541880',
          timestamp: 1680187467829,
          type: 'remote-outbound-rtp',
          ssrc: 1746541880,
          kind: 'audio',
          transportId: 'T01',
          codecId: 'CIT01_111_minPtime=10;useInbandFec=1',
          packetsSent: 895,
          bytesSent: 68669,
          localId: 'IT01A1746541880',
          remoteTimestamp: 1680187467378,
          reportsSent: 5,
          roundTripTimeMeasurements: 0,
          totalRoundTripTime: 0,
        },
        {
          id: 'SA1',
          timestamp: 1680187470045.045,
          type: 'media-source',
          trackIdentifier: '1fc9f3fc-358e-4434-ba18-10b89e8a118f',
          kind: 'audio',
          audioLevel: 0.006469924008911405,
          totalAudioEnergy: 0.7681144799128602,
          totalSamplesDuration: 26.650000000001366,
          echoReturnLoss: 13.656129837036133,
          echoReturnLossEnhancement: 7.137247085571289,
        },
        {
          id: 'T01',
          timestamp: 1680187470045.045,
          type: 'transport',
          bytesSent: 103064,
          packetsSent: 1036,
          bytesReceived: 100460,
          packetsReceived: 1015,
          dtlsState: 'connected',
          selectedCandidatePairId: 'CPg7Va+n9f_xvQ5iqnX',
          localCertificateId:
            'CF83:C5:E4:93:FE:3B:4A:A4:34:F3:E7:84:80:2A:A6:1F:BF:CA:AE:48:98:5F:9E:14:32:8E:EC:7E:FA:EB:71:D9',
          remoteCertificateId: 'CFE6:62:7C:70:64:BA:49:37:F7:66:64:53:B7:80:14:DC:03:D0:70:E2',
          tlsVersion: 'tls1.2',
          dtlsCipher: 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
          dtlsRole: 'client',
          srtpCipher: 'AES_CM_128_HMAC_SHA1_80',
          selectedCandidatePairChanges: 1,
          iceRole: 'controlling',
          iceLocalUsernameFragment: 'V+QJ',
          iceState: 'connected',
        },
      ],
      parsed: {
        'rtp-rxstat': {
          LostPkt: 3,
          Pkt: 1003,
          LatePkt: 0,
          Oct: 76880,
          Dur: 26.650000000001366,
          AvgJit: 0.08820641282565131,
          VQMetrics: {
            maxJitter: 0,
            VoPktSizeMs: 20,
            VoOneWayDelayMs: 0,
            hwType: `${platform.os}/${platform.name}-${platform.version}`,
            networkType: undefined,
            VoRxCodec: 'opus',
          },
        },
        'rtp-txstat': {
          Pkt: 1026,
          Oct: 79294,
          Dur: 26.650000000001366,
          VQMetrics: {VoTxCodec: 'opus', rtpBitRate: 32000},
        },
      },
    },
  };
};
