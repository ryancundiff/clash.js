export const petNameSet = new Set([
  'L.A.S.S.I',
  'Electro Owl',
  'Mighty Yak',
  'Unicorn',
  'Frosty',
  'Diggy',
  'Poison Lizard',
  'Phoenix',
  'Spirit Fox',
  'Angry Jelly',
  'Sneezy'
])

export const elixerTroopNameSet = new Set ([
  'Barbarian',
  'Archer',
  'Giant',
  'Goblin',
  'Wall Breaker',
  'Balloon',
  'Wizard',
  'Healer',
  'Dragon',
  'P.E.K.K.A',
  'Baby Dragon',
  'Miner',
  'Electro Dragon',
  'Yeti',
  'Dragon Rider',
  'Electro Titan',
  'Root Rider',
  'Thrower'
])

export const darkElixerTroopNameSet = new Set ([
  'Minion',
  'Hog Rider',
  'Valkyrie',
  'Golem',
  'Witch',
  'Lava Hound',
  'Bowler',
  'Ice Golem',
  'Headhunter',
  'Apprentice Warden',
  'Druid',
  'Furnace'
])

export const troopNameSet = new Set ([
  ...Array.from(elixerTroopNameSet),
  ...Array.from(darkElixerTroopNameSet)
])

export const superTroopNameSet = new Set([
  'Super Barbarian',
  'Super Archer',
  'Super Giant',
  'Sneaky Goblin',
  'Super Wall Breaker',
  'Rocket Balloon',
  'Super Wizard',
  'Super Dragon',
  'Inferno Dragon',
  'Super Miner',
  'Super Minion',
  'Super Hog Rider',
  'Super Valkyrie',
  'Super Witch',
  'Ice Hound',
  'Super Bowler'
])

export const siegeMachineNameSet = new Set([
  'Wall Wrecker',
  'Battle Blimp',
  'Stone Slammer',
  'Siege Barracks',
  'Log Launcher',
  'Flame Flinger',
  'Battle Drill',
  'Troop Launcher'
])

export const homeHeroNameSet = new Set([
  'Barbarian King',
  'Archer Queen',
  'Grand Warden',
  'Royal Champion',
  'Minion Prince'
])

export const builderBaseHeroNameSet = new Set([
  'Battle Machine',
  'Battle Copter'
])

export const districtNameSet = new Set([
  'Barbarian Camp',
  'Wizard Valley',
  'Balloon Lagoon',
  'Builder\'s Workshop',
  'Dragon Cliffs',
  'Golem Quarry',
  'Skeleton Park',
  'Goblin Mines'
])

export const elixerSpellNameSet = new Set([
  'Lightning Spell',
  'Healing Spell',
  'Rage Spell',
  'Jump Spell',
  'Freeze Spell',
  'Clone Spell',
  'Invisibility Spell',
  'Recall Spell',
  'Revive Spell'
])

export const darkElixerSpellNameSet = new Set([
  'Poison Spell',
  'Earthquake Spell',
  'Haste Spell',
  'Skeleton Spell',
  'Bat Spell',
  'Overgrowth Spell',
  'Ice Block Spell'
])
