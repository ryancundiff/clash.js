import { Requester } from './Requester'
import { Clan } from './Clan'
import { Player } from './Player'
import { War } from './War'

import { resolveTag } from '../helpers'
import { BASE_URL } from '../shared'

import {
  APIClan,
  APIClanWar,
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
    const data = await this.requester.get(`${BASE_URL}/players/${encodeURIComponent(resolveTag(playerTag))}`)

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
    const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(resolveTag(clanTag))}`)
  
    if (data) {
      return new Clan(this, data as APIClan)
    }

    return null
  }

  /**
   * Resolve war of given clan tag, if in one.
   * @param clanTag Tag of clan.
  */
  public async getWar (clanTag: string) {
    const data = await this.requester.get(`${BASE_URL}/clans/${encodeURIComponent(resolveTag(clanTag))}/currentwar`)
  
    if (data && (data as APIClanWar).state !== 'notInWar') {
      return new War(this, data as APIClanWar)
    }

    return null
  }
}

interface ClientOptions {
  email: string,
  password: string
}
