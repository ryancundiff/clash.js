import {
  APILabel,
  IconURLs
} from '../types'

export class Label {
  /** Name of label. */
  public name: string

  /** ID of label. */
  public id: number

  /** Record of icon URLs. */
  public iconURLs: Omit<IconURLs, 'large' | 'tiny'>

  constructor (data: APILabel) {
    this.name = data.name
    this.id = data.id
    this.iconURLs = data.iconUrls
  }
}
