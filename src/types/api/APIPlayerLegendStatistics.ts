import { APILegendLeagueTournamentResult } from './APILegendLeagueTournamentResult'

export interface APIPlayerLegendStatistics {
  legendTrophies: number,
  previousSeason: APILegendLeagueTournamentResult,
  previousBuilderBaseSeason: APILegendLeagueTournamentResult,
  bestBuilderBaseSeason: APILegendLeagueTournamentResult,
  currentSeason: APILegendLeagueTournamentResult,
  bestSeason: APILegendLeagueTournamentResult
}
