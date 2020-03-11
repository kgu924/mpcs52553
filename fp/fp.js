
document.addEventListener("DOMContentLoaded", function() {

  document.querySelector("input").addEventListener("change",add_element)
})



async function getPrice(stock_ticker) {
  let myapikey = "sk_629a4c50ec714bcaa17d87c45546dd80"
  let quote_url = `https://cloud.iexapis.com/stable/stock/${stock_ticker}/quote?token=${myapikey}`

  let http_response = await fetch(quote_url)
  let stock_data = await http_response.json()

  let price = stock_data.latestPrice 

  return price;

}

async function add_element(e) {
    let stock_name = this.value
    const wall = document.querySelector("#stocks");
    let item = document.createElement("div")
    item.classList.add("col-3")

    let card = document.createElement("div")
    card.classList.add("card")
    let cardbody = document.createElement("div")
    cardbody.classList.add("card-body")
    let cardtitle = document.createElement("h5")
    cardtitle.classList.add("card-title")
    let cardtext = document.createElement("p")
    cardtext.classList.add("card-text")

    let stock_title = document.createTextNode(stock_name)
    let stock_price = await getPrice(stock_name)
    let stock_info = document.createTextNode("Price: " + stock_price + "\nQuantity:" + 10)

    cardtitle.appendChild(stock_title)
    cardtext.appendChild(stock_info)

    cardbody.appendChild(cardtitle)
    cardbody.appendChild(cardtext)

    card.appendChild(cardbody)

    item.appendChild(card)
    wall.appendChild(item)


}