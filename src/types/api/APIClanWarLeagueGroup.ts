import { APIClanWarLeagueClan } from './APIClanWarLeagueClan'
import { APIClanWarLeagueRound } from './APIClanWarLeagueRound'
import { APIClanWarState } from './APIClanWarState'

export interface APIClanWarLeagueGroup {
  tag: string,
  state: APIClanWarState,
  season: string,
  clans: Array<APIClanWarLeagueClan>,
  rounds: Array<APIClanWarLeagueRound>
}
