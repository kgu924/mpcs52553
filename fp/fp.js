
document.addEventListener("DOMContentLoaded", function() {

  document.querySelector("input").addEventListener("change",add_element)
})

function add_element(e) {
    stock_name = this.value
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
    let stock_info = document.createTextNode("Price: " + 10 + "\nQuantity:" + 5)

    cardtitle.appendChild(stock_title)
    cardtext.appendChild(stock_info)

    cardbody.appendChild(cardtitle)
    cardbody.appendChild(cardtext)

    card.appendChild(cardbody)

    item.appendChild(card)
    wall.appendChild(item)


}