//ambil api
const apiURL = "https://disease.sh/v3/covid-19/countries/";


// mengambil elemen berdasarkan id serch
const covidSearch = document.getElementById('covidSearch');
const search = covidSearch.querySelector('#search');

//fungsi untuk mendapatkan data api , dipeca menjadi json
async function getCovidData() {
    const apiResponse = await fetch(apiURL);
    const data = await apiResponse.json();
    return data;
}


//fungsi untuk mendapatkan data api pernegara , dipeca menjadi json
async function getCovidDataPerCountry(country) {
    const apiResponse = await fetch(
        `https://disease.sh/v3/covid-19/countries/${country}`
    );
    const data = await apiResponse.json();
    searchResultUI([data]);
}

function searchResultUI(data) {

    const searchResult = document.querySelector('.searc_result');
    for (const item of data) {

        console.log(item);
        searchResult.innerHTML = `
     <div class="content mx-1">
            <div id="negara" class="row ">
                <div class="col-4">
                    <div class="row">
                        <div class="col">
                            <P>${item.country}</P>
                        </div>
                        <div class="col">
                            <div class="img-cover">
                                <img src="${item.countryInfo.flag}" alt="...">
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="data-negara row mx-1 mt-5 ">
                <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Positif</p>
                    <p id="nilai">${item.cases}</p>
                </div>


                <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Aktif</p>
                    <p id="nilai">${item.active}</p>
                </div>

                <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Sembuh</p>
                    <p id="nilai">${item.recovered}</p>
                </div>

                <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Meninggal</p>
                    <p id="nilai">${item.deaths}</p>
                </div>

                <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Populasi</p>
                    <p id="nilai">${item.population}</p>
                </div>
                 <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Kasus Hari ini</p>
                    <p id="nilai">${item.todayCases}</p>
                </div>
                 <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Sembuh Hari ini</p>
                    <p id="nilai">${item.todayRecovered}</p>
                </div>
                 <div class="col-2 bg-warning mb-2 mr-5 rounded">
                    <p>Meniggal Hari ini</p>
                    <p id"nilai">${item.todayDeaths}</p>
                </div>
            </div>
        </div>`;
    }

}

async function wordlDataall() {
    const response = await getCovidData();
    const worldStatE1 = document.querySelector('.world__stat')

    let wordlCases = 0;
    let wordlDeaths = 0;
    let wordlRecoverd = 0;
    let wordlData = "";

    for (const data of response) {
        wordlData = {


            cases: (wordlCases = wordlCases + data.cases),
            // cases: (wordlCases += data.cases),
            deaths: (wordlDeaths += data.deaths),
            recovered: (wordlRecoverd += data.recovered),
        };

        // console.log(wordlData);
    }


    worldStatE1.innerHTML = `

                    <div class="row">
                        <div class="col-7">
                            <p >Positif</p>
                        </div>
                        <div class="col-4">
                            <p id ="wcofirmed">${wordlData.cases}</p>
                        </div>
                    </div>

               
                    
                    <div class="row ">
                        <div class="col-7">
                            <p>Sembuh</p>
                        </div>
                        <div class="col-4">
                            <p id ="wrecovered">${wordlData.recovered}</p>
                        </div>
                    </div>

                    <div class="row ">
                        <div class="col-7">
                            <p>Meninggal</p>
                        </div>
                        <div class="col-4">
                            <p id ="wrecovered">${wordlData.deaths}</p>
                        </div>
                    </div>    
    `;

}



function showErrorMessage(message) {
    const smallEl = document.createElement('small');
    smallEl.classList.add("error");
    smallEl.texContent = message;
    covidSearch.insertBefore(smallEl, covidSearch.lastChild);
}


//event ketika halamn di buka otomati akan menjalankan fungsi wordldata
document.addEventListener("DOMContentLoaded", wordlDataall);


covidSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
   

    if (!searchTerm) {
        showErrorMessage('Please enter a country',);
        
        
    } else {
        getCovidDataPerCountry(searchTerm);
        console.log('data benar');
        console.log(searchTerm);
    }

   

    
    covidSearch.reset();


})


