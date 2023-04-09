import { axiosInstance } from "./axios.service";

const roomieService = {
  get,
  save,
}

async function get() {
  try {
    const { data } = await axiosInstance.get('/API/')
    return data
  } catch (error) {
    console.error(error)
  }
}

async function save(req) {
  const { data } = await axiosInstance.post('/API/', req)
  console.log(data)
}

export default roomieService