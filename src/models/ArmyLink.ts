import util from 'node:util'

import { ArmyLinkUnit } from './ArmyLinkUnit'
import { ArmyLinkSpell } from './ArmyLinkSpell'

import {
  ARMY_LINK_URL,
  ARMY_LINK_URL_REGEX,
  ARMY_LINK_ENTRY_REGEX,
  ARMY_LINK_UNIT_REGEX,
  ARMY_LINK_SPELL_REGEX,
  armyLinkUnitNameMap,
  armyLinkSpellNameMap,
  armyLinkUnitMap,
  armyLinkSpellMap,
  elixirTroopNameSet,
  darkElixirTroopNameSet,
  elixirSpellNameSet,
  darkElixirSpellNameSet,
  superTroopNameSet,
  siegeMachineNameSet
} from '../shared'

import {
  getWithNameFromSet
} from '../helpers'

import {
  ArmyLinkUnitName,
  ArmyLinkSpellName
} from '../types'

export class ArmyLink extends String {
  private readonly _units: ArmyLinkUnit[] = []
  private readonly _spells: ArmyLinkSpell[] = []

  constructor (link?: string) {
    super()

    if (link && ARMY_LINK_URL_REGEX.test(link)) {
      const unitPart = link.match(ARMY_LINK_UNIT_REGEX)?.[0]?.replace('u', '')
      const spellPart = link.match(ARMY_LINK_SPELL_REGEX)?.[0]?.replace('s', '')

      if (unitPart)
        // @ts-ignore
        unitPart?.matchAll(ARMY_LINK_ENTRY_REGEX).forEach((match) => {
          if (armyLinkUnitNameMap.has(parseInt(match[2])))
            this._units.push(new ArmyLinkUnit(armyLinkUnitNameMap.get(parseInt(match[2])) as ArmyLinkUnitName, parseInt(match[1])))
        })

      if (spellPart)
        // @ts-ignore
        spellPart?.matchAll(ARMY_LINK_ENTRY_REGEX).forEach((match) => {
          if (armyLinkSpellNameMap.has(parseInt(match[2])))
            this._spells.push(new ArmyLinkSpell(armyLinkSpellNameMap.get(parseInt(match[2])) as ArmyLinkSpellName, parseInt(match[1])))
        })
    }
  }

  /** Array of units in the army link. */
  public get units () {
    return this._units.length > 0 ? this._units : null
  }

  /** Array of spells in the army link. */
  public get spells () {
    return this._spells.length > 0 ? this._spells : null
  }

  /** Array of troops in the army link. */
  public get troops () {
    const troops = []
    const elixirTroops = this.elixirTroops
    const darkElixirTroops = this.darkElixirTroops
    const superTroops = this.superTroops

    if (elixirTroops && elixirTroops.length > 0)
      troops.push(...elixirTroops)

    if (darkElixirTroops && darkElixirTroops.length > 0)
      troops.push(...darkElixirTroops)

    if (superTroops && superTroops.length > 0)
      troops.push(...superTroops)

    if (troops.length === 0)
      return null

    return troops
  }

  /** Array of elixir troops in the army link. */
  public get elixirTroops () {
    return getWithNameFromSet(this._units, elixirTroopNameSet)
  }

  /** Array of dark elixir troops in the army link. */
  public get darkElixirTroops () {
    return getWithNameFromSet(this._units, darkElixirTroopNameSet)
  }

  /** Array of super troops in the army link. */
  public get superTroops () {
    return getWithNameFromSet(this._units, superTroopNameSet)
  }

  /** Array of elixir spells in the army link. */
  public get elixirSpells () {
    return getWithNameFromSet(this._spells, elixirSpellNameSet)
  }

  /** Array of dark elixir spells in the army link. */
  public get darkElixirSpells () {
    return getWithNameFromSet(this._spells, darkElixirSpellNameSet)
  }

  /** Array of siege machines in the army link. */
  public get siegeMachines () {
    return getWithNameFromSet(this._units, siegeMachineNameSet)
  }

  /**
   * Adds a unit or spell to the army link.
   * @param unitOrSpellName The name of the unit or spell.
   * @param count The number of units or spells.
  */
  public add (unitOrSpellName: ArmyLinkUnitName | ArmyLinkSpellName, count: number): this {
    if (armyLinkUnitMap.has(unitOrSpellName)) {
      return this.addUnit(unitOrSpellName as ArmyLinkUnitName, count)
    }

    return this.addSpell(unitOrSpellName as ArmyLinkSpellName, count)
  }

  /**
   * Removes a unit or spell from the army link.
   * @param unitOrSpellName The name of the unit or spell to remove.
  */
  public remove (unitOrSpellName: ArmyLinkUnitName | ArmyLinkSpellName): this {
    if (armyLinkUnitMap.has(unitOrSpellName)) {
      return this.removeUnit(unitOrSpellName as ArmyLinkUnitName)
    } else if (armyLinkSpellMap.has(unitOrSpellName)) {
      return this.removeSpell(unitOrSpellName as ArmyLinkSpellName)
    }

    return this
  }

  /**
   * Adds a unit to the army link.
   * @param unit The name of the unit.
   * @param count The number of units.
  */
  public addUnit (unitName: ArmyLinkUnitName, count: number): this {
    if (armyLinkUnitMap.has(unitName))
      this._units.push(new ArmyLinkUnit(unitName, count))

    return this
  }

  /**
   * Removes a unit from the army link.
   * @param unitName The name of the unit to remove.
  */
  public removeUnit (unitName: ArmyLinkUnitName): this {
    for (const unit of this._units) {
      if (unit.name === unitName) {
        this._units.splice(this._units.indexOf(unit), 1)
        break
      }
    }

    return this
  }

  /**
   * Adds a spell to the army link.
   * @param spell The name of the spell.
   * @param count The number of spells.
  */
  public addSpell (spellName: ArmyLinkSpellName, count: number): this {
    if (armyLinkSpellMap.has(spellName))
      this._spells.push(new ArmyLinkSpell(spellName, count))

    return this
  }

  /**
   * Removes a spell from the army link.
   * @param spellName The name of the spell to remove.
  */
  public removeSpell (spellName: ArmyLinkSpellName): this {
    for (const spell of this._spells) {
      if (spell.name === spellName) {
        this._spells.splice(this._spells.indexOf(spell), 1)
        break
      }
    }

    return this
  }

  private build (): string {
    if (this._units.length === 0 && this._spells.length === 0) {
      return ARMY_LINK_URL
    }

    const unitPart = this._units.length > 0 ? `u${this._units.map(unit => unit.toString()).join('-')}` : ''
    const spellPart = this._spells.length > 0 ? `s${this._spells.map(spell => spell.toString()).join('-')}` : ''

    return `${ARMY_LINK_URL}&army=${unitPart}${spellPart}`
  }

  override toString () {
    return this.build()
  }

  override valueOf () {
    return this.build()
  }

  [Symbol.toPrimitive] (hint: 'default' | 'string' | 'number') {
    return this.build()
  }

  [util.inspect.custom] () {
    return this.build()
  }
}
