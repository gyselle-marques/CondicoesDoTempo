const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-location");

const sectionTempInfo = document.querySelector("#temp-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempInfo) return;

  const location = input.value;

  if (location.length < 3) {
    alert("Informe um local válido.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ad5123a4dbe1ddfb1a8139600aa0e7fc&lang=pt_br&units=metric`
    );
    const data = await response.json();

    const infos = {
      temp: Math.round(data.main.temp),
      location: data.name,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionTempInfo.innerHTML = `
  <div class="temp-data">
    <h2>${infos.location}</h2>
    <span>${infos.temp}ºC</span>
  </div>

  <img src="${infos.icon}" />
  `;
  } catch (err) {
    console.log("Ocorreu um erro na obtenção de dados da API.", err);
  }
});
