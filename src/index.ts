import type { FetchOptions } from 'ofetch';

export interface TorrentClient {
  config: TorrentClientConfig;
  state: TorrentClientState;
  /**
   * Export the current state of the client. Can be restored with `createFromState`.
   */
  exportState(): TorrentClientState;
  /**
   * Returns all torrent data. Data has been normalized
   */
  getAllData(): Promise<AllClientData>;
  /**
   * Throws when the torrent doesn't exist
   */
  getTorrent(id: any): Promise<NormalizedTorrent>;
  /**
   * Pause one or more torrents, clients resolve with `void`
   */
  pauseTorrent(id: any): Promise<unknown>;
  /**
   * Resume one or more torrents, clients resolve with `void`
   */
  resumeTorrent(id: any): Promise<unknown>;
  /**
   * Remove one or more torrents, clients resolve with `void`. Throws when a torrent doesn't exist
   * @param removeData (default: false) also remove downloaded data from disk
   */
  removeTorrent(id: any, removeData?: boolean): Promise<unknown>;
  /**
   * Move one or more torrents up the queue, clients resolve with `void`. Throws when the client has no queue
   */
  queueUp(id: any): Promise<unknown>;
  /**
   * Move one or more torrents down the queue, clients resolve with `void`. Throws when the client has no queue
   */
  queueDown(id: any): Promise<unknown>;
  addTorrent(torrent: string | Uint8Array, options?: any): Promise<unknown>;
  normalizedAddTorrent(
    torrent: string | Uint8Array<ArrayBuffer>,
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
  dispatcher?: FetchOptions['dispatcher'];
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
   * torrent info hash, lowercase
   */
  id: string;
  /**
   * torrent name
   */
  name: string;
  /**
   * progress from 0 to 1
   */
  progress: number;
  isCompleted: boolean;
  /**
   * uploaded / downloaded, 1:1 is 1, half seeded is 0.5. 0 when nothing has been downloaded
   */
  ratio: number;
  /**
   * date as iso string, empty string when the client doesn't track it
   */
  dateAdded: string;
  /**
   * date completed as iso string, undefined until the torrent is completed
   */
  dateCompleted?: string;
  savePath: string;
  /**
   * Sometimes called "Category", other times called label. undefined when the torrent has none
   */
  label?: string;
  /**
   * Note that this is different from label
   */
  tags?: string[];
  state: TorrentState;
  /**
   * status or error message from the client, empty string when there is none
   */
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
   * seconds until finish, 0 when completed, -1 when unknown (stalled, no estimate)
   */
  eta: number;
  /**
   * position in the client's download queue starting at 1, 0 when not queued or the client has no queue
   */
  queuePosition: number;
  /**
   * connected peers that have the complete torrent
   */
  connectedSeeds: number;
  /**
   * connected peers that don't have the complete torrent
   */
  connectedPeers: number;
  /**
   * seeds in the swarm as reported by trackers, 0 when unknown
   */
  totalSeeds: number;
  /**
   * peers in the swarm as reported by trackers, 0 when unknown
   */
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
