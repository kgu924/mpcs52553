
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("form").addEventListener("submit",buy_or_sell)
  document.querySelector("#tickerCol").addEventListener("dblclick",sort_table)
  document.querySelector("#tickerQuantity").addEventListener("dblclick",sort_table)
  document.querySelector("#tickerPrice").addEventListener("dblclick",sort_table)
  document.querySelector("#tickerValue").addEventListener("dblclick",sort_table)
})

// stock_array=[]
// localStorage.setItem("stock_array", JSON.stringify(stock_array));
// console.log(JSON.parse(localStorage.getItem("stock_array")))


async function getPrice(stock_ticker) {
  let myapikey = "sk_629a4c50ec714bcaa17d87c45546dd80"
  let quote_url = `https://cloud.iexapis.com/stable/stock/${stock_ticker}/quote?token=${myapikey}`

  let http_response = await fetch(quote_url)
  let stock_data = await http_response.json()

  let price = stock_data.latestPrice 

  return price;

}

function add_element(stock_name,stock_quantity,stock_price) {

    // let stock_price = await getPrice(stock_name)

    // const wall = document.querySelector("#stocks");
    // let item = document.createElement("div")
    // item.classList.add("col-9")

    // let card = document.createElement("div")
    // card.classList.add("card")
    // let cardbody = document.createElement("div")
    // cardbody.classList.add("card-body")
    // let cardtitle = document.createElement("h5")
    // cardtitle.classList.add("card-title")
    // let cardtext = document.createElement("p")
    // cardtext.classList.add("card-text")

    // let stock_title = document.createTextNode(stock_name)
    // let stock_info = document.createTextNode("Price: " + stock_price + "\nQuantity:" + stock_quantity + "\nValue:" + (stock_quantity*stock_price))

    // cardtitle.appendChild(stock_title)
    // cardtext.appendChild(stock_info)

    // cardbody.appendChild(cardtitle)
    // cardbody.appendChild(cardtext)

    // card.appendChild(cardbody)

    // item.appendChild(card)
    // wall.appendChild(item)

    const stock_table = document.querySelector("tbody");
    let item = document.createElement("tr")

    let row_ticker = document.createElement("td")
    let row_quantity = document.createElement("td")
    let row_price = document.createElement("td")
    let row_value = document.createElement("td")

    row_ticker.append(document.createTextNode(stock_name))
    row_quantity.append(document.createTextNode(stock_quantity))
    row_price.append(document.createTextNode(stock_price))
    row_value.append(document.createTextNode((stock_quantity*stock_price)))

    item.append(row_ticker)
    item.append(row_quantity)
    item.append(row_price)
    item.append(row_value)

    stock_table.append(item)

}

async function update_stock_array(stock_array){

    for (stock of stock_array) {

        let stock_price = await getPrice(stock[0])
        stock[2] = stock_price
     
    } 

    return stock_array
}

async function buy_or_sell(event){
    event.preventDefault();
    if (document.activeElement.innerText == "Buy") {
        buy_stock(event)
    }
    else if (document.activeElement.innerText == "Sell") {
        sell_stock(event)
    }
    else {
       return false 
    }
}

async function sell_stock(event) {
    event.preventDefault();

    var stock_name = document.querySelector("#stock-name").value.toUpperCase();
    var stock_quantity = parseInt(document.querySelector("#stock-quantity").value);

    for (stock of stock_array) {
        if (stock[0] == stock_name) {
            stock[1] = stock[1] - stock_quantity
       
        }
    }
    stock_array = await update_stock_array(stock_array)
    const stock_table = document.querySelector("tbody")
    stock_table.innerHTML = ''

    for (stock of stock_array) {
        add_element(stock[0],stock[1],stock[2])
     
    } 
}

async function buy_stock(event) {
    event.preventDefault();

    var stock_name = document.querySelector("#stock-name").value.toUpperCase();
    var stock_quantity = parseInt(document.querySelector("#stock-quantity").value);

    let stock_price = await getPrice(stock_name)
    let addnew = 1
    for (stock of stock_array) {
        if (stock[0] == stock_name) {
            stock[1] = stock[1] + stock_quantity
            addnew = 0
        }
    }

    if (addnew == 1) {
        stock_array.push([stock_name,stock_quantity,stock_price,(stock_quantity*stock_price)])
    }

    localStorage.setItem("stock_array", JSON.stringify(stock_array));

    stock_array = await update_stock_array(stock_array)
    const stock_table = document.querySelector("tbody")
    stock_table.innerHTML = ''

    for (stock of stock_array) {
        add_element(stock[0],stock[1],stock[2])
     
    } 



    // console.log("asd")
    // const wall = document.querySelector("#stocks");
    // let item = document.createElement("div")
    // item.classList.add("col-3")

    // let card = document.createElement("div")
    // card.classList.add("card")
    // let cardbody = document.createElement("div")
    // cardbody.classList.add("card-body")
    // let cardtitle = document.createElement("h5")
    // cardtitle.classList.add("card-title")
    // let cardtext = document.createElement("p")
    // cardtext.classList.add("card-text")

    // let stock_title = document.createTextNode(stock_name)
    // let stock_info = document.createTextNode("Price: " + stock_price + "\nQuantity:" + stock_quantity + "\nValue:" + (stock_quantity*stock_price))

    // cardtitle.appendChild(stock_title)
    // cardtext.appendChild(stock_info)

    // cardbody.appendChild(cardtitle)
    // cardbody.appendChild(cardtext)

    // card.appendChild(cardbody)

    // item.appendChild(card)
    // wall.appendChild(item)

    // console.log(stock_array)
    // const stock_table = document.querySelector("tbody");
    // let item = document.createElement("tr")

    // let row_ticker = document.createElement("td")
    // let row_quantity = document.createElement("td")
    // let row_price = document.createElement("td")
    // let row_value = document.createElement("td")

    // row_ticker.append(document.createTextNode(stock_name))
    // row_quantity.append(document.createTextNode(stock_quantity))
    // row_price.append(document.createTextNode(stock_price))
    // row_value.append(document.createTextNode((stock_quantity*stock_price)))

    // item.append(row_ticker)
    // item.append(row_quantity)
    // item.append(row_price)
    // item.append(row_value)

    // stock_table.append(item)


}

function sort_table() {
    console.log(this.innerText)
    if (this.innerText == "Stock Ticker") {
        stock_array.sort(function(first, second) {
        return first[0].charCodeAt(0) - second[0].charCodeAt(0);
        })
    } 
    else if (this.innerText == "Quantity"){
        stock_array.sort(function(first, second) {
        return first[1] - second[1];
        })
    }
    else if (this.innerText == "Price"){
        stock_array.sort(function(first, second) {
        return first[2] - second[2];
        })
    }
    else {
        stock_array.sort(function(first, second) {
        return first[3] - second[3];
        })
    }
    const stock_table = document.querySelector("tbody")
    stock_table.innerHTML = ''

    for (stock of stock_array) {
        add_element(stock[0],stock[1],stock[2])
     
    } 
}

async function load_page(){
    stock_array = JSON.parse(localStorage.getItem("stock_array"))
    if (stock_array.length==0) {return}
    stock_array = await update_stock_array(stock_array)

    for (stock of stock_array) {
        add_element(stock[0],stock[1],stock[2])
         
     } 
}

load_page()
