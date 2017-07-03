import cheerio from 'cheerio'
export const parseSalesPage = html => {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html, {
      normalizeWhitespace:true
    })
    let salesTableRows = $('.eventlist > tbody > tr').toArray()
    let saleTimeBars = $("td[class='saletimebar']").toArray()
    let events = []
    let onSaleDate
    let onSaleTime
    salesTableRows.forEach(row => {
      let tableCells = $(row).children('td').toArray()
      let saleTimeStampIdentifier = new RegExp('Sales Starting')
      if(tableCells.length > 0) {
          let event = {}
          let firstCell = $(tableCells[0]).text()
         if(saleTimeStampIdentifier.test(firstCell)) {
            let dateAndTime = firstCell.split('Sales Starting')[1].split('at')
            onSaleDate = dateAndTime[0].trim()
            onSaleTime = dateAndTime[1].trim()
         }
         else {
          events.push({
            eventName: firstCell,
            city: $($(tableCells[1]).html().split('<br>')).toArray()[1].split('<a')[0].trim(),
            venue:$($(tableCells[1]).html().split('<br>')).toArray()[0].trim(),
            eventDate:$($(tableCells[2]).html().split('<br>')).toArray()[1].trim(),
            merchant:$(tableCells[3]).text().trim(),
            publicSaleUrl:$(tableCells[4]).html().split('href="')[1].split('title')[0].split('"')[0],
            provider: 'Stublr',
            password: $(tableCells[4]).children('img').attr('title'),
            ticketLink:'',
            onSaleDate,
            onSaleTime
          })
         }
      }
    })
    resolve(events)
  })
}