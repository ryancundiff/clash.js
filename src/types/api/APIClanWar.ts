import { APIClanWarState } from './APIClanWarState'
import { APIWarClan } from './APIWarClan'

export interface APIClanWar {
  clan: APIWarClan,
  teamSize: number,
  attacksPerMember: number,
  opponent: APIWarClan,
  startTime: string,
  state: APIClanWarState,
  endTime: string,
  preparationStartTime: string
}
