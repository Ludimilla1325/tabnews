test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200)

  const responseBody = await response.json()
  expect(responseBody.updated_at).toBeDefined()
  expect(responseBody.dependencies.database.version).toBeDefined()
  expect(responseBody.dependencies.database.version).toEqual("16.0")
  expect(responseBody.dependencies.database.max_connections).toBeDefined()
  expect(responseBody.dependencies.database.max_connections).toEqual(100)
  expect(responseBody.dependencies.database.active_connections).toBeDefined()
  expect(responseBody.dependencies.database.active_connections).toEqual(1)
  expect(typeof responseBody.updated_at).toBe('string')
  expect(typeof responseBody.dependencies.database.version).toBe('string')
  expect(typeof responseBody.dependencies.database.max_connections).toBe('number')
  expect(typeof responseBody.dependencies.database.active_connections).toBe('number')
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(responseBody.dependencies.database.active_connections)

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)
});