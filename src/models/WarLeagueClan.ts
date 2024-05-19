import { Client } from './Client'
import { WarLeagueClanMember } from './WarLeagueClanMember'

import {
  APIClanWarLeagueClan,
  IconURLs
} from '../types'

export class WarLeagueClan {
  /** Name of war league clan. */
  public name: string

  /** Tag of war league clan. */
  public tag: string

  /** Level of war league clan. */
  public level: number

  /** Array of members in war league clan. */
  public members: Array<WarLeagueClanMember>

  /** Record of icon URLs for war league clan's badge. */
  public badgeUrls: IconURLs

  constructor(
    private client: Client,
    data: APIClanWarLeagueClan
  ) {
    this.name = data.name
    this.tag = data.tag
    this.level = data.clanLevel
    this.members = data.members.map(member => new WarLeagueClanMember(client, member))
    this.badgeUrls = data.badgeUrls
  }

  /** Resolve clan from war league clan. */
  public async getClan () {
    return await this.client.getClan(this.tag)
  }

  /**
   * Check if war league clan has member with given tag.
   * @param memberTag Tag of member.
  */
  public hasMember (memberTag: string) {
    for (const member of this.members) {
      if (member.tag == memberTag) {
        return true
      }
    }

    return false
  }

  /**
   * Check if clan has member with given name in war.
   * @param memberName Name of member.
  */
  public hasMemberByName (memberName: string) {
    for (const member of this.members) {
      if (member.name == memberName) {
        return true
      }
    }

    return false
  }

  /**
   * Get member of given tag from war league clan.
   * @param memberTag Tag of member.
  */
  public getMember (memberTag: string) {
    for (const member of this.members) {
      if (member.tag == memberTag) {
        return member
      }
    }
  }

  /**
   * Check if clan has member with given name in war.
   * @param memberName Name of member.
  */
  public getMemberByName (memberName: string) {
    for (const member of this.members) {
      if (member.name == memberName) {
        return member
      }
    }

    return null
  }
}
