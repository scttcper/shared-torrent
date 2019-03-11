import { AgentOptions } from 'got';

export interface TorrentClient {
  config: TorrentSettings;
  getAllData(): Promise<AllClientData>;
  getTorrent(id: any): Promise<NormalizedTorrent>;
  pauseTorrent(id: any): Promise<any>;
  resumeTorrent(id: any): Promise<any>;
  removeTorrent(id: any, removeData?: boolean): Promise<any>;
  queueUp(id: any): Promise<any>;
  queueDown(id: any): Promise<any>;
}

export interface TorrentSettings {
  /**
   * ex - `http://localhost:4444/
   */
  baseUrl: string;
  /**
   * ex - `'/json'`
   */
  path: string;
  username?: string;
  password?: string;
  /**
   * pass http agent for proxy
   * @link https://github.com/sindresorhus/got#proxies
   */
  agent?: AgentOptions;
  /**
   * request timeout
   * @link https://github.com/sindresorhus/got#timeout
   */
  timeout?: number;
}

export enum TorrentState {
  downloading = 'downloading',
  seeding = 'seeding',
  paused = 'paused',
  queued = 'queued',
  checking = 'checking',
  error = 'error',
  unknown = 'unknown',
}

export interface Label {
  id: string;
  name: string;
  count: number;
}

export interface NormalizedTorrent {
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
   * date completd as iso string;
   */
  dateCompleted?: string;
  savePath: string;
  label?: string;
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
   * total upload in bytes
   */
  totalUploaded: number;
  /**
   * total download in bytes
   */
  totalDownloaded: number;
}

export interface AllClientData {
  labels: Label[];
  torrents: NormalizedTorrent[];
}
