const defineError = (error) => {
  return error.response?.data?.message
    ? error.response.data.message
    : error.message
}

export default defineError
