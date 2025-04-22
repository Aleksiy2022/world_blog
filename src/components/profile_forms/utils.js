function getJwtExpiration(token) {
  const payloadBase64 = token.split('.')[1]
  const payload = JSON.parse(atob(payloadBase64))
  return payload.exp ? new Date(payload.exp * 1000) : null
}

export { getJwtExpiration }
