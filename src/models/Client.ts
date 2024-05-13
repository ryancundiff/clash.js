import { Requester } from './Requester'
import { Clan } from './Clan'
import { Player } from './Player'

import { resolveTag } from '../helpers'
import { BASE_URL } from '../shared'

import {
  APIClan,
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
   * Resolve player of given tag.
   * @param playerTag Tag of player.
  */
  public async getPlayer (playerTag: string) {
    const data = await this.requester.get(`${BASE_URL}/players/${resolveTag(playerTag)}`)

    if (data) {
      return new Player(this, data as APIPlayer)
    }

    return null
  }

  /**
   * Resolve clan of given tag.
   * @param clanTag Tag of clan.
  */
  public async getClan (clanTag: string) {
    const data = await this.requester.get(`${BASE_URL}/clans/${resolveTag(clanTag)}`)
  
    if (data) {
      return new Clan(this, data as APIClan)
    }

    return null
  }

  // public async getWarLog (clanTag: string) {

  // }
}

interface ClientOptions {
  email: string,
  password: string
}
