import { Requester } from './Requester'
import { Clan } from './Clan'
import { Player } from './Player'
import { War } from './War'
import { SearchClan } from './SearchClan'
import { WarLeagueGroup } from './WarLeagueGroup'
import { WarLog } from './WarLog'
import { ClanMember } from './ClanMember'
import { CapitalSeason } from './CapitalSeason'
import { League } from './League'
import { WarLeague } from './WarLeague'
import { CapitalLeague } from './CapitalLeague'
import { GoldPass } from './GoldPass'
import { BuilderBaseLeague } from './BuilderBaseLeague'

import {
  isValidTag,
  resolveTag
} from '../helpers'

import {
  BASE_URL,
  clanSearchOptionsMap
} from '../shared'

import {
  APIBuilderBaseLeague,
  APICapitalLeague,
  APIClan,
  APIClanCapitalRaidSeason,
  APIClanMember,
  APIClanWar,
  APIClanWarLeagueGroup,
  APIClanWarLogEntry,
  APILeague,
  APIPlayer,
  APIWarLeague
} from '../types'

export class Client {
  private requester: Requester

  /**
   * Options for client.
   * @param options - Options for client.
   * @param options.email Email of clash of clans developer account.
   * @param options.password Password for clash of clans developer account.
  */
  constructor (options: ClientOptions) {
    this.requester = new Requester(
      options.email,
      options.password
    )
  }

  /**
   * Verify given API token.
   * @param token Token to verify.
  */
  public async verify (playerTag: string, token: string) {
    const tag = resolveTag(playerTag)

    if (isValidTag(tag)) {
      const data = await this.requester.post(`${BASE_URL}/players/${encodeURIComponent(tag)}/verifytoken`, {
        token
      })
      
      if (data) {
        return data.status === 'ok'
      }
    }

    return false
  }

  /**
   * Resolve player of given player tag.
   * @param playerTag Tag of player.
  */
  public async getPlayer (playerTag: string) {
    const tag = resolveTag(playerTag)

    if (isValidTag(tag)) {
      const data = await this.requester.get(`${BASE_URL}/players/${encodeURIComponent(tag)}`)

      if (data) {
        return new Player(this, data as APIPlayer)
      }
    }

    return null
  }

  /**
   * Resolve clan of given clan tag.
   * @param clanTag Tag of clan.
  */
  public async getClan (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (isValidTag(tag)) {
      const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}`)
  
      if (data) {
        return new Clan(this, data as APIClan)
      }
    }

    return null
  }

  /**
   * Search clans with given search options.
   * @param searchOptions Options for searching clans.
  */
  public async getClans (searchOptions: ClanSearchOptions) {
    const searchParams = new URLSearchParams()

    for (const [ key, value ] of Object.entries(searchOptions)) {
      searchParams.set(
        clanSearchOptionsMap.has(key)
          ? clanSearchOptionsMap.get(key)!
          : key,

        value
      )
    }

    const data = await this.requester.get(`${BASE_URL}/clans?${searchParams.toString()}`)

    if (data && data.items && data.items.length > 0) {
      return (data.items as Array<APIClan>).map(data => new SearchClan(this, data))
    }

    return null
  }

  /**
   * Resolve members of given clan tag.
   * @param clanTag Tag of clan.
  */
  public async getMembers (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (isValidTag(tag)) {
      const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}/members`)
  
      if (data && data.items && data.items.length > 0) {
        return (data.items as Array<APIClanMember>).map(data => new ClanMember(this, data))
      }
    }

    return null
  }

  /**
   * Resolve war of given clan tag, if in one.
   * @param clanTag Tag of clan.
  */
  public async getWar (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (isValidTag(tag)) {
      const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}/currentwar`)
  
      if (data && (data as APIClanWar).state !== 'notInWar') {
        return new War(this, data as APIClanWar)
      }
    }

    return null
  }

  /**
   * Resolve war log of given clan tag.
   * @param clanTag Tag of clan.
  */
  public async getWarLog (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (isValidTag(tag)) {
      const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}/warlog`)
  
      if (data) {
        return (data.items as Array<APIClanWarLogEntry>).map(data => new WarLog(this, data))
      }
    }

    return null
  }

  /**
   * Resolve war league group of given clan tag, if in one.
   * @param clanTag Tag of clan.
  */
  public async getWarLeagueGroup (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (isValidTag(tag)) {
      const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}/currentwar/leaguegroup`)
  
      if (data) {
        return new WarLeagueGroup(this, data as APIClanWarLeagueGroup)
      }
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

  /**
   * Resolve capital seasons of given clan tag, if any.
   * @param clanTag Tag of clan.
  */
  public async getCapitalSeasons (clanTag: string) {
    const tag = resolveTag(clanTag)

    if (isValidTag(tag)) {
      const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(tag)}/capitalraidseasons`)
    
      if (data) {
        return (data.items as Array<APIClanCapitalRaidSeason>).map(data => new CapitalSeason(this, data))
      }
    }

    return null
  }

  /**
    * Resolve all leagues.
    * @param limit Amount of leagues to return.
  */
  public async getLeagues (limit?: number) {
    const data = await this.requester.get(`${BASE_URL}/leagues${limit ? `?limit=${limit}` : ''}`)
    
    if (data) {
      return (data.items as Array<APILeague>).map(data => new League(data))
    }

    return null
  }

  /**
    * Resolve all builder base leagues.
    * @param limit Amount of builder base leagues to return.
  */
  public async getBuilderBaseLeagues (limit?: number) {
    const data = await this.requester.get(`${BASE_URL}/builderbaseleagues${limit ? `?limit=${limit}` : ''}`)
    
    if (data) {
      return (data.items as Array<APIBuilderBaseLeague>).map(data => new BuilderBaseLeague(data))
    }

    return null
  }

  /**
    * Resolve all war leagues.
    * @param limit Amount of war leagues to return.
  */
  public async getWarLeagues (limit?: number) {
    const data = await this.requester.get(`${BASE_URL}/warleagues${limit ? `?limit=${limit}` : ''}`)
    
    if (data) {
      return (data.items as Array<APIWarLeague>).map(data => new WarLeague(data))
    }

    return null
  }

  /**
    * Resolve all capital leagues.
    * @param limit Amount of capital leagues to return.
  */
  public async getCapitalLeagues (limit?: number) {
    const data = await this.requester.get(`${BASE_URL}/capitalleagues${limit ? `?limit=${limit}` : ''}`)
    
    if (data) {
      return (data.items as Array<APICapitalLeague>).map(data => new CapitalLeague(data))
    }

    return null
  }

  /**
   * Resolve league of given league ID.
   * @param leagueID ID of league.
  */
  public async getLeague (leagueID: number) {
    const data = await this.requester.get(`${BASE_URL}/leagues/${leagueID}`)
    
    if (data) {
      return new League(data)
    }

    return null
  }

  /**
   * Resolve builder base league of given builder base league ID.
   * @param builderBaseLeagueID ID of builder base league.
  */
  public async getBuilderBaseLeague (builderBaseLeagueID: number) {
    const data = await this.requester.get(`${BASE_URL}/builderbaseleagues/${builderBaseLeagueID}`)
    
    if (data) {
      return new BuilderBaseLeague(data)
    }

    return null
  }

  /**
   * Resolve war league of given war league ID.
   * @param warLeagueID ID of war league.
  */
  public async getWarLeague (warLeagueID: number) {
    const data = await this.requester.get(`${BASE_URL}/warleagues/${warLeagueID}`)
    
    if (data) {
      return new WarLeague(data)
    }

    return null
  }

  /**
   * Resolve capital league of given capital league ID.
   * @param capitalLeagueID ID of capital league.
  */
  public async getCapitalLeague (capitalLeagueID: number) {
    const data = await this.requester.get(`${BASE_URL}/capitalleagues/${capitalLeagueID}`)
    
    if (data) {
      return new CapitalLeague(data)
    }

    return null
  }

  /**
   * Resolve all player labels.
   * @param limit Amount of player labels to return.
  */
  public async getPlayerLabels (limit?: number) {
    const data = await this.requester.get(`${BASE_URL}/labels/players${limit ? `?limit=${limit}` : ''}`)
    
    if (data) {
      return data.items as Array<string>
    }

    return null
  }

  /**
   * Resolve all clan labels.
   * @param limit Amount of clan labels to return.
  */
  public async getClanLabels (limit?: number) {
    const data = await this.requester.get(`${BASE_URL}/labels/clans${limit ? `?limit=${limit}` : ''}`)
    
    if (data) {
      return data.items as Array<string>
    }

    return null
  }

  /** Resolve current gold pass season. */
  public async getGoldPass () {
    const data = await this.requester.get(`${BASE_URL}/goldpass/seasons/current`)

    if (data) {
      return new GoldPass(data)
    }

    return null
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
  minPoints?: number,
  minLevel?: number,
  limit?: number
}
