import faunadb from 'faunadb'

export const faunaServerClient = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET as string,
  domain: process.env.FAUNA_DB_HOST as string,
  scheme: 'https',
})
