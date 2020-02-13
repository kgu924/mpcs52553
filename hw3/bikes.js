

document.addEventListener("DOMContentLoaded", function() {
	for (heart of document.querySelectorAll(".fave")) {
		heart.addEventListener("click", add_to_favorite)
	}

	document.querySelector("select").addEventListener("change",show_selection)
})


function add_to_favorite() {
	// console.log(this.innerText);
	// console.log(this.innerHTML);
	// console.log(this.textContent);
	let fav_body = document.querySelector("#favorites tbody")

	if (this.innerText == "♡") {
		this.innerHTML = "&#9829;"

		let item_row = document.createElement("tr")
	  	let item_element = document.createElement("td")
		let text = document.createTextNode(this.parentElement.nextSibling.innerText)

	  	item_element.appendChild(text)
	  	item_row.appendChild(item_element)
	  	fav_body.appendChild(item_row)
	  }
	else {
		// console.log("aaaa")
		this.innerHTML = "&#9825;"


		for (elem of fav_body.querySelectorAll("tr")) {
			if (elem.firstElementChild.innerText ==  this.parentElement.nextSibling.innerText) {
				elem.remove()
			}
		}
	}

}


function show_selection(event) {
	console.log(event.target.value)
	rows = document.querySelectorAll("#stations tr")
	for (row of rows){
		row.style.display="none"
	}

	if (event.target.value == "all"){
		rows = document.querySelectorAll("tr")
		for (row of rows){
			row.style.display="table-row"
		}
	}
	 else {
	 	rows = document.querySelectorAll("." + event.target.value)

		for (row of rows){
			row.style.display="table-row"
		}

	} 
}


