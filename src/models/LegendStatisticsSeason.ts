import { APILegendLeagueTournamentResult } from '../types'

export class LegendStatisticsSeason {
  /** ID of legend season. */
  public id: string

  /** Amount of trophies player has earned in season. */
  public trophies: number

  /** Rank of player in season. */
  public rank: number

  constructor (data: APILegendLeagueTournamentResult) {
    this.id = data.id
    this.trophies = data.trophies
    this.rank = data.rank
  }
}
