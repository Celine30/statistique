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
        add(json.data.rows)
        stat(json.data.rows)
    })
}

fetchAllUser()

function add(allState){

    for(i=0; i<allState.length; i++){

        let table = document.createElement("tr");
        document.getElementById("table").appendChild(table)

        let titleCountry = document.createElement('td')
        titleCountry.setAttribute("class","d-flex justify-content-between align-items-center")
        titleCountry.textContent = allState[i].country
        table .appendChild(titleCountry)

        let imgFlag = document.createElement('img')
        imgFlag.setAttribute("class","img_flag ")
        imgFlag.src = allState[i].flag;
        titleCountry .appendChild(imgFlag)

        let total_cases = document.createElement('td')
        total_cases.textContent = allState[i].total_cases
        total_cases.setAttribute("scope","col")
        table .appendChild(total_cases)


        let total_deaths = document.createElement('td')
        total_deaths.textContent = allState[i].total_deaths
        table.appendChild(total_deaths)

        let total_recovered = document.createElement('td')
        total_recovered.textContent = allState[i].total_recovered
        table.appendChild(total_recovered)

        let active_cases = document.createElement('td')
        active_cases.textContent = allState[i].active_cases
        table.appendChild(active_cases)

        let serious_critical = document.createElement('td')
        serious_critical.textContent = allState[i].serious_critical
        table.appendChild(serious_critical)
    }
}
function stat(allState){
    for(i=0; i<allState.length; i++){

        let pourcentage_total_deaths = (allState[i].total_deaths * allState[i].total_cases /100)

        let statCountry = document.createElement('div')
        statCountry.setAttribute("class","progress")
        document.getElementById('blocStat') .appendChild(statCountry)

        let stat_total_cases = document.createElement('div')
        stat_total_cases.setAttribute("class","progress-bar")
        stat_total_cases.setAttribute("role","progressbar")
        stat_total_cases.setAttribute("style","width: 100%")
        stat_total_cases.setAttribute("aria-valuenow","25")
        stat_total_cases.setAttribute("aria-valuemin","0")
        stat_total_cases.setAttribute("aria-valuemax","100")
        stat_total_cases.textContent = allState[i].total_cases +" - 100 %"
        statCountry .appendChild(stat_total_cases)

        let statControl = document.createElement('div')
        statControl.setAttribute("class","progress")
        document.getElementById('blocStat') .appendChild(statControl) 

        let stat_total_deaths = document.createElement('div')
        stat_total_deaths.setAttribute("class","progress-bar bg-danger")
        stat_total_deaths.setAttribute("role","progressbar")
        stat_total_deaths.setAttribute("style","width: 25%")
        stat_total_deaths.setAttribute("aria-valuenow","25")
        stat_total_deaths.setAttribute("aria-valuemin","0")
        stat_total_deaths.setAttribute("aria-valuemax","100")
        stat_total_deaths.textContent = allState[i].total_deaths +" - " + pourcentage_total_deaths + " %"
        statControl .appendChild(stat_total_deaths)

        let stat_total_recovered = document.createElement('div')
        stat_total_recovered.setAttribute("class","progress-bar bg-warning")
        stat_total_recovered.setAttribute("role","progressbar")
        stat_total_recovered.setAttribute("style","width: 25%")
        stat_total_recovered.setAttribute("aria-valuenow","25")
        stat_total_recovered.setAttribute("aria-valuemin","0")
        stat_total_recovered.setAttribute("aria-valuemax","100")
        stat_total_recovered.textContent = allState[i].total_recovered
        statControl .appendChild(stat_total_recovered)

        let stat_active_cases = document.createElement('div')
        stat_active_cases.setAttribute("class","progress-bar bg-success")
        stat_active_cases.setAttribute("role","progressbar")
        stat_active_cases.setAttribute("style","width: 25%")
        stat_active_cases.setAttribute("aria-valuenow","25")
        stat_active_cases.setAttribute("aria-valuemin","0")
        stat_active_cases.setAttribute("aria-valuemax","100")
        stat_active_cases.textContent = allState[i].active_cases
        statControl .appendChild(stat_active_cases)




    }
}