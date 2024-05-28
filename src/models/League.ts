import {
  APILeague,
  IconURLs,
  LeagueName
} from '../types'

export class League {
  /** Name of league. */
  public readonly name: LeagueName

  /** ID of league. */
  public readonly id: number

  /** Record of icon URLs. */
  public readonly iconURLs: Omit<IconURLs, 'large'>

  constructor (data: APILeague) {
    this.name = data.name as LeagueName
    this.id = data.id
    this.iconURLs = data.iconUrls
  }
}
