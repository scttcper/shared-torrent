export interface TorrentClient {
  config: TorrentClientConfig;
  state: TorrentClientState;
  /**
   * Create a new client instance from an existing state.
   */
  createFromState(config: TorrentClientConfig, state: TorrentClientState): TorrentClient;
  /**
   * Export the current state of the client. Can be restored with `createFromState`.
   */
  exportState(): TorrentClientState;
  /**
   * Returns all torrent data. Data has been normalized
   */
  getAllData(): Promise<AllClientData>;
  getTorrent(id: any): Promise<NormalizedTorrent>;
  pauseTorrent(id: any): Promise<unknown>;
  resumeTorrent(id: any): Promise<unknown>;
  removeTorrent(id: any, removeData?: boolean): Promise<unknown>;
  queueUp(id: any): Promise<unknown>;
  queueDown(id: any): Promise<unknown>;
  addTorrent(torrent: string | Uint8Array, options?: any): Promise<unknown>;
  normalizedAddTorrent(
    torrent: string | Uint8Array,
    options?: Partial<AddTorrentOptions>,
  ): Promise<NormalizedTorrent>;
}

/**
 * A JSON serializable object that stores the state of the client.
 */
export interface TorrentClientState {
  /**
   * Authentication credentials
   */
  auth?: Record<string, unknown>;
  /**
   * Client version information
   */
  version?: Record<string, unknown>;
}

export interface TorrentClientConfig {
  /**
   * ex - `http://localhost:4444/
   */
  baseUrl: string;
  /**
   * ex - `'/json'`
   */
  path?: string;
  username?: string;
  password?: string;
  /**
   * Pass proxy agent to ofetch
   * Only supported in Node.js >= 18 using undici
   *
   * @see https://undici.nodejs.org/#/docs/api/Dispatcher
   * @link https://github.com/unjs/ofetch#%EF%B8%8F-adding-https-agent
   */
  dispatcher?: InstanceType<typeof import('undici').Dispatcher>;
  /**
   * global request timeout
   * @link https://github.com/unjs/ofetch#%EF%B8%8F-timeout
   */
  timeout?: number;
}

/**
 * @deprecated Use `TorrentClientConfig` instead.
 */
export type TorrentSettings = TorrentClientConfig;

export enum TorrentState {
  downloading = 'downloading',
  seeding = 'seeding',
  paused = 'paused',
  queued = 'queued',
  checking = 'checking',
  warning = 'warning',
  error = 'error',
  unknown = 'unknown',
}

export interface Label {
  id: string;
  name: string;
  count: number;
}

export interface NormalizedTorrent {
  /**
   * torrent hash id
   */
  id: string;
  /**
   * torrent name
   */
  name: string;
  /**
   * progress percent out of 100
   */
  progress: number;
  isCompleted: boolean;
  /**
   * 1:1 is 1, half seeded is 0.5
   */
  ratio: number;
  /**
   * date as iso string
   */
  dateAdded: string;
  /**
   * date completed as iso string;
   */
  dateCompleted?: string;
  savePath: string;
  /**
   * Sometimes called "Category", other times called label
   */
  label?: string;
  /**
   * Note that this is different from label
   */
  tags?: string[];
  state: TorrentState;
  stateMessage: string;
  /**
   * bytes per second
   */
  uploadSpeed: number;
  /**
   * bytes per second
   */
  downloadSpeed: number;
  /**
   * seconds until finish
   */
  eta: number;
  queuePosition: number;
  connectedSeeds: number;
  connectedPeers: number;
  totalSeeds: number;
  totalPeers: number;
  /**
   * size of files to download in bytes
   */
  totalSelected: number;
  /**
   * total size of the torrent, in bytes
   */
  totalSize: number;
  /**
   * total upload in bytes
   */
  totalUploaded: number;
  /**
   * total download in bytes
   */
  totalDownloaded: number;
  /**
   * Raw data returned by client
   */
  raw: any;
}

export interface AllClientData {
  labels: Label[];
  torrents: NormalizedTorrent[];
  /**
   * Raw data returned by client
   */
  raw: any;
}

export interface AddTorrentOptions {
  /**
   * start torrent paused, or pause after adding
   * default: false
   */
  startPaused: boolean;
  /**
   * called a label in some clients and a category in others
   */
  label: string;
}
