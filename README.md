<div align="center">
  <p>
    <img src=https://developer.clashofclans.com/front-bg-small.d355db.jpg />
  </p>
</div>

<div align="center">
  <a href=https://www.npmjs.com/package/clash.js>
    <img src=https://img.shields.io/npm/v/clash.js />
  </a>
  <a href=https://www.npmjs.com/package/clash.js>
    <img src=https://img.shields.io/npm/dt/clash.js />
  </a>
</div>

## About
A lightweight and simple [Node.js](https://nodejs.org/en) module designed to streamline interactions with the [Clash of Clans API](https://developer.clashofclans.com/#/).
- **Promise-based** for asynchronous handling
- **Fully object-oriented** for intuitive usage
- **Predictable abstractions** for ease of development
- **Fully typed with JSDoc specifications** for improved code quality and developer experience
- **Automatic token creation and deletion** for if you don't have a static IP address

## Getting Started

### Prerequisites
- [Node.js 22.17.0](https://nodejs.org/en) or higher (previous versions may work but are not tested)

### Installation
Install package via [NPM](https://www.npmjs.com/package/clash.js):

```sh
  npm i clash.js
```

### Usage Example
Here's some basic examples of how to interact with clash.js:


```ts
import { Client } from 'clash.js'
```

> You can import by destructuring or by default import (eg: `import Client from 'clash.js'`).

```ts
const client = new Client({
  email: 'your@gmail.com',
  password: '*'
})
```

> Replace `your@gmail.com` with your email, and `*` with your password for your [Clash of Clans API](https://developer.clashofclans.com/#/) developer account.

```ts
const player = await client.getPlayer('#ABCDEFG')
```

> Replace `#ABCDEFG` with your player tag of choice. You could even provide a tag without a hashtag and lower-case characters (eg: `ab1d23e`) and it would resolve (eg: `#AB1D23E`).

```ts
const barbarianKing = player.getHero('Barbarian King')
```

> Look up a player's hero from their class object (parameter fully typed), or you could view a whole array of their heroes with the `heroes` data member of `Player`.

```ts
const biggerBetterAchievement = player.getAchievement('Bigger & Better')
```

> Look up a player's achievement from their class object (parameter fully typed), or you could view a whole array of their achievements with the `achievements` data member of `Player`.

```ts
const playerClan = await player.getClan()
```

> You can even retrieve a player's full clan from their class object without passing a tag as a parameter.

```ts
const capital = playerClan.capital
const golemQuarry = capital?.getDistrict('Golem Quarry')
```

> Look up a capital's district from it's class object (parameter fully typed).

```ts
const clan = await client.getClan('#ABCDEFG')
```

> You can also get a clan by providing a clan tag to the `getClan` member function of `Client`.

```ts
const war = await client.getWar('#ABCDEFG')
```

> You can get a clan's current war by providing a clan tag to the `getWar` member function of `Client`.

```ts
const ally = war.ally
const allyMembers = ally.members
const enemy = war.enemy
const enemyMembers = enemy.members
const firstAllyMember = allyMembers[0]
const bestEnemyAttack = firstAllyMember.bestEnemyAttack
```

> You can access members, attacks, and more with the `War` object.

```ts
const clans = new Clans(client)
  .add('#ABCDEFG')
  .set('description', (oldClan, newClan) => oldClan.description !== newClan.description)

clans.on('description', (oldClan, newClan) => {
  console.log(`${newClan.name} changed their description from '${oldClan.description}' to '${newClan.description}'`)
})

const players = new Players(client)
  .add('#ABCDEFG')
  .set('barbarian-king-upgrade', (oldPlayer, newPlayer) => oldPlayer.getHero('Barbarian King')?.level < newPlayer.getHero('Barbarian King')?.level )

players.on('barbarian-king-upgrade', (oldPlayer, newPlayer) => {
  console.log(`${newPlayer.name}'s Barbarian King upgraded to level ${newPlayer.getHero('Barbarian King')?.level}`)
})
```

> You can listen to events by using the `Clans` and `Players` polling classes.

```ts
import { Images } from 'clash.js'

const townHall = player.townHall
const builderHall = player.builderHall

const townHallImageURL = Images.getTownHall(townHall)
const builderHallImageURL = Images.getBuilderHal(builderHall)

const capitalHall = capital?.level
const golemQuarryHall = golemQuarry?.level

const capitalHallImageURL = Images.getCapitalHall(capitalHall)
const golemQuarryHallImageURL = Images.getDistrictHall(golemQuarryHall)
```

> You can get images of buildings and (eventually) troops, spells, equipment, etc. with the `Images` class.

### And there's even more...
Use [clash.js](https://www.npmjs.com/package/clash.js) in your Clash of Clan's project workflow and let your intellisense thank you later!
