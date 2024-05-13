import { APIIconURLs } from './APIIconURLs'

export interface APILabel {
  name: string,
  id: number,
  iconUrls: Omit<APIIconURLs, 'tiny' | 'large'>
}
