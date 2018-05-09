class DataRequest {
  constructor(instanceKey, key) {
    // this.$container = $("div.enclose");
    this.dataUrl = "https://api.meetup.com/2/cities?";
    this.keyInstance = instanceKey;
    this.key = key;
  }

  init() {
    this.$searchBtn = $("#searchBtn");

    this.map = new Map();
    this.map.initMap();


  this.bindEvents();
  return false;
}

bindEvents() {
  $("#searchBtn").on("click", $.proxy(this.refreshData, this));

}

refreshData(event) {
  event.preventDefault();
  let values = $("form").serialize();
  $.ajax({
      dataType: 'jsonp',
      type: "GET",
      url: this.dataUrl + values,
      data: {
        key: this.key
      }
    }).done(this.successfulQuery)
    .fail(function() {
      console.log("fail")
    })
};

successfulQuery(response) {
  localStorage.setItem("meetupResults", JSON.stringify(response.results));
  var singleResponseArray = "";
  $("ul").remove();
  for (var i = 0; i < response.results.length; i++) {
    singleResponseArray +=
      `<ul class='list-group'><img class="card-img-top" id="map" src="https://maps.googleapis.com/maps/api/staticmap?center=
      ${response.results[i].lat},${response.results[i].lon}&zoom=10&size=300x300&key=AIzaSyCWHWgvvHMmE4ZAF1-HipxMefI6C8-c0yI" alt="Card image cap">
      <li class='list-group-item zip'>Zip Code:<span></span> ${response.results[i].zip} </li>
      <li class='list-group-item country'>Country:<span></span> ${response.results[i].localized_country_name} </li>
      <li class='list-group-item city'>City:<span></span> ${response.results[i].city} </li>
      <li class='list-group-item ranking'>Ranking:<span></span> ${response.results[i].ranking} </li>
      <li class='list-group-item state'>State:<span></span> ${response.results[i].state} </li>
      <li class='list-group-item member_count'>Member Count:<span></span> ${response.results[i].member_count} </li></ul>`;
  }
  $("#displayResults").append(singleResponseArray);
}

getObject(instanceKey) {
  let response = JSON.parse(localStorage.getItem("meetupResults"));
  if (response) {
    for (let i = 0; i < response.length; i++) {
      let result = response[i];
      console.log(result);
    }
    return true;
  }
}
}

class Map {
  constructor(){
    return this;
  }
  initMap() {
  }
}

$(document).ready(function() {
  var DataRequestModule = new DataRequest("meetupResults","482a804c7b4414151e743a1a7b1f5156");
  DataRequestModule.init();
})
