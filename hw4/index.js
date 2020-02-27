

function add_element(name) {
    const wall = document.querySelector("#wall");
    let item = document.createElement("div")
    item.classList.add("col-3")
    item.classList.add("text-center")

    let p_elem = document.createElement("p")
    let text_elem = document.createTextNode(name)

    p_elem.appendChild(text_elem)
    item.appendChild(p_elem)
    wall.appendChild(item)

}

function sort_by_distance_to_earth(){
  var items = Object.keys(dict).map(function(key) {
  return [key, dict[key]];
});
}

async function getData() {
  console.log("hi")
  let myapikey = "MjvmelTq2o2koysV6ovrEeC9WEqifXgrVOrnXd3w"
  let today = new Date();
  var today_string = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let apistring = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today_string}&api_key=${myapikey}`

  let http_response = await fetch(apistring)
  let asteroid_data = await http_response.json()


  for (const [key, value] of Object.entries(asteroid_data.near_earth_objects)) {
    for (asteroid of value) {
      add_element(asteroid.name)

    };
  }


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


getData()

async function getPic() {
  let myapikey = "MjvmelTq2o2koysV6ovrEeC9WEqifXgrVOrnXd3w"
  let apistring =`https://api.nasa.gov/planetary/apod?api_key=${myapikey}`

}