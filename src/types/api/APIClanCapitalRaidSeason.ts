import { APIClanCapitalRaidSeasonAttackLogEntry } from './APIClanCapitalRaidSeasonAttackLogEntry'

import { APIClanCapitalRaidSeasonDefenseLogEntry } from './APIClanCapitalRaidSeasonDefenseLogEntry'
import { APIClanCapitalRaidSeasonMember } from './APIClanCapitalRaidSeasonMember'

export interface APIClanCapitalRaidSeason {
  attackLog: Array<APIClanCapitalRaidSeasonAttackLogEntry>,
  defenseLog: Array<APIClanCapitalRaidSeasonDefenseLogEntry>,
  state: string,
  startTime: string,
  endTime: string,
  capitalTotalLoot: number,
  raidsCompleted: number,
  totalAttacks: number,
  enemyDistrictsDestroyed: number,
  offensiveReward: number,
  defensiveReward: number,
  members: Array<APIClanCapitalRaidSeasonMember>
}
