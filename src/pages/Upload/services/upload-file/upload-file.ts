import axios from 'axios'

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await axios.post(`${import.meta.env.REACT_APP_SERVER}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return {
      data
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      return {
        error: 'There was a problem with the server'
      }
    } else if (err.response) {
      return {
        error: err.response.data.msg
      }
    }
    return {
      error: 'An error occurred while uploading the file'
    }
  }
}
