let btn = document.querySelector("#changer");
let city;

function error() {
    city = "Paris";
    receiveCity(city);
}

if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        const url = "https://api.openweathermap.org/data/2.5/weather?lon="+position.coords.longitude+"&lat="+position.coords.latitude+"&appid=62c8506d13ada724be02a5b05135758d&units=metric";
        // console.log(url);
        // Create request
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "json";
        request.send();

        // check call is OK and moidify data
        request.onload = function () {  
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                let temperature = request.response;
                document.querySelector("#ville").textContent = temperature.name;
                document.querySelector("#temperature_label").textContent = temperature.main.temp;
            } else {
                alert("Impossible d'afficher ce que vous demandez, revenez plus tard");
            }
        }
    }, error);
}else {
    city = "Paris";
    receiveCity(city);
}

btn.addEventListener("click", () => {
    let modifyCity = prompt("Entrez une nouvelle ville :");
    receiveCity(modifyCity);
})

function receiveCity(getCity) {
    let city = getCity;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=62c8506d13ada724be02a5b05135758d&units=metric";

    // Create request
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "json";
    request.send();

    // check call is OK and moidify data
    request.onload = function () {  
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            let temperature = request.response;
            document.querySelector("#ville").textContent = city;
            document.querySelector("#temperature_label").textContent = temperature.main.temp;
        } else {
            alert("Impossible d'afficher ce que vous demandez, revenez plus tard");
        }
    }
}


