import { Requester } from './Requester'
import { Clan } from './Clan'
import { Player } from './Player'
import { War } from './War'
import { SearchClan } from './SearchClan'
import { WarLeagueGroup } from './WarLeagueGroup'

import { isValidTag, resolveTag } from '../helpers'
import { BASE_URL } from '../shared'

import {
  APIClan,
  APIClanWar,
  APIClanWarLeagueGroup,
  APIPlayer
} from '../types'

export class Client {
  private requester: Requester

  /**
   * Options for client.
   * @param options - Options for client.
   * @param options.email Email of clash of clans developer account.
   * @param options.password Password for clash of clans developer account.
   */
  constructor ({
    email,
    password
  }: ClientOptions) {
    this.requester = new Requester(email, password)
  }

  /**
   * Resolve player of given player tag.
   * @param playerTag Tag of player.
  */
  public async getPlayer (playerTag: string) {
    const tag = resolveTag(playerTag)

    if (!isValidTag(tag)) {
      return null
    }

    const data = await this.requester.get(`${BASE_URL}/players/${encodeURIComponent(tag)}`)

    if (data) {
      return new Player(this, data as APIPlayer)
    }

    return null
  }

  /**
   * Resolve clan of given clan tag.
   * @param clanTag Tag of clan.
  */
  public async getClan (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (!isValidTag(tag)) {
      return null
    }

    const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}`)
  
    if (data) {
      return new Clan(this, data as APIClan)
    }

    return null
  }

  /**
   * Search clans with given search options.
   * @param searchOptions Options for searching clans.
  */
  public async getClans (searchOptions: ClanSearchOptions) {
    const searchParams = new URLSearchParams()

    for (const key in searchOptions) {
      // @ts-expect-error
      searchParams.set(key, searchOptions[key].toString())
    }

    const data = await this.requester.get(`${BASE_URL}/clans?${searchParams.toString()}`)

    if (data) {
      return (data.items as Array<APIClan>).map(data => new SearchClan(this, data))
    }

    return null
  }

  /**
   * Resolve war of given clan tag, if in one.
   * @param clanTag Tag of clan.
  */
  public async getWar (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (!isValidTag(tag)) {
      return null
    }

    const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}/currentwar`)
  
    if (data && (data as APIClanWar).state !== 'notInWar') {
      return new War(this, data as APIClanWar)
    }

    return null
  }

  /**
   * Resolve war league group of given clan tag, if in one.
   * @param clanTag Tag of clan.
   */
  public async getWarLeagueGroup (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (!isValidTag(tag)) {
      return null
    }

    const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}/currentwar/leaguegroup`)
  
    if (data) {
      return new WarLeagueGroup(this, data as APIClanWarLeagueGroup)
    }

    return null
  }

  /**
   * Resolve legend statistics of given player tag, if any.
   * @param playerTag Tag of player.
  */
  public async getLegendStatistics (playerTag: string) {
    const data = await this.getPlayer(playerTag)
    
    return data?.legendStatistics ?? null
  }
}

interface ClientOptions {
  email: string,
  password: string
}

interface ClanSearchOptions {
  name?: string,
  warFrequency?: string,
  locationID?: number,
  minMembers?: number,
  maxMembers?: number,
  minClanPoints?: number,
  minClanLevel?: number,
  limit?: number
}
