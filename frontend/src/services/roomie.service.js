import { axiosInstance } from "./axios.service";

const roomieService = {
  get,
  save,
  remove,
  modify
}

async function get(req) {
  try {
    if (req && !isNaN(req.id)) {
      const { data } = await axiosInstance.get(`API/roomies/${req.id}/`)
      return data
    }
    const { data } = await axiosInstance.get('API/roomies')
    return data
  } catch (error) {
    console.error(error)
  }
}

async function save(req) {
  try {
    await axiosInstance.post('API/roomies', req)
  } catch (error) {
    console.error(error)
  }
}

async function remove(req) {
  try {
    await axiosInstance.delete(`API/roomies/${req.id}/`)
  } catch (error) {
    console.error(error)
  }
}

async function modify(req) {
  try {
    const result = await axiosInstance.put(`API/roomies/${req.id}/`, req)
    return result
  } catch (error) {
    console.error(error)
  }
}

export default roomieService