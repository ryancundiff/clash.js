import type { APIBuilderBaseLeague } from './APIBuilderBaseLeague'
import type { APILabel } from './APILabel'
import type { APILeague } from './APILeague'
import { APIPlayerAchievementProgress } from './APIPlayerAchievementProgress'
import type { APIPlayerClan } from './APIPlayerClan'
import { APIPlayerHouse } from './APIPlayerHouse'
import type { APIPlayerItemLevel } from './APIPlayerItemLevel'
import { APIPlayerLegendStatistics } from './APIPlayerLegendStatistics'
import { APIRole } from './APIRole'

export interface APIPlayer {
  clan: APIPlayerClan,
  league: APILeague,
  builderBaseLeague: APIBuilderBaseLeague,
  role: APIRole,
  warPreference?: 'in',
  attackWins: number,
  defenseWins:number,
  townHallLevel: number,
  townHallWeaponLevel: number,
  legendStatistics: APIPlayerLegendStatistics,
  troops: Array<APIPlayerItemLevel>,
  heroes: Array<APIPlayerItemLevel>,
  heroEquipment: Array<APIPlayerItemLevel>,
  spells: Array<APIPlayerItemLevel>,
  labels: Array<APILabel>,
  tag: string,
  name: string,
  expLevel: number,
  trophies: number,
  bestTrophies: number,
  donations: number,
  donationsReceived: number,
  builderHallLevel: number,
  builderBaseTrophies: number,
  bestBuilderBaseTrophies: number,
  warStars: number,
  achievements: Array<APIPlayerAchievementProgress>,
  clanCapitalContributions: number,
  playerHouse: APIPlayerHouse
}
