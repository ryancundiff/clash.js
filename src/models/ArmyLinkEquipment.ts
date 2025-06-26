import {
  armyLinkEquipmentMap,
  armyLinkEquipmentToHeroNameMap
} from '../shared'

import {
  ArmyLinkEquipmentName,
  ArmyLinkHeroName
} from '../types'

export class ArmyLinkEquipment {
  /** Name of equipment in army link. */
  public readonly name: ArmyLinkEquipmentName

  /** Name of hero associated with the equipment in army link. */
  public readonly hero: ArmyLinkHeroName

  constructor (name: ArmyLinkEquipmentName) {
    this.name = name
    this.hero = armyLinkEquipmentToHeroNameMap.get(name) as ArmyLinkHeroName
  }

  public toString () {
    return armyLinkEquipmentMap.get(this.name)!.toString()
  }
}