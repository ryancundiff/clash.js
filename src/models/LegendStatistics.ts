import { LegendStatisticsSeason } from './LegendStatisticsSeason'
import { CurrentLegendStatisticsSeason } from './CurrentLegendStatisticsSeason'

import { APIPlayerLegendStatistics } from '../types'

export class LegendStatistics {
  /** All-time total amount of trophies the player has earned in the legend league. */
  public readonly trophies: number

  /** Current season legend statistics of player. */
  public readonly currentSeason: CurrentLegendStatisticsSeason | null

  /** Previous season legend statistics of player. */
  public readonly previousSeason: LegendStatisticsSeason | null

  /** Previous builder base season legend statistics of player. */
  public readonly previousBuilderBaseSeason: LegendStatisticsSeason | null

  /** Best season legend statistics of player. */
  public readonly bestSeason: LegendStatisticsSeason | null

  /** Best builder base season legend statistics of player. */
  public readonly bestBuilderBaseSeason: LegendStatisticsSeason | null

  constructor (data: APIPlayerLegendStatistics) {
    this.trophies = data.legendTrophies

    this.currentSeason = data.currentSeason
      ? new CurrentLegendStatisticsSeason(data.currentSeason)
      : null

    this.previousSeason = data.previousSeason
      ? new LegendStatisticsSeason(data.previousSeason)
      : null

    this.previousBuilderBaseSeason = data.previousBuilderBaseSeason
      ? new LegendStatisticsSeason(data.previousBuilderBaseSeason)
      : null
    
    this.bestSeason = data.bestSeason
      ? new LegendStatisticsSeason(data.bestSeason)
      : null

    this.bestBuilderBaseSeason = data.bestBuilderBaseSeason
      ? new LegendStatisticsSeason(data.bestBuilderBaseSeason)
      : null
  }
}
