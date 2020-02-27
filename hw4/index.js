

function add_element(name,distance,jpl_link,approach_date) {
    const wall = document.querySelector("#wall");
    let item = document.createElement("div")
    item.classList.add("col-3")
    item.classList.add("text-center")

    // let p_elem = document.createElement("p")
    // let text_elem = document.createTextNode("Name: " + name)
    // let p_elem2 = document.createElement("p")
    // let text_elem2 = document.createTextNode("Distance: " + distance)


    // p_elem.appendChild(text_elem)
    // p_elem2.appendChild(text_elem2)

    // item.appendChild(p_elem)
    // item.appendChild(p_elem2)
    // wall.appendChild(item)

    let card = document.createElement("div")
    card.classList.add("card")
    let cardbody = document.createElement("div")
    cardbody.classList.add("card-body")
    let cardtitle = document.createElement("h5")
    cardtitle.classList.add("card-title")
    let cardsubtitle = document.createElement("h6")
    cardsubtitle.classList.add("card-subtitle")
    cardsubtitle.classList.add("mb2")
    cardsubtitle.classList.add("text-muted")
    let cardtext = document.createElement("h6")
    cardtext.classList.add("card-text")
    cardtext.classList.add("mb2")
    cardtext.classList.add("text-muted")
    let cardlink = document.createElement("a")
    cardlink.classList.add("card-link")
    cardlink.href = jpl_link

    let text_elem = document.createTextNode(name)
    let text_elem2 = document.createTextNode("Distance: " + distance)
    let text_approach = document.createTextNode("Approach date: " + approach_date)
    let link_test = document.createTextNode("More info")

    cardtitle.appendChild(text_elem)
    cardsubtitle.appendChild(text_approach)
    cardtext.appendChild(text_elem2)
    cardlink.appendChild(link_test)

    cardbody.appendChild(cardtitle)
    cardbody.appendChild(cardsubtitle)
    cardbody.appendChild(cardtext)
    cardbody.appendChild(cardlink)


    card.appendChild(cardbody)

    item.appendChild(card)
    wall.appendChild(item)









}

// function sort(items){
//   items.sort(function(first, second) {
//   return second[1] - first[1];
//   });
// }

function create_name_distance_array(all_asteroids){
  let myarray=[]
  for (const [key, value] of Object.entries(all_asteroids)) {
    for (asteroid of value) {
      myarray.push([asteroid.name,asteroid.close_approach_data[0].miss_distance.astronomical,asteroid.nasa_jpl_url,asteroid.close_approach_data[0].close_approach_date])

    }
  }
  return myarray;
  }

async function getData() {
  console.log("hi")
  let myapikey = "MjvmelTq2o2koysV6ovrEeC9WEqifXgrVOrnXd3w"
  let today = new Date();
  var today_string = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let apistring = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today_string}&api_key=${myapikey}`

  let http_response = await fetch(apistring)
  let asteroid_data = await http_response.json()

  let name_distance_array = create_name_distance_array(asteroid_data.near_earth_objects)
  name_distance_array.sort(function(first, second) {
  return first[1] - second[1];
  });



  // console.log(name_distance_array)

  for (i of name_distance_array) {
    add_element(i[0],i[1],i[2],i[3])
  }


  // for (const [key, value] of Object.entries(asteroid_data.near_earth_objects)) {
  //   for (asteroid of value) {
  //     add_element(asteroid.name)

  //   };
  // }


  // const ul = document.querySelector("ul");

  // const names = station_data.data.stations.map((station) => station.name)

  // names.forEach(function(name) {
  //   let item = document.createElement("li")
  //   let text = document.createTextNode(name)
  //   item.appendChild(text)
  //   ul.appendChild(item)
  // })

  // for (station of station_data.data.stations) {
  //   // console.log(station.name)
  //   let item = document.createElement("li")
  //   let text = document.createTextNode(station.name)
  //   item.appendChild(text)
  //   ul.appendChild(item)
  // }
}

async function getPic() {
  let myapikey = "MjvmelTq2o2koysV6ovrEeC9WEqifXgrVOrnXd3w"
  let apistring =`https://api.nasa.gov/planetary/apod?api_key=${myapikey}`

  let http_response = await fetch(apistring)
  let pic_data = await http_response.json()

  let piccard = document.querySelector("#pic div img");
  piccard.src = pic_data.hdurl



}

getData()
getPic()
