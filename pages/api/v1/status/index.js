import database from 'infra/database'

async function status(request, response){
  const updatedAt = new Date().toISOString()
  const resVersion = await database.query('SHOW server_version;') // select version();
  const resMaxConections = await database.query('SHOW max_connections') //SELECT COUNT(*) FROM pg_stat_activity;
  const databaseName =process.env.POSTGRES_DB
  const resActiceConections = await database.query(
    {text: `SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1 AND state = 'active';`,
    values: [databaseName]}
  ) 
  const version = resVersion.rows[0].server_version
  const max_connections= resMaxConections.rows[0].max_connections
  const active_connections = resActiceConections.rows[0].count

  response.status(200).json({
    updated_at: updatedAt,
    "dependencies":{
      "database":{
        version: version,
        max_connections: Number(max_connections),
        active_connections: active_connections
      }
    }
  })
}

export default status 