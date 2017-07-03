import agent from 'superagent-bluebird-promise'
import { headers, onSaleRef } from './config'


export const loginToStublr = (username, password, headers) => {
  return agent
          .post('http://stublr.com/my-account/')
          .set(headers)
          .send({username, password})
          .then(res => res)
          .catch(err => err)
}

export const getLoginHeaders = () => {
  return agent
          .get('http://stublr.com')
          .then(res => res.req._headers)
          .catch(err => err)
}

export const getSalesList = (headers) => {
  return agent
          .get('http://stublr.com/sales-list')
          .set(headers)
          .then(res => res.text)
          .catch(err => err)
}

export const saveEventList = (events) => {
  return Promise.all(Promise.map(events, event => {
    return onSaleRef.push(event)
  }))
}