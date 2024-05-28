import { APILegendLeagueTournamentResult } from '../types'

export class CurrentLegendStatisticsSeason {
  /** Amount of trophies player has earned in current season. */
  public readonly trophies: number

  /** Rank of player in current season. */
  public readonly rank: number

  constructor (data: APILegendLeagueTournamentResult) {
    this.trophies = data.trophies
    this.rank = data.rank
  }
}
