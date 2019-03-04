import { AgentOptions } from 'got';

export interface TorrentSettings {
  /**
   * ex - `http://localhost:4444/
   */
  baseUrl: string;
  /**
   * ex - `'/json'`
   */
  path: string;
  username: string;
  password: string;
  /**
   * pass http agent for proxy
   * @link https://github.com/sindresorhus/got#proxies
   */
  agent: AgentOptions;
  /**
   * request timeout
   * @link https://github.com/sindresorhus/got#timeout
   */
  timeout: number;
}
