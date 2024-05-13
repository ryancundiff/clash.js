import { APIIconURLs } from './APIIconURLs'

export interface APILeague {
  name: string,
  id: number,
  iconUrls: Omit<APIIconURLs, 'large'>
}
