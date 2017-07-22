import { 
  loginToStublr,
  getSalesList,
  saveEventList
 } from './helpers'
 import {
  parseSalesPage
 } from './parser'
 import { signalingRef } from './config'

 const start = () => {
    return loginToStublr()
    .then(headers => {
      let promises = []
      for(var i=0; i< 37; i++) {
        promises.push(getSalesList(headers, i))
      }
      return Promise.all(promises)
    })
    .map(parseSalesPage)
    .map(saveEventList)
    .then(() => console.log('done'))
    .catch(console.log)
 }

setInterval(() => start(), 86400000)