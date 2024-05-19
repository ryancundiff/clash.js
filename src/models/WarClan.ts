import { Client } from './Client'
import { WarClanMember } from './WarClanMember'

import {
  APIWarClan,
  IconURLs
} from '../types'

export class WarClan {
  /** Name of war clan. */
  public name: string

  /** Tag of war clan. */
  public tag: string

  /** Array of members in war clan. */
  public members: Array<WarClanMember>

  /** Current percentage of destruction made across all best attacks. */
  public destruction: number

  /** Amount of stars earned across all best attacks. */
  public stars: number

  /** Current amount of attacks made. */
  public attacks: number

  /** Amount of experience earned. */
  public earned: number

  /** Record of icon URLs for war clan's badge. */
  public badgeURLs: IconURLs

  constructor (
    private client: Client,
    data: APIWarClan
  ) {
    this.name = data.name
    this.tag = data.tag
    this.members = data.members.map(data => new WarClanMember(client, data))
    this.destruction = data.destructionPercentage
    this.stars = data.stars
    this.attacks = data.attacks
    this.earned = data.expEarned ?? 0
    this.badgeURLs = data.badgeUrls
  }

  /** Resolve clan from war clan. */
  public async getClan () {
    return await this.client.getClan(this.tag)
  }

  /**
   * Check if clan has member with given tag in war.
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
   * Get member of given tag from clan, if in war.
   * @param memberTag Tag of member.
  */
  public getMember (memberTag: string) {
    for (const member of this.members) {
      if (member.tag == memberTag) {
        return member
      }
    }

    return null
  }

  /**
   * Get member of given name from clan, if in war.
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

  /**
   * Get member at given position on war map.
   * @param position Position on war map.
  */
  public getMemberByPosition (position: number) {
    for (const member of this.members) {
      if (member.position == position) {
        return member
      }
    }

    return null
  }
}
