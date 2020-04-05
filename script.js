// https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search


function main() {


}

function watch(Unitbloc){

    let blocs = document.getElementsByClassName("bloc")
    for (const bloc of blocs) {
        bloc.classList.add("d-none")
    }
    document.getElementById(Unitbloc).classList.remove("d-none")

    let onglets = document.getElementsByClassName("menu ")
    for (const onglet of onglets) {
        onglet.setAttribute ("style","background:white")
    }

    let onglet_actif = document.getElementsByClassName("menu " + Unitbloc)
    onglet_actif[0].setAttribute ("style","background:grey")
    

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

function numberVisible(numbers){

    let numberF = ""
    for(let c of numbers.toString()){
        if(c == ","){
            c = c.replace(','," ") 
        }
        numberF = numberF+ c.toString()
    }
    return numberF
}

function numberCalcul(numbers){

    let numberF = ""
    for(let c of numbers.toString()){
        if(c == ","){
            c = c.replace(',',"") 
        }
        numberF = numberF+ c.toString()
    }
    return numberF
}

function add(allStates){

    for(let allState of allStates){

        let table = document.createElement("tr");
        document.getElementById("table").appendChild(table)

        let titleCountry = document.createElement('td')
        titleCountry.setAttribute("class","d-flex justify-content-between align-items-center")
        titleCountry.textContent = allState.country
        table .appendChild(titleCountry)

        let imgFlag = document.createElement('img')
        imgFlag.setAttribute("class","img_flag ")
        imgFlag.src = allState.flag;
        titleCountry .appendChild(imgFlag)

        let total_cases = document.createElement('td')
        total_cases.textContent = numberVisible(allState.total_cases)
        total_cases.setAttribute("scope","col")
        table .appendChild(total_cases)


        let total_deaths = document.createElement('td')
        total_deaths.textContent = numberVisible(allState.total_deaths)
        table.appendChild(total_deaths)

        let total_recovered = document.createElement('td')
        total_recovered.textContent = numberVisible(allState.total_recovered)
        table.appendChild(total_recovered)

        let active_cases = document.createElement('td')
        active_cases.textContent = numberVisible(allState.active_cases)
        table.appendChild(active_cases)

        let serious_critical = document.createElement('td')
        serious_critical.textContent = numberVisible(allState.serious_critical)
        table.appendChild(serious_critical)
    }
}

function stat(allStates){

    for(let allState of allStates){

/* percentage */

let pourcentage_total_deaths = Math.trunc((numberCalcul(allState.total_deaths)/numberCalcul(allState.total_cases)*100)*100)/100
let pourcentage_total_recovered = Math.trunc((numberCalcul(allState.total_recovered)/numberCalcul(allState.total_cases)*100)*100)/100
let pourcentage_active_cases = Math.trunc((numberCalcul(allState.active_cases)/numberCalcul(allState.total_cases)*100)*100)/100


/* Bloc Country */
let blocStatCountry = document.createElement('div')
blocStatCountry.setAttribute("class","blocCountry p-3")
document.getElementById('statCountry') .appendChild(blocStatCountry)

/* progress bar */

        /* country */

        let nameCountry = document.createElement('h2')
        nameCountry.textContent = allState.country
        blocStatCountry .appendChild(nameCountry)

        /* total_infected */

        let statCountry = document.createElement('div')
        statCountry.setAttribute("class","progress")
        blocStatCountry .appendChild(statCountry)

        let stat_total_cases = document.createElement('div')
        stat_total_cases.setAttribute("class","progress-bar")
        stat_total_cases.setAttribute("role","progressbar")
        stat_total_cases.setAttribute("style","width: 100%")
        stat_total_cases.setAttribute("aria-valuenow","100")
        stat_total_cases.setAttribute("aria-valuemin","0")
        stat_total_cases.setAttribute("aria-valuemax","100")
        stat_total_cases.textContent = "Nombre d'infectés : " + numberVisible(allState.total_cases)
        statCountry .appendChild(stat_total_cases)

        let statControl = document.createElement('div')
        statControl.setAttribute("class","progress")
        blocStatCountry .appendChild(statControl) 

        /* deaths */

        let stat_total_deaths = document.createElement('div')
        stat_total_deaths.setAttribute("class","progress-bar bg-danger")
        stat_total_deaths.setAttribute("role","progressbar")
        stat_total_deaths.setAttribute("style","width:"+pourcentage_total_deaths+"%")
        stat_total_deaths.setAttribute("aria-valuenow",""+ pourcentage_total_deaths+"")
        stat_total_deaths.setAttribute("aria-valuemin","0")
        stat_total_deaths.setAttribute("aria-valuemax","100")
        stat_total_deaths.textContent =  pourcentage_total_deaths+ " %"
        statControl .appendChild(stat_total_deaths)

        /* recovered */

        let stat_total_recovered = document.createElement('div')
        stat_total_recovered.setAttribute("class","progress-bar bg-warning")
        stat_total_recovered.setAttribute("role","progressbar")
        stat_total_recovered.setAttribute("style","width: "+ pourcentage_total_recovered +"%")
        stat_total_recovered.setAttribute("aria-valuenow",""+ pourcentage_total_recovered+ "")
        stat_total_recovered.setAttribute("aria-valuemin","0")
        stat_total_recovered.setAttribute("aria-valuemax","100")
        stat_total_recovered.textContent =  pourcentage_total_recovered+ " %"
        statControl .appendChild(stat_total_recovered)

        /* active */

        let stat_active_cases = document.createElement('div')
        stat_active_cases.setAttribute("class","progress-bar bg-success")
        stat_active_cases.setAttribute("role","progressbar")
        stat_active_cases.setAttribute("style","width: "+ pourcentage_active_cases +"%")
        stat_active_cases.setAttribute("aria-valuenow",""+ pourcentage_active_cases + "")
        stat_active_cases.setAttribute("aria-valuemin","0")
        stat_active_cases.setAttribute("aria-valuemax","100")
        stat_active_cases.textContent = pourcentage_active_cases+" %"
        statControl .appendChild(stat_active_cases)

       

/* La legende */

        let statLegende = document.createElement('div')
        statLegende.setAttribute("class","mt-2")
        blocStatCountry .appendChild(statLegende)

        /* deaths */

        let legende_total_deaths = document.createElement('div')
        legende_total_deaths.setAttribute("class","d-flex")
        statLegende .appendChild(legende_total_deaths)

        let carre_total_deaths = document.createElement('div')
        carre_total_deaths.setAttribute("style","width:20px ; height:20px ; background:red")
        carre_total_deaths.setAttribute("class","mr-2") 
        legende_total_deaths .appendChild(carre_total_deaths)

        let text_total_deaths = document.createElement('em')
        text_total_deaths.textContent = "Les décés : "+ numberVisible(allState.total_deaths) + " - " + pourcentage_total_deaths + " % "
        legende_total_deaths .appendChild(text_total_deaths)

        /* recovered */

        let legende_total_recovered = document.createElement('div')
        legende_total_recovered.setAttribute("class","d-flex")
        statLegende .appendChild(legende_total_recovered)

        let carre_total_recovered = document.createElement('div')
        carre_total_recovered.setAttribute("style","width:20px ; height:20px ; background:yellow")
        carre_total_recovered.setAttribute("class","mr-2") 
        legende_total_recovered .appendChild(carre_total_recovered)

        let text_total_recovered = document.createElement('em')
        text_total_recovered.textContent = "Les guéris : " + numberVisible(allState.total_recovered) + " - " + pourcentage_total_recovered + " % "
        legende_total_recovered .appendChild(text_total_recovered)

        /* active */

        let legende_total_active = document.createElement('div')
        legende_total_active.setAttribute("class","d-flex")
        statLegende .appendChild(legende_total_active)

        let carre_total_active = document.createElement('div')
        carre_total_active.setAttribute("style","width:20px ; height:20px ; background:green")
        carre_total_active.setAttribute("class","mr-2") 
        legende_total_active .appendChild(carre_total_active)

        let text_total_active = document.createElement('em')
        text_total_active.textContent = "Les malades : "+ numberVisible(allState.active_cases) + " - " + pourcentage_active_cases + " % "
        legende_total_active .appendChild(text_total_active)

    }
}

