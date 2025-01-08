import database from '../../../../infra/database'

async function status(request, response){
  const result = await database.query({text: 'SELECT NOW()'})
  console.log(result.rows[0].now)
  response.status(200).json({"teste": "teste"})
}

export default status