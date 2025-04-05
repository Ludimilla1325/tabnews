import database from "infra/database";


async function cleanDatabase(){
  await database.query("drop schema public cascade; create schema public;")
}

beforeEach(cleanDatabase)

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations")
  console.log('response', response);
  
  expect(response.status).toBe(200)
  
  const responseBody = await response.json();
  database.query('select 1+1')

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0)
});