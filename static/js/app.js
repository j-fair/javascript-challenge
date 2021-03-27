// from data.js
var tableData = data;


var tbody = d3.select("tbody")

// Loop for handling UFO sightings from data source
tableData.forEach(ufo => {
    var row = tbody.append("tr")

    Object.entries(ufo).forEach(([key, value]) => {

        var cell = row.append("td")
        cell.text(value)
    })
    
});

// *****BONUS ******
// Creating distinct country list

var countries = [... new Set(tableData.map(ufo => ufo.country))].sort()
console.log(countries)

var states = [... new Set(tableData.map(ufo => ufo.state))].sort()
console.log(state)

var shapes = [... new Set(tableData.map(ufo => ufo.shape))].sort()
console.log(shape)

// Adding to dropdown menus
countries.forEach((country) => {
    d3.select("#country").append("option").text(country)

})

states.forEach((state) => {
    d3.select("#state").append("option").text(state)

})

shapes.forEach((shape) => {
    d3.select("#shape").append("option").text(shape)

})

d3.selectAll(".form-control").on("change", updateFilters);
d3.select("#filter-btn").on("click", clear);

var filters = {}

function updateFilters() {
    var inputElement = d3.select(this);
    var filterID = inputElement.attr("id")
    var inputValue = inputElement.property("value").toLowerCase()

    if (inputValue) {
        filters[filterID] = inputValue
        }
    else {
        delete filters[filterID]
        }
    filterTable()

}

function filterTable() {
    // Refresh prevention
    d3.event.preventDefault()

    var results = tableData.filter(function(ufo) {
        for (var key in filters) {
            if (filters[key] === undefined || ufo[key] != filters[key])
                return false
        }
        return true
    })
    tbody.html("");

    if (results.length === 0) {
        tbody.text("No UFO sightings found.")
    }
    
    else {
        results.forEach((ufo) => {

            var row = tbody.append("tr")
            Object.entries(ufo).forEach(([key, value]) => {
                var cell = row.append("td")
                cell.text(value)
            })
        })
    }

}

function clear() {
    filters = {};
    document.getElementById("filter-form").reset();
    filterTable();
}

// *****************************************COMMENTING THIS OUT, USED THIS FOR PART 1 BEFORE BONUS ATTEMPT **************************************

// // Creating event handlers here

// button.on("click", runEnter)
// form.on("submit", runEnter)

// function runEnter() {
//     // Refresh prevention
//     d3.event.preventDefault()

//     var inputElement = d3.select(".form-control")
//     var inputValue = inputElement.property("value")
//     console.log(inputValue);
//     var results = tableData.filter(ufo => ufo.datetime === inputValue);
//     console.log(results);

//     tbody.html("");

//     if (results.length === 0) {
//         tbody.text(`No UFO sightings on ${inputValue}.`)
//     }
    
//     else {
//         results.forEach((ufo) => {

//             var row = tbody.append("tr")
//             Object.entries(ufo).forEach(([key, value]) => {
//                 var cell = row.append("td")
//                 cell.text(value)
//             })
//         })
//     }

// }
