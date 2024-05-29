import { Client } from './Client'
import { WarClan } from './WarClan'
import { resolveDate } from '../helpers'
import { warStateMap } from '../shared'

import {
  APIClanWar,
  WarState
} from '../types'

export class War {
  /** Ally clan of war. */
  public readonly ally: WarClan

  /** Enemy clan of war. */
  public readonly enemy: WarClan

  /** Size of team on each side of war. */
  public readonly size: number

  /** Amount of attacks per member. */
  public readonly attacksPerMember: number

  /** Current amount of attacks made in war. */
  public readonly attacks: number

  /** Maximum amount of attacks that can be made in war. */
  public readonly maxAttacks: number

  /** Current state of war. */
  public readonly state: WarState

  /** Date of when the war starts. */
  public readonly startDate: Date

  /** Date of when the war ends. */
  public readonly endDate: Date

  /** Date of when the war preparation starts. */
  public readonly preparationDate: Date

  constructor (
    private client: Client,
    data: APIClanWar
  ) {
    this.ally = new WarClan(client, data.clan)
    this.enemy = new WarClan(client, data.opponent)
    this.size = data.teamSize
    this.attacksPerMember = data.attacksPerMember
    this.attacks = data.clan.attacks ?? 0 + data.opponent.attacks ?? 0
    this.maxAttacks = data.attacksPerMember * data.teamSize * 2

    this.state = warStateMap.has(data.state)
      ? warStateMap.get(data.state) as WarState
      : data.state as WarState

    this.startDate = resolveDate(data.startTime)
    this.endDate = resolveDate(data.endTime)
    this.preparationDate = resolveDate(data.preparationStartTime)
  }

  /** If war is in preparation. */
  public get inPreparation () {
    return this.state == 'preparation'
  }

  /** If war has started. */
  public get hasStarted () {
    return this.state == 'in-war'
  }

  /** If war has ended. */
  public get hasEnded () {
    return this.state == 'war-ended'
  }

  /** Resolve clan from ally war clan. */
  public async getAlly () {
    return await this.client.getClan(this.ally.tag)
  }

  /** Resolve clan from enemy war clan. */
  public async getEnemy () {
    return await this.client.getClan(this.enemy.tag)
  }

  /**
   * Check if ally clan has member with given tag in war.
   * @param memberTag Tag of member.
  */
  public hasAllyMember (memberTag: string) {
    return this.ally.hasMember(memberTag)
  }

  /**
   * Check if enemy clan has member with given tag in war.
   * @param memberTag Tag of member.
  */
  public hasEnemyMember (memberTag: string) {
    return this.enemy.hasMember(memberTag)
  }

  /**
   * Check if ally clan has member with given name in war.
   * @param memberName Name of member.
  */
  public hasAllyMemberByName (memberName: string) {
    return this.ally.hasMemberByName(memberName)
  }

  /**
   * Check if enemy clan has member with given name in war.
   * @param memberName Name of member.
  */
  public hasEnemyMemberByName (memberName: string) {
    return this.enemy.hasMemberByName(memberName)
  }

  /**
   * Check if ally clan has member with given tag in war.
   * @param memberTag Tag of member.
  */
  public getAllyMember (memberTag: string) {
    return this.ally.getMember(memberTag)
  }

  /**
   * Get member of given tag from enemy clan, if in war.
   * @param memberTag Tag of member.
  */
  public getEnemyMember (memberTag: string) {
    return this.enemy.getMember(memberTag)
  }

  /**
   * Get member of given name from ally clan, if in war.
   * @param memberName Name of member.
  */
  public getAllyMemberByName (memberName: string) {
    return this.ally.getMemberByName(memberName)
  }

  /**
   * Get member of given name from enemy clan, if in war.
   * @param memberName Name of member.
  */
  public getEnemyMemberByName (memberName: string) {
    return this.enemy.hasMemberByName(memberName)
  }
}
