import { Client } from './Client'
import { APIClanWarLeagueClanMember } from '../types'

export class WarLeagueClanMember {
  /** Name of war league clan member. */
  public readonly name: string

  /** Tag of war league clan member. */
  public readonly tag: string

  /** Current town hall level of war league clan member. */
  public readonly townHall: number

  constructor(
    private client: Client,
    data: APIClanWarLeagueClanMember
  ) {
    this.name = data.name
    this.tag = data.tag
    this.townHall = data.townHallLevel
  }

  /** Resolve player from war league clan member. */
  public async getPlayer() {
    return await this.client.getPlayer(this.tag)
  }
}
