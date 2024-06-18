import { APIClanCapitalRaidSeasonClanInfo } from './APIClanCapitalRaidSeasonClanInfo'
import { APIClanCapitalRaidSeasonDistrict } from './APIClanCapitalRaidSeasonDistrict'

export interface APIClanCapitalRaidSeasonDefenseLogEntry {
  attacker: APIClanCapitalRaidSeasonClanInfo,
  attackCount: number,
  districtCount: number,
  districtsDestroyed: number,
  districts: Array<APIClanCapitalRaidSeasonDistrict>
}
