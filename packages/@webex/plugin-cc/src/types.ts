type Enum<T extends Record<string, unknown>> = T[keyof T];

// Define the HTTP_METHODS object
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

// Derive the type using the utility type
type HTTP_METHODS_TYPE = Enum<typeof HTTP_METHODS>;

type WebexRequestPayload = {
  method?: HTTP_METHODS_TYPE;
  uri?: string;
  addAuthHeader?: boolean;
  headers?: {
    [key: string]: string | null;
  };
  body?: object;
  statusCode?: number;
  json?: boolean;
};

type Listener = (e: string, data?: unknown) => void;
type ListenerOff = (e: string) => void;

type ServiceHost = {
  host: string;
  ttl: number;
  priority: number;
  id: string;
  homeCluster?: boolean;
};

export interface CCPluginConfig {
  allowMultiLogin: boolean;
  clientType: string;
  isKeepAliveEnabled: boolean;
  force: boolean;
  metrics: {
    clientName: string;
    clientType: string;
  };
  logging: {
    enable: boolean;
    verboseEvents: boolean;
  };
}

export interface WebexSDK {
  version: string;
  canAuthorize: boolean;
  credentials: {
    getUserToken: () => Promise<string>;
    getOrgId: () => Promise<string>;
  };
  ready: boolean;
  request: <T>(payload: WebexRequestPayload) => Promise<T>;
  // internal plugins
  internal: {
    mercury: {
      on: Listener;
      off: ListenerOff;
      connected: boolean;
      connecting: boolean;
    };
    device: {
      url: string;
      userId: string;
      orgId: string;
      version: string;
      callingBehavior: string;
    };
    presence: unknown;
    services: {
      _hostCatalog: Record<string, ServiceHost[]>;
      _serviceUrls: {
        mobius: string;
        identity: string;
        janus: string;
        wdm: string;
        broadworksIdpProxy: string;
        hydra: string;
        mercuryApi: string;
        'ucmgmt-gateway': string;
        contactsService: string;
      };
      get(name: string, priorityHost?: boolean, serviceGroup?: string): string;
    };
    metrics: {
      submitClientMetrics: (name: string, data: unknown) => void;
    };
  };
  // public plugins
  logger: {
    log: (payload: string) => void;
    error: (payload: string) => void;
    warn: (payload: string) => void;
    info: (payload: string) => void;
    trace: (payload: string) => void;
    debug: (payload: string) => void;
  };
}

/**
 * An interface for the `ContactCenter` class.
 * The `ContactCenter` package is designed to provide a set of APIs to perform various operations for the Agent flow within Webex Contact Center.
 */
export interface IContactCenter {
  /**
   * @ignore
   */
  $config: CCPluginConfig;
  /**
   * @ignore
   */
  $webex: WebexSDK;
  /**
   * WCC API Gateway Url
   */
  wccApiUrl: string;
  /**
   * TODO: This is a dummy function which will be modified by Ravi and he can add description as per use.
   * This will be public API used for setting up the mercury connection.
   * @param success
   */
  register(success: boolean): Promise<string>;
}
