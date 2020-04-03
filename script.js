// API Documentation:
// http://ardev.info/SPAchat/doc/Readme.md



function main() {


}


function fetchAllUser() {
    fetch('https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search')
    .then(response => {
        return response.json()
    })
    .then(json => {
/*         console.log(json)
        console.log(json.data.rows.length) */
        add(json.data.rows)
    })
}

fetchAllUser()

function add(allState){

    for(i=0; i<allState.length; i++){


        let table = document.createElement("th");
        document.getElementById('sectionCountry').appendChild(table)

        let titleCountry = document.createElement('th')
        titleCountry.textContent = allState[i].country
        document.getElementById('sectionCountry') .appendChild(titleCountry)

        let total_cases = document.createElement('td')
        total_cases.textContent = allState[i].total_cases
        document.getElementById('sectionCountry') .appendChild(total_cases)

        let new_cases = document.createElement('td')
        new_cases.textContent = allState[i].new_cases
        document.getElementById('sectionCountry') .appendChild(new_cases)
      }
}
