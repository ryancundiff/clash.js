export const statusCodeMap = new Map([
  [ 404, 'Not Found' ],
  [ 500, 'Internal Server Error' ]
])

export const roleMap = new Map([
  [ 'coLeader', 'co-leader' ],
  [ 'admin', 'elder' ]
])

export const clanTypeMap = new Map([
  [ 'inviteOnly', 'invite-only' ]
])

export const warFrequencyMap = new Map([
  [ 'lessThanOncePerWeek', 'less-than-once-per-week' ],
  [ 'oncePerWeek', 'once-per-week' ],
  [ 'moreThanOncePerWeek', 'more-than-once-per-week' ]
])

export const villageMap = new Map([
  [ 'builderBase', 'builder-base' ],
  [ 'clanCapital', 'clan-capital' ]
])

export const warStateMap = new Map([
  [ 'inWar', 'in-war' ],
  [ 'warEnded', 'war-ended' ]
])

export const clanSearchOptionsMap = new Map([
  [ 'locationID', 'locationId' ],
  [ 'minPoints', 'minClanPoints' ],
  [ 'minLevel', 'minClanLevel' ]
])

export const warResultMap = new Map([
  [ 'lose', 'loss' ]
])

export const achievementMap = new Map([
  ['Crafter’s Nightmare', 'Crafter\'s Nightmare']
])

export const armyLinkUnitMap = new Map([
  [ 'Barbarian', 0 ],
  [ 'Archer', 1 ],
  [ 'Goblin', 2 ],
  [ 'Giant', 3 ],
  [ 'Wall Breaker', 4 ],
  [ 'Balloon', 5 ],
  [ 'Wizard', 6 ],
  [ 'Healer', 7 ],
  [ 'Dragon', 8 ],
  [ 'P.E.K.K.A', 9 ],
  [ 'Minion', 10 ],
  [ 'Hog Rider', 11 ],
  [ 'Valkyrie', 12 ],
  [ 'Golem', 13 ],
  [ 'Witch', 15 ],
  [ 'Lava Hound', 17 ],
  [ 'Bowler', 22 ],
  [ 'Baby Dragon', 23 ],
  [ 'Miner', 24 ],
  [ 'Super Barbarian', 26 ],
  [ 'Super Archer', 27 ],
  [ 'Super Wall Breaker', 28 ],
  [ 'Super Giant', 29 ],
  [ 'Yeti', 53 ],
  [ 'Sneaky Goblin', 55 ],
  [ 'Super Miner', 56 ],
  [ 'Rocket Balloon', 57 ],
  [ 'Ice Golem', 58 ],
  [ 'Electro Dragon', 59 ],
  [ 'Inferno Dragon', 63 ],
  [ 'Super Valkyrie', 64 ],
  [ 'Dragon Rider', 65 ],
  [ 'Super Witch', 66 ],
  [ 'Ice Hound', 76 ],
  [ 'Super Bowler', 80 ],
  [ 'Super Dragon', 81 ],
  [ 'Headhunter', 82 ],
  [ 'Super Wizard', 83 ],
  [ 'Super Minion', 84 ],
  [ 'Electro Titan', 95 ],
  [ 'Apprentice Warden', 97 ],
  [ 'Super Hog', 98 ],
  [ 'Root Rider', 110 ],
  [ 'Druid', 123 ],
  [ 'Thrower', 132 ],
  [ 'Super Yeti', 147 ],
  [ 'Furnace', 150 ],
  [ 'Ice Wizard', 30 ],
  [ 'Battle Ram', 45 ],
  [ 'Royal Ghost', 47 ],
  [ 'Pumpkin Barbarian', 48 ],
  [ 'Giant Skeleton', 50 ],
  [ 'Skeleton Barrel', 61 ],
  [ 'El Primo', 67 ],
  [ 'Party Wizard', 72 ],
  [ 'Firecracker', 119 ],
  [ 'Azure Dragon', 120 ],
  [ 'Snake Barrel', 142 ],
  [ 'Wall Wrecker', 51 ],
  [ 'Battle Blimp', 52 ],
  [ 'Stone Slammer', 62 ],
  [ 'Siege Barracks', 75 ],
  [ 'Log Launcher', 87 ],
  [ 'Flame Flinger', 91 ],
  [ 'Battle Drill', 92 ],
  [ 'Troop Launcher', 135 ]
])

// @ts-ignore
export const armyLinkUnitNameMap = new Map(armyLinkUnitMap.entries().map(([name, id]) => [id, name]))

// TODO: Add Ice Block Spell.
export const armyLinkSpellMap = new Map([
  [ 'Lightning Spell', 0 ],
  [ 'Healing Spell', 1 ],
  [ 'Rage Spell', 2 ],
  [ 'Jump Spell', 3 ],
  [ 'Freeze Spell', 5 ],
  [ 'Poison Spell', 9 ],
  [ 'Earthquake Spell', 10 ],
  [ 'Haste Spell', 11 ],
  [ 'Clone Spell', 16 ],
  [ 'Skeleton Spell', 17 ],
  [ 'Bat Spell', 28 ],
  [ 'Invisibility Spell', 35 ],
  [ 'Recall Spell', 53 ],
  [ 'Overgrowth Spell', 70 ],
  [ 'Revive Spell', 98 ],
  [ 'Santa\'s Surprise', 4 ],
  [ 'Birthday Boom', 22 ]
])

// @ts-ignore
export const armyLinkSpellNameMap = new Map(armyLinkSpellMap.entries().map(([name, id]) => [id, name]))