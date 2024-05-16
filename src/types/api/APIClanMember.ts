import { APIBuilderBaseLeague } from './APIBuilderBaseLeague'
import { APILeague } from './APILeague'
import { APIPlayerHouse } from './APIPlayerHouse'
import { APIRole } from './APIRole'

export interface APIClanMember {
  league: APILeague,
  builderBaseLeague: APIBuilderBaseLeague,
  tag: string,
  name: string,
  role: APIRole,
  townHallLevel: number,
  expLevel: number,
  clanRank: number,
  previousClanRank: number,
  donations: number,
  donationsReceived: number,
  trophies: number,
  builderBaseTrophies: number,
  playerHouse: APIPlayerHouse
}
