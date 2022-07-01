import axios from 'axios'

export default async function useStatus(api) {
  let carStatus
  let carTag
  let carTxt
  const { data } = await axios.get(api)
  carStatus = data.status
  if (carStatus == 1) {
    carTag = 'danger'
    carTxt = '繁忙'
  } else if (carStatus == 2) {
    carTag = 'warning'
    carTxt = 'IP封禁'
  } else {
    carTag = 'success'
    carTxt = '空闲'
  }
  return { carTag, carTxt }
}
