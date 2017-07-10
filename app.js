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
  console.log('Stublr scraper waiting to run')
  signalingRef.on('child_added', s => {
    console.log('ticket on sale scraper running')
    //remove the signal once scraper runs
    let key = s.key
    loginToStublr()
    .then(getSalesList)
    .then(parseSalesPage)
    .then(saveEventList)
    .then(() => signalingRef.child(key).remove())
    .catch(console.log)

  })
 }

 start()