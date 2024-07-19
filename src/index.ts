import { Client } from './models/Client'
import { Clans } from './models/Clans'
import { Players } from './models/Players'

import {
  isValidTag,
  resolveTag
} from './helpers'

export default Client

export {
  Client,
  Clans,
  Players,
  isValidTag,
  resolveTag
}
