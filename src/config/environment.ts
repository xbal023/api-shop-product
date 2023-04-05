import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  DB: process.env.DB,
  RDM: process.env.RANDOM_STR
}

export default CONFIG
