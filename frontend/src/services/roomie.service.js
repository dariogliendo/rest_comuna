import { axiosInstance } from "./axios.service";

const roomieService = {
  get,
  save,
}

async function get() {
  try {
    const { data } = await axiosInstance.get('/API/roomies')
    return data
  } catch (error) {
    console.error(error)
  }
}

async function save(req) {
  await axiosInstance.post('/API/roomies', req)
}

export default roomieService