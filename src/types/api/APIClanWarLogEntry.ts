import { APIClanWarLogEntryResult } from './APIClanWarLogEntryResult'
import { APIWarClan } from './APIWarClan'

export interface APIClanWarLogEntry {
  clan: APIWarClan,
  opponent: APIWarClan,
  teamSize: number,
  attacksPerMember: number,
  endTime: string,
  result: APIClanWarLogEntryResult
}
