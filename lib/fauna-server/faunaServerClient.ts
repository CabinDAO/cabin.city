import faunadb from 'faunadb'

const PORT = process.env.FAUNA_DB_PORT
  ? parseInt(process.env.FAUNA_DB_PORT)
  : 443

export const faunaServerClient = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET as string,
  domain: process.env.FAUNA_DB_HOST as string,
  port: PORT,
  scheme: PORT == 443 ? 'https' : 'http',
})
