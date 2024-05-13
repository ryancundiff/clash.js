import {
  APILeague,
  IconURLs
} from '../types'

export class League {
  /** Name of league. */
  public name: string

  /** ID of league. */
  public id: number

  /** Record of icon URLs. */
  public iconURLs: Omit<IconURLs, 'large'>

  constructor (data: APILeague) {
    this.name = data.name
    this.id = data.id
    this.iconURLs = data.iconUrls
  }
}
