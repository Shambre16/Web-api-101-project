class DataRequest {
  constructor(oArgs) {
    // this.$container = $("div.enclose");
    this.dataUrl = "https://api.meetup.com/2/cities?key=482a804c7b4414151e743a1a7b1f5156&";
  }

  init() {
    this.$searchBtn = $("#searchBtn");
    this.$responseField = ("#displayResults");
    this.$cloneCard = $(".clone-card div").clone();

    this.bindEvents();
    return false;
  }

  bindEvents() {
    $("#searchBtn").on("click", $.proxy(this.refreshData, this));

  }

  refreshData(event) {
      event.preventDefault();
      let values = $( "form" ).serialize();
      $.ajax({
          dataType: 'jsonp',
          type:"GET",
          url: this.dataUrl + values,
          data: {
          }
        }).done(this.successfulQuery)
        .fail(function(){
          console.log("fail")
        })
    };

  successfulQuery(response){
    var singleResponseArray= "";
    $("ul").remove();
    for (var i = 0; i < response.results.length; i++) {
      singleResponseArray +=
      "<ul class='list-group'><li class='list-group-item zip'>Zip Code:<span></span> " + response.results[i].zip + "</li>" +
      "<li class='list-group-item country'>Country:<span></span> " + response.results[i].localized_country_name + "</li>" +
      "<li class='list-group-item city'>City:<span></span> " + response.results[i].city + "</li>" +
      "<li class='list-group-item ranking'>Ranking:<span></span> " + response.results[i].ranking + "</li>" +
      "<li class='list-group-item state'>State:<span></span> " + response.results[i].state + "</li>" +
      "<li class='list-group-item member_count'>Member Count:<span></span> " + response.results[i].member_count + "</li></ul>";
    }

    $("#displayResults").append(singleResponseArray);

}

}

$(document).ready(function(){
DataRequestModule.init();
})

var DataRequestModule = new DataRequest();
