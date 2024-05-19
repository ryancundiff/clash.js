import { APIClanWarLeagueRound } from '../types'

export class WarLeagueRound {
  /** War tags of clan war league round. */
  public tags: Array<string>

  constructor(data: APIClanWarLeagueRound) {
    this.tags = data.warTags
  }
}
