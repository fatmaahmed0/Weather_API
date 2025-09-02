let we_search = document.getElementById("search");
let allData = [];
let days = ["Friday","Saturday","Sunday", "Monday","Tuesday","Wednesday","Thursday"];
let date = "";
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "Octobar",
  "Novamber",
  "December",
];
let z = "";
let a='';
let a1='';
let a2='';

data('cairo');
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    let response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    let {city} = await response.json();

    console.log("Detected city:", city);

    if (city) {
      data(city);
    }else{
      data('cairo')
    }
  });
}else{
  data('cairo')
}
async function data(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=95371143bbc245dc84d151139252608&q=${city}&days=3`
  );
  let final = await response.json();
  allData = final;
  console.log(allData);
  let d = new Date(`${allData.forecast.forecastday[0].date}`);
  let f = d.toUTCString().slice(0, 3);
  date = Number(d.toUTCString().slice(5, 7));
  let m = d.toUTCString().slice(8, 11);
  console.log(m);
  for (var i = 0; month.length > i; i++) {
    if (m == month[i].slice(0, 3)) {
      z = month[i];
      break;
    }
  }
  for(var i=0; i<days.length;i++){
    if(f==days[i].slice(0,3)){
      a=days[i];
      a1=days[i+1];
      a2=days[i+2];
    }
  }
  display();
}
addEventListener("keyup", async function () {
    var term = we_search.value;
    data(term);
    console.log(term);
});

function display() {
    let x = "";
    x += `
    <div class="bg-gray-700  col-span-12 md:col-span-6 lg:col-span-4 ">  
            <div class="flex justify-between p-2.5 bg-gray-800 text-[#bfc1c8]">
              <h1>${a}</h1>
              <h1>${date} ${z}</h1>
            </div>
            <div class="px-[20px] py-[20px]">
              <h2 class="text-[#bfc1c8]">${allData.location.name}</h2>
              <h1 class="text-[90px] mr-[30px] text-white">
                ${allData.current.temp_c}<sup>o</sup>C
              </h1>
              <img src=${allData.current.condition.icon} alt="" />
              <h3 class="my-[15px] text-[#009ad8]">${allData.current.condition.text}</h3>
              <div class="flex pb-2 text-gray-200 md:text-[17px]">
          <h1 >Sunrise: ${allData.forecast.forecastday[0].astro.sunrise}</h1>
          <h1 class="ml-5 md:ml-9">Sunset: ${allData.forecast.forecastday[0].astro.sunset}</h1>
        </div>
              <div class="flex text-[#bfc1c8] text-sm">
                <span class="mr-5"
                  ><i class="fa-solid fa-wind"></i> ${allData.current.wind_kph} km/h</span
                >
                <span class="mr-5"
                 ><i class="fa-solid fa-cloud"></i> ${allData.current.cloud} %</span
                >
                <span class="mr-5"
                  ><i class="fa-solid fa-compass"></i> East</span
                >
              </div>
            </div>
          </div>

          <div class="bg-[#1e202b] col-span-12 md:col-span-6 lg:col-span-4">
            <div class="p-2.5 text-center text-[#bfc1c8]">
              <h1>${a1}</h1>
            </div>
            <div class="mt-[50px] mx-[20px] mb-[10px] text-center">
              <div class="flex justify-center items-center">
                <img src=${allData.forecast.forecastday[1].day.condition.icon} alt="" class="mb-[20px]" />
              </div>
              <h1 class="text-white text-2xl font-medium">${allData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h1>
            <h2 class="text-gray-300 text-[17px]">${allData.forecast.forecastday[1].day.mintemp_c} <sup>o</sup></h2>
              <h2 class="my-[20px] text-[#009ad8]">${allData.forecast.forecastday[1].day.condition.text}</h2>
            </div>
          </div>

          <div class="bg-gray-700 col-span-12 md:col-span-6 lg:col-span-4 mb-5 md:mb-0">
            <div class="p-2.5 text-center text-[#bfc1c8] bg-gray-800">
              <h1>${a2}</h1>
            </div>
            <div class="mt-[50px] mx-[20px] mb-[10px] text-center">
              <div class="flex justify-center items-center">
                <img src=${allData.forecast.forecastday[2].day.condition.icon} alt="" class="mb-[20px]" />
              </div>
              <h1 class="text-white text-2xl font-medium">${allData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h1>
              <h2 class="text-gray-300 text-[17px]">${allData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></h2>
              <h2 class="my-[20px] text-[#009ad8]">${allData.forecast.forecastday[2].day.condition.text}</h2>
            </div>
          </div>

        `;
  document.getElementById("demo").innerHTML = x;
}
