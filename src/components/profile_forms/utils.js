function getJwtExpiration(token) {
  const payloadBase64 = token.split('.')[1]
  const payload = JSON.parse(atob(payloadBase64))
  return payload.exp * 1000
}

export { getJwtExpiration }
