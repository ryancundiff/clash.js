import { APIClanCapitalRaidSeasonClanInfo } from './APIClanCapitalRaidSeasonClanInfo'
import { APIClanCapitalRaidSeasonDistrict } from './APIClanCapitalRaidSeasonDistrict'

export interface APIClanCapitalRaidSeasonAttackLogEntry {
  defender: APIClanCapitalRaidSeasonClanInfo,
  attackCount: number,
  districtCount: number,
  districtsDestroyed: number,
  districts: Array<APIClanCapitalRaidSeasonDistrict>
}
