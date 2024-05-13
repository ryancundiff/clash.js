export async function get (url: string, requestInit: RequestInit) {
  const response = await fetch(url, requestInit)

  const responseBody = await response.json()

  return {
    status: response.status,
    body: responseBody
  }
}
