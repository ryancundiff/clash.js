import { APILegendLeagueTournamentResult } from '../types'

export class LegendStatisticsSeason {
  /** ID of legend season. */
  public readonly id: string

  /** Amount of trophies player has earned in season. */
  public readonly trophies: number

  /** Rank of player in season. */
  public readonly rank: number

  constructor (data: APILegendLeagueTournamentResult) {
    this.id = data.id
    this.trophies = data.trophies
    this.rank = data.rank
  }
}
