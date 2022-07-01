import { hRequest } from '@/lib'

export function getUserInfo(url) {
  return hRequest.get({
    url: url,
  })
}

export function userSignIn(url) {
  return hRequest.get({
    url: url,
  })
}

export function jdName(url) {
  return hRequest.get({
    url: url,
  })
}

export function addJdUsername(url, data) {
  return hRequest.post({
    url: url,
    data,
  })
}

export function removeJdName(url, data) {
  return hRequest.post({
    url: url,
    data,
  })
}

export function getPointLog(url, data) {
  return hRequest.post({
    url: url,
    data,
  })
}
