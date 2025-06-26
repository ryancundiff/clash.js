import { Client } from './Client'
import { Pet } from './Pet'
import { PlayerClan } from './PlayerClan'
import { Troop } from './Troop'
import { SuperTroop } from './SuperTroop'
import { SiegeMachine } from './SiegeMachine'
import { Hero } from './Hero'
import { Spell } from './Spell'
import { Equipment } from './Equipment'
import { League } from './League'
import { BuilderBaseLeague } from './BuilderBaseLeague'
import { Label } from './Label'
import { Achievement } from './Achievement'
import { LegendStatistics } from './LegendStatistics'
import { House } from './House'

import { getWithNameFromSet } from '../helpers'

import {
  builderBaseHeroNameSet,
  darkElixirSpellNameSet,
  darkElixirTroopNameSet,
  elixirSpellNameSet,
  elixirTroopNameSet,
  homeHeroNameSet,
  petNameSet,
  roleMap,
  siegeMachineNameSet,
  superTroopNameSet,
  troopNameSet
} from '../shared'

import type {
  APIPlayer,
  Role,
  EquipmentName,
  HeroName,
  PetName,
  SpellName,
  SuperTroopName,
  TroopName,
  SiegeMachineName,
  LabelName,
  AchievementName,
  TownHallLevel,
  BuilderHallLevel
} from '../types'

export class Player {
  /** Name of player. */
  public readonly name: string

  /** Tag of player. */
  public readonly tag: string

  /** Level of player. */
  public readonly level: number

  /** Array of player's labels. */
  public readonly labels: Array<Label> | null

  /** Array of player's achievements. */
  public readonly achievements: Array<Achievement>

  /** Legend statistics of player. */
  public readonly legendStatistics: LegendStatistics | null

  /** Current league of player. */
  public readonly league: League | null

  /** Current builder base league of player. */
  public readonly builderBaseLeague: BuilderBaseLeague | null

  /** Clan of player, if in one. */
  public readonly clan: PlayerClan | null

  /** Amount of troops donated by player. */
  public readonly troopsDonated: number

  /** Amount of troops received by player. */
  public readonly troopsReceived: number

  /** Amount of contribution to clan capital by player. */
  public readonly capitalContribution: number

  /** Current role of player in clan, if in one. */
  public readonly role: Role | null

  /** Amount of trophies player has earned. */
  public readonly trophies: number

  /** All-time best amount of trophies player has earned. */
  public readonly bestTrophies: number

  /** Amount of builder base trophies player has earned. */
  public readonly builderBaseTrophies: number | null

  /** All-time best amount of builder base trophies player has earned. */
  public readonly bestBuilderBaseTrophies: number | null

  /** If player is opted-in for clan wars. */
  public readonly isOptedIn: boolean

  /** All-time amount of war stars player has earned. */
  public readonly warStars: number

  /** Amount of wins player has earned by attacking. */
  public readonly attackWins: number

  /** Amount of wins player has earned in defense. */
  public readonly defenseWins: number

  /** Current town hall level of player. */
  public readonly townHall: TownHallLevel

  /** Current town hall weapon level of player, if has one. */
  public readonly townHallWeapon: number | null

  /** Current builder hall level of player, if has one. */
  public readonly builderHall: BuilderHallLevel | null

  /** Array of troops player has unlocked. */
  public readonly troops: Array<Troop>

  /** Array of super troops player has unlocked, if any. */
  public readonly superTroops: Array<SuperTroop> | null

  /** Array of pets player has unlocked, if any. */
  public readonly pets: Array<Pet> | null

  /** Array of siege machines player has unlocked, if any. */
  public readonly siegeMachines: Array<SiegeMachine> | null

  /** Array of heroes player has unlocked, if any. */
  public readonly heroes: Array<Hero> | null

  /** Array of spells player has unlocked, if any. */
  public readonly spells: Array<Spell> | null

  /** Array of equipment player has unlocked, if any. */
  public readonly equipment: Array<Equipment> | null

  /** House of player, if has one. */
  public readonly house: House | null

  constructor (
    private client: Client,
    data: APIPlayer
  ) {
    this.name = data.name
    this.tag = data.tag
    this.level = data.expLevel

    this.labels = data.labels.length > 0
      ? data.labels.map(data => new Label(data))
      : null

    this.achievements = data.achievements.map(data => new Achievement(data))

    this.legendStatistics = data.legendStatistics
      ? new LegendStatistics(data.legendStatistics)
      : null

    this.league = data.league
      ? new League(data.league)
      : null

    this.builderBaseLeague = data.builderBaseLeague
      ? new BuilderBaseLeague(data.builderBaseLeague)
      : null

    this.clan = data.clan
      ? new PlayerClan(client, data.clan)
      : null
    
    this.troopsDonated = data.donations
    this.troopsReceived = data.donationsReceived
    this.capitalContribution = data.clanCapitalContributions
    
    this.role = roleMap.has(data.role)
      ? roleMap.get(data.role) as Role
      : data.role as Role ?? null
    
    this.trophies = data.trophies
    this.bestTrophies = data.bestTrophies
    this.builderBaseTrophies = data.builderBaseTrophies
    this.bestBuilderBaseTrophies = data.bestBuilderBaseTrophies
    this.isOptedIn = data.warPreference == 'in'
    this.warStars = data.warStars
    this.attackWins = data.attackWins
    this.defenseWins = data.defenseWins
    this.townHall = data.townHallLevel as TownHallLevel
    this.townHallWeapon = data.townHallWeaponLevel ?? null
    this.builderHall = data.builderHallLevel as BuilderHallLevel | undefined ?? null
    
    this.troops = getWithNameFromSet(data.troops, troopNameSet)!.map(data => new Troop(data))

    this.superTroops = getWithNameFromSet(data.troops, superTroopNameSet)?.map(data => new SuperTroop(data)) ?? null

    this.pets = getWithNameFromSet(data.troops, petNameSet)?.map(data => new Pet(data)) ?? null

    this.siegeMachines = getWithNameFromSet(data.troops, siegeMachineNameSet)?.map(data => new SiegeMachine(data)) ??  null

    this.spells = data.spells
      ? data.spells.map(data => new Spell(data))
      : null

    this.heroes = data.heroes
      ? data.heroes.map(data => new Hero(data))
      : null

    this.equipment = data.heroEquipment
      ? data.heroEquipment.map(data => new Equipment(data))
      : null

    this.house = data.playerHouse
      ? new House(data.playerHouse)
      : null
  }

  /** Array of elixir troops player has unlocked. */
  public get elixirTroops () {
    return getWithNameFromSet(this.troops, elixirTroopNameSet)
  }

  /** Array of dark elixir troops player has unlocked, if any. */
  public get darkElixirTroops () {
    return getWithNameFromSet(this.troops, darkElixirTroopNameSet)
  }

  /** Array of elixir spells player has unlocked, if any. */
  public get elixirSpells () {
    if (this.spells) {
      return getWithNameFromSet(this.spells, elixirSpellNameSet)
    }

    return null
  }

  /** Array of dark elixir spells player has unlocked, if any. */
  public get darkElixirSpells () {
    if (this.spells) {
      return getWithNameFromSet(this.spells, darkElixirSpellNameSet)
    }

    return null
  }

  /** Array of super troops player has active, if any. */
  public get activeSuperTroops () {
    if (this.superTroops) {
      const activeSuperTroops = new Array<SuperTroop>

      for (const superTroop of this.superTroops) {
        if (superTroop.isActive) {
          activeSuperTroops.push(superTroop)
        }
      }

      return activeSuperTroops.length > 0
        ? activeSuperTroops
        : null
    }

    return null
  }

  /** Array of home heroes player has unlocked, if any. */
  public get homeHeroes () {
    if (this.heroes) {
      return getWithNameFromSet(this.heroes, homeHeroNameSet)
    }

    return null
  }

  /** Array of builder base heroes player has unlocked, if any. */
  public get builderBaseHeroes () {
    if (this.heroes) {
      return getWithNameFromSet(this.heroes, builderBaseHeroNameSet)
    }

    return null
  }

  /** Resolve clan from player clan, if in one. */
  public async getClan () {
    if (this.clan) {
      return await this.client.getClan(this.clan.tag)
    }

    return null
  }

  /**
   * Check if player has a specific label set.
   * @param labelName Name of label.
  */
  public hasLabel (labelName: LabelName) {
    if (this.labels) {
      for (const label of this.labels) {
        if (label.name == labelName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Check if player has a specific troop unlocked.
   * @param troopName Name of troop.
  */
  public hasTroop (troopName: TroopName) {
    for (const troop of this.troops) {
      if (troop.name == troopName) {
        return true
      }
    }

    return false
  }

  /**
   * Check if player has a specific super troop unlocked.
   * @param superTroopName Name of super troop.
  */
  public hasSuperTroop (superTroopName: SuperTroopName) {
    if (this.superTroops) {
      for (const superTroop of this.superTroops) {
        if (superTroop.name == superTroopName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Check if player has a specific pet unlocked.
   * @param petName Name of pet.
  */
  public hasPet (petName: PetName) {
    if (this.pets) {
      for (const pet of this.pets) {
        if (pet.name == petName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Check if player has a specific siege machine unlocked.
   * @param siegeMachineName Name of siege machine.
  */
  public hasSiegeMachine (siegeMachineName: SiegeMachineName) {
    if (this.siegeMachines) {
      for (const siegeMachine of this.siegeMachines) {
        if (siegeMachine.name == siegeMachineName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Check if player has a specific hero unlocked.
   * @param heroName Name of hero.
  */
  public hasHero (heroName: HeroName) {
    if (this.heroes) {
      for (const hero of this.heroes) {
        if (hero.name == heroName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Check if player has a specific spell unlocked.
   * @param spellName Name of spell.
  */
  public hasSpell (spellName: SpellName) {
    if (this.spells) {
      for (const spell of this.spells) {
        if (spell.name == spellName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Check if player has a specific equipment unlocked.
   * @param equipmentName Name of equipment.
  */
  public hasEquipment (equipmentName: EquipmentName) {
    if (this.equipment) {
      for (const equipment of this.equipment) {
        if (equipment.name == equipmentName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Get label of given name from player, if set.
   * @param labelName Name of label.
  */
  public getLabel (labelName: LabelName) {
    if (this.labels) {
      for (const label of this.labels) {
        if (label.name == labelName) {
          return label
        }
      }
    }

    return null
  }

  /**
   * Get troop of given name from player, if unlocked.
   * @param troopName Name of troop.
  */
  public getTroop (troopName: TroopName) {
    for (const troop of this.troops) {
      if (troop.name == troopName) {
        return troop
      }
    }

    return null
  }

  /**
   * Get super troop of given name from player, if unlocked.
   * @param superTroopName Name of super troop.
  */
  public getSuperTroop (superTroopName: SuperTroopName) {
    if (this.superTroops) {
      for (const superTroop of this.superTroops) {
        if (superTroop.name == superTroopName) {
          return superTroop
        }
      }
    }

    return null
  }

  /**
   * Get pet of given name from player, if unlocked.
   * @param petName Name of pet.
  */
  public getPet (petName: PetName) {
    if (this.pets) {
      for (const pet of this.pets) {
        if (pet.name == petName) {
          return pet
        }
      }
    }

    return null
  }

  /**
   * Get siege machine of given name from player, if unlocked.
   * @param siegeMachineName Name of siege machine.
  */
  public getSiegeMachine (siegeMachineName: SiegeMachineName) {
    if (this.siegeMachines) {
      for (const siegeMachine of this.siegeMachines) {
        if (siegeMachine.name == siegeMachineName) {
          return siegeMachine
        }
      }
    }

    return null
  }

  /**
   * Get spell of given name from player, if unlocked.
   * @param spellName Name of spell.
  */
  public getSpell (spellName: SpellName) {
    if (this.spells) {
      for (const spell of this.spells) {
        if (spell.name == spellName) {
          return spell
        }
      }
    }

    return null
  }

  /**
   * Get hero of given name from player, if unlocked.
   * @param heroName Name of hero.
  */
  public getHero (heroName: HeroName) {
    if (this.heroes) {
      for (const hero of this.heroes) {
        if (hero.name == heroName) {
          return hero
        }
      }
    }

    return null
  }

  /**
   * Get equipment of given name from player, if unlocked.
   * @param equipmentName Name of equipment.
  */
  public getEquipment (equipmentName: EquipmentName) {
    if (this.equipment) {
      for (const equipment of this.equipment) {
        if (equipment.name == equipmentName) {
          return equipment
        }
      }
    }

    return null
  }

  /**
   * Get achievement of given name from player, if has one.
   * @param achievementName Name of achievement.
  */
  public getAchievement (achievementName: AchievementName) {
    for (const achievement of this.achievements) {
      if (achievement.name == achievementName) {
        return achievement
      }
    }

    return null
  }
}
