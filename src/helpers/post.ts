export async function post (url: string, requestInit: RequestInit) {
  const response = await fetch(url, {
    method: 'POST',
    ...requestInit
  })

  const responseBody = await response.json()

  return {
    status: response.status,
    headers: response.headers,
    body: responseBody 
  }
}
