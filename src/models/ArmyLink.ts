import util from 'node:util'

import { ArmyLinkUnit } from './ArmyLinkUnit'
import { ArmyLinkSpell } from './ArmyLinkSpell'
import { ArmyLinkHero } from './ArmyLinkHero'
import { ArmyLinkEquipment } from './ArmyLinkEquipment'

import {
  ARMY_LINK_URL,
  ARMY_LINK_URL_REGEX,
  ARMY_LINK_UNIT_OR_SPELL_REGEX,
  ARMY_LINK_UNIT_GROUP_REGEX,
  ARMY_LINK_SPELL_GROUP_REGEX,
  ARMY_LINK_HERO_GROUP_REGEX,
  ARMY_LINK_EQUIPMENT_GROUP_REGEX,
  ARMY_LINK_HERO_REGEX,
  armyLinkUnitNameMap,
  armyLinkSpellNameMap,
  armyLinkUnitMap,
  armyLinkSpellMap,
  elixirTroopNameSet,
  darkElixirTroopNameSet,
  elixirSpellNameSet,
  darkElixirSpellNameSet,
  superTroopNameSet,
  siegeMachineNameSet,
  armyLinkHeroNameMap,
  armyLinkEquipmentNameMap,
  armyLinkHeroMap,
  armyLinkEquipmentMap,
  armyLinkEquipmentToHeroNameMap,
  ARMY_LINK_CLAN_CASTLE_UNITS_REGEX,
  ARMY_LINK_CLAN_CASTLE_SPELLS_REGEX
} from '../shared'

import {
  getWithNameFromSet
} from '../helpers'

import {
  ArmyLinkUnitName,
  ArmyLinkSpellName,
  ArmyLinkEquipmentName,
  ArmyLinkHeroName
} from '../types'

export class ArmyLink extends String {
  private _clanCastleUnits: ArmyLinkUnit[] = []
  private _clanCastleSpells: ArmyLinkSpell[] = []
  private _heroes: ArmyLinkHero[] = []
  private _units: ArmyLinkUnit[] = []
  private _spells: ArmyLinkSpell[] = []

  constructor (link?: string) {
    super()

    if (link && ARMY_LINK_URL_REGEX.test(link)) {
      const clanCastleUnitPart = link.match(ARMY_LINK_CLAN_CASTLE_UNITS_REGEX)?.[0]?.replace('i', '')
      const clanCastleSpellPart = link.match(ARMY_LINK_CLAN_CASTLE_SPELLS_REGEX)?.[0]?.replace('d', '')
      const heroPart = link.match(ARMY_LINK_HERO_GROUP_REGEX)?.[0]?.replace('h', '')
      const unitPart = link.match(ARMY_LINK_UNIT_GROUP_REGEX)?.[0]?.replace('u', '')
      const spellPart = link.match(ARMY_LINK_SPELL_GROUP_REGEX)?.[0]?.replace('s', '')

      if (clanCastleUnitPart)
        // @ts-ignore
        clanCastleUnitPart?.matchAll(ARMY_LINK_UNIT_OR_SPELL_REGEX).forEach((match) => {
          if (armyLinkUnitNameMap.has(parseInt(match[2])))
            this._clanCastleUnits.push(new ArmyLinkUnit(armyLinkUnitNameMap.get(parseInt(match[2])) as ArmyLinkUnitName, parseInt(match[1])))
        })

      if (clanCastleSpellPart)
        // @ts-ignore
        clanCastleSpellPart?.matchAll(ARMY_LINK_UNIT_OR_SPELL_REGEX).forEach((match) => {
          if (armyLinkSpellNameMap.has(parseInt(match[2])))
            this._clanCastleSpells.push(new ArmyLinkSpell(armyLinkSpellNameMap.get(parseInt(match[2])) as ArmyLinkSpellName, parseInt(match[1])))
        })

      if (heroPart)
        // @ts-ignore
        heroPart?.matchAll(ARMY_LINK_HERO_REGEX).forEach((match) => {
          const heroID = parseInt(match[1].split('e')[0] ?? match[1])

          if (armyLinkHeroNameMap.has(heroID)) {
            const equipment: ArmyLinkEquipment[] = []
            const equipmentPart = match[1].match(ARMY_LINK_EQUIPMENT_GROUP_REGEX)?.[0]?.replace('e', '')?.split('_')

            if (equipmentPart) {
              for (const equipmentId of equipmentPart) {
                if (armyLinkEquipmentNameMap.has(parseInt(equipmentId)))
                  equipment.push(new ArmyLinkEquipment(armyLinkEquipmentNameMap.get(parseInt(equipmentId)) as ArmyLinkEquipmentName))
              }
            }

            this._heroes.push(new ArmyLinkHero(armyLinkHeroNameMap.get(heroID) as ArmyLinkHeroName, equipment))
          }
        })

      if (unitPart)
        // @ts-ignore
        unitPart?.matchAll(ARMY_LINK_UNIT_OR_SPELL_REGEX).forEach((match) => {
          if (armyLinkUnitNameMap.has(parseInt(match[2])))
            this._units.push(new ArmyLinkUnit(armyLinkUnitNameMap.get(parseInt(match[2])) as ArmyLinkUnitName, parseInt(match[1])))
        })

      if (spellPart)
        // @ts-ignore
        spellPart?.matchAll(ARMY_LINK_UNIT_OR_SPELL_REGEX).forEach((match) => {
          if (armyLinkSpellNameMap.has(parseInt(match[2])))
            this._spells.push(new ArmyLinkSpell(armyLinkSpellNameMap.get(parseInt(match[2])) as ArmyLinkSpellName, parseInt(match[1])))
        })
    }
  }

  /** Array of clan castle units in the army link. */
  public get clanCastleUnits () {
    return this._clanCastleUnits.length > 0 ? this._clanCastleUnits : null
  }

  /** Array of clan castle spells in the army link. */
  public get clanCastleSpells () {
    return this._clanCastleSpells.length > 0 ? this._clanCastleSpells : null
  }

  /** Array of heroes in the army link. */
  public get heroes () {
    return this._heroes.length > 0 ? this._heroes : null
  }

  /** Array of units in the army link. */
  public get units () {
    return this._units.length > 0 ? this._units : null
  }

  /** Array of spells in the army link. */
  public get spells () {
    return this._spells.length > 0 ? this._spells : null
  }

  /** Array of clan castle troops in the army link. */
  public get clanCastleTroops () {
    const troops = []
    const elixirTroops = this.clanCastleElixirTroops
    const darkElixirTroops = this.clanCastleDarkElixirTroops
    const superTroops = this.clanCastleSuperTroops

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

  /** Array of elixir troops in the clan castle. */
  public get clanCastleElixirTroops () {
    return getWithNameFromSet(this._clanCastleUnits, elixirTroopNameSet)
  }

  /** Array of dark elixir troops in the clan castle. */
  public get clanCastleDarkElixirTroops () {
    return getWithNameFromSet(this._clanCastleUnits, darkElixirTroopNameSet)
  }

  /** Array of super troops in the clan castle. */
  public get clanCastleSuperTroops () {
    return getWithNameFromSet(this._clanCastleUnits, superTroopNameSet)
  }

  /** Array of clan castle elixir spells in the army link. */
  public get clanCastleElixirSpells () {
    return getWithNameFromSet(this._clanCastleSpells, elixirSpellNameSet)
  }

  /** Array of clan castle dark elixir spells in the army link. */
  public get clanCastleDarkElixirSpells () {
    return getWithNameFromSet(this._clanCastleSpells, darkElixirSpellNameSet)
  }

  /** Array of clan castle siege machines in the army link. */
  public get clanCastleSiegeMachines () {
    return getWithNameFromSet(this._clanCastleUnits, siegeMachineNameSet)
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
  public add (unitOrSpellName: ArmyLinkUnitName | ArmyLinkSpellName, count: number) {
    if (armyLinkUnitMap.has(unitOrSpellName)) {
      return this.addUnit(unitOrSpellName as ArmyLinkUnitName, count)
    }

    return this.addSpell(unitOrSpellName as ArmyLinkSpellName, count)
  }

  /**
   * Removes a unit or spell from the army link.
   * @param unitOrSpellName The name of the unit or spell to remove.
  */
  public remove (unitOrSpellName: ArmyLinkUnitName | ArmyLinkSpellName) {
    if (armyLinkUnitMap.has(unitOrSpellName)) {
      return this.removeUnit(unitOrSpellName as ArmyLinkUnitName)
    } else if (armyLinkSpellMap.has(unitOrSpellName)) {
      return this.removeSpell(unitOrSpellName as ArmyLinkSpellName)
    }

    return this
  }

  /**
   * Adds a clan castle unit to the army link.
   * @param unitName The name of the unit.
   * @param count The number of units.
  */
  public addClanCastleUnit (unitName: ArmyLinkUnitName, count: number) {
    if (armyLinkUnitMap.has(unitName)) {
      this._clanCastleUnits.push(new ArmyLinkUnit(unitName, count))
    }

    return this
  }

  /**
   * Removes a clan castle unit from the army link.
   * @param unitName The name of the unit to remove.
  */
  public removeClanCastleUnit (unitName: ArmyLinkUnitName) {
    for (const unit of this._clanCastleUnits) {
      if (unit.name === unitName) {
        this._clanCastleUnits.splice(this._clanCastleUnits.indexOf(unit), 1)
        break
      }
    }

    return this
  }

  /**
   * Adds a clan castle spell to the army link.
   * @param spellName The name of the spell.
   * @param count The number of spells.
  */
  public addClanCastleSpell (spellName: ArmyLinkSpellName, count: number) {
    if (armyLinkSpellMap.has(spellName)) {
      this._clanCastleSpells.push(new ArmyLinkSpell(spellName, count))
    }

    return this
  }

  /**
   * Removes a clan castle spell from the army link.
   * @param spellName The name of the spell to remove.
  */
  public removeClanCastleSpell (spellName: ArmyLinkSpellName) {
    for (const spell of this._clanCastleSpells) {
      if (spell.name === spellName) {
        this._clanCastleSpells.splice(this._clanCastleSpells.indexOf(spell), 1)
        break
      }
    }

    return this
  }

  /**
   * Adds a hero to the army link.
   * @param heroName The name of the hero.
   * @param equipment Array of equipment equipped by the hero, if any.
  */
  public addHero (heroName: ArmyLinkHeroName, ...equipment: ArmyLinkEquipmentName[]) {
    if (this._heroes.length == 4 && this._heroes.find(hero => hero.name === heroName) === undefined) {
      return this
    }

    if (armyLinkHeroMap.has(heroName)) {
      this._heroes.push(new ArmyLinkHero(heroName, equipment.filter(equipmentName => armyLinkEquipmentMap.has(equipmentName)).map(equipmentName => new ArmyLinkEquipment(equipmentName))))
    }

    return this
  }

  /**
   * Removes a hero from the army link.
   * @param heroName The name of the hero to remove.
  */
  public removeHero (heroName: ArmyLinkHeroName) {
    this._heroes = this._heroes.filter(hero => hero.name !== heroName)

    return this
  }

  /**
   * Adds equipment to a hero in the army link.
   * @param heroName The name of the hero.
   * @param equipmentName The name of the equipment to add.
  */
  public addEquipment (equipmentName: ArmyLinkEquipmentName) {
    const heroName = armyLinkEquipmentToHeroNameMap.get(equipmentName)

    if (heroName && armyLinkEquipmentMap.has(equipmentName) && armyLinkHeroMap.has(heroName)) {
      const hero = this._heroes.find(hero => hero.name === heroName)

      if (hero) {
        hero.addEquipment(equipmentName)
      }
    }

    return this
  }

  /**
   * Removes equipment from a hero in the army link.
   * @param heroName The name of the hero.
   * @param equipmentName The name of the equipment to remove.
  */
  public removeEquipment (equipmentName: ArmyLinkEquipmentName) {
    const heroName = armyLinkEquipmentToHeroNameMap.get(equipmentName)

    if (heroName && armyLinkEquipmentMap.has(equipmentName) && armyLinkHeroMap.has(heroName)) {
      const hero = this._heroes.find(hero => hero.name === heroName)

      if (hero) {
        hero.removeEquipment(equipmentName)
      }
    }

    return this
  }

  /**
   * Adds a unit to the army link.
   * @param unit The name of the unit.
   * @param count The number of units.
  */
  public addUnit (unitName: ArmyLinkUnitName, count: number) {
    if (armyLinkUnitMap.has(unitName))
      this._units.push(new ArmyLinkUnit(unitName, count))

    return this
  }

  /**
   * Removes a unit from the army link.
   * @param unitName The name of the unit to remove.
  */
  public removeUnit (unitName: ArmyLinkUnitName) {
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
  public addSpell (spellName: ArmyLinkSpellName, count: number) {
    if (armyLinkSpellMap.has(spellName))
      this._spells.push(new ArmyLinkSpell(spellName, count))

    return this
  }

  /**
   * Removes a spell from the army link.
   * @param spellName The name of the spell to remove.
  */
  public removeSpell (spellName: ArmyLinkSpellName) {
    for (const spell of this._spells) {
      if (spell.name === spellName) {
        this._spells.splice(this._spells.indexOf(spell), 1)
        break
      }
    }

    return this
  }

  private build () {
    if (this._units.length === 0 && this._spells.length === 0) {
      return ARMY_LINK_URL
    }

    const clanCastleUnitPart = this._clanCastleUnits.length > 0 ? `i${this._clanCastleUnits.map(unit => unit.toString()).join('-')}` : ''
    const clanCastleSpellPart = this._clanCastleSpells.length > 0 ? `d${this._clanCastleSpells.map(spell => spell.toString()).join('-')}` : ''
    const heroPart = this._heroes.length > 0 ? `h${this._heroes.map(hero => hero.toString()).join('-')}` : ''
    const unitPart = this._units.length > 0 ? `u${this._units.map(unit => unit.toString()).join('-')}` : ''
    const spellPart = this._spells.length > 0 ? `s${this._spells.map(spell => spell.toString()).join('-')}` : ''

    return `${ARMY_LINK_URL}&army=${unitPart}${spellPart}${heroPart}${clanCastleUnitPart}${clanCastleSpellPart}`
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
