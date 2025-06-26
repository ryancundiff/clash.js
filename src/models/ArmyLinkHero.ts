import { ArmyLinkEquipment } from './ArmyLinkEquipment'

import {
  armyLinkHeroMap,
  armyLinkEquipmentToHeroNameMap
} from '../shared'

import { ArmyLinkEquipmentName, ArmyLinkHeroName } from '../types'

export class ArmyLinkHero {
  private _equipment: ArmyLinkEquipment[]

  /** Name of hero in army link. */
  public readonly name: ArmyLinkHeroName

  constructor (name: ArmyLinkHeroName, equipment: ArmyLinkEquipment[] = []) {
    this.name = name
    this._equipment = equipment.filter(equipment => armyLinkEquipmentToHeroNameMap.get(equipment.name) === name)
  }

  /** Array of equipment equipped by hero in army link, if any. */
  public get equipment (): ArmyLinkEquipment[] | null {
    return this._equipment.length > 0 ? this._equipment : null
  }

  /**
   * Adds equipment to hero in army link.
   * @param equipmentName The name of the equipment to add.
  */
  public addEquipment (equipmentName: ArmyLinkEquipmentName): this {
    if (this._equipment.length < 3
      && armyLinkEquipmentToHeroNameMap.get(equipmentName) === this.name
      && !this.hasEquipment(equipmentName)
    ) {
      this._equipment.push(new ArmyLinkEquipment(equipmentName))
    }

    return this
  }

  /**
   * Removes equipment from hero in army link.
   * @param equipmentName The name of the equipment to remove.
  */
  public removeEquipment (equipmentName: ArmyLinkEquipmentName): this {
    this._equipment = this._equipment.filter(equipment => equipment.name !== equipmentName)

    return this
  }

  /**
   * Checks if hero has a specific equipment.
   * @param equipmentName The name of the equipment to check.
  */
  public hasEquipment (equipmentName: ArmyLinkEquipmentName): boolean {
    return this._equipment.some(equipment => equipment.name === equipmentName)
  }

  public toString () {
    const equipmentPart = this._equipment.length > 0 ? `e${this._equipment.map(equipment => equipment.toString()).join('_')}` : ''

    return `${armyLinkHeroMap.get(this.name)}${equipmentPart}`
  }
}