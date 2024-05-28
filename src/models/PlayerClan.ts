import { Client } from './Client'

import type {
  APIPlayerClan,
} from '../types'

export class PlayerClan {
  /** Name of player clan. */
  public readonly name: string

  /** Tag of player clan. */
  public readonly tag: string

  /** Level of player clan. */
  public readonly level: number

  constructor (
    private client: Client,
    data: APIPlayerClan
  ) {
    this.name = data.name
    this.tag = data.tag
    this.level = data.clanLevel
  }

  /** Resolve clan from player clan. */
  public async getClan () {
    if (this.tag) {
      return await this.client.getClan(this.tag)
    }

    return null
  }
}
