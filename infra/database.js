import {Client} from 'pg'

async function query(queryObject){
  let client;
  try {
    client = await getNewClient()
    const result = await client.query(queryObject)
    return result
  } catch (error) {
    console.error('Error running query', error)
    throw error
  } finally{
    await client.end()
  }
}

async function getNewClient(){
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: process.env.NODE_ENV === 'production' ? true : false
  })

  await client.connect()
  return client
}

export default {
  query,
  getNewClient
}