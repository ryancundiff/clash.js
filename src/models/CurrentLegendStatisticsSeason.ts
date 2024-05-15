import { APILegendLeagueTournamentResult } from '../types'

export class CurrentLegendStatisticsSeason {
  /** Amount of trophies player has earned in current season. */
  public trophies: number

  /** Rank of player in current season. */
  public rank: number

  constructor (data: APILegendLeagueTournamentResult) {
    this.trophies = data.trophies
    this.rank = data.rank
  }
}
