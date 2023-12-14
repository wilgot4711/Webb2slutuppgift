// Funktionen för att hämta stad och väderinformation
async function getWeatherAndCityInfo() {
  //api nycklar.
  const apiKeystad = 'M4FRwNJOkIqImXwA6tzUtQ==oToiRz62PDnPxKCg';
  const apiKeyväder = 'ce3291dda00848fda2e93132230612';

  // Fråga användaren efter stad
  const city = prompt('Var god ange din stads namn');

  // kontrollera om staden funkade
  if (!city) {
    console.log('Var god ange en stad.');
    return;
  }

  // hämta från cityapi
  const cityApiUrl = `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(city)}`;
  try {
    const cityResponse = await fetch(cityApiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKeystad,
        'Content-Type': 'application/json',
      },
    });

    const cityData = await cityResponse.json();

    // Kontrollera om APIn funkade
    if (cityResponse.ok) {
      if (cityData.length === 0) {
        console.log(`Inga matchande städer hittades för "${city}".`);
        return;
      }

      // Information om staden så som befolkning land
      document.getElementById('cityInfo1').innerText = `Stad: ${cityData[0].name || 'Ej tillgänglig'}`;
      document.getElementById('cityInfo2').innerText = `Land: ${cityData[0].country || 'Ej tillgänglig'}`;
      document.getElementById('cityInfo3').innerText = ` Befolkning: ${cityData[0].population || 'Ej tillgänglig'}`;
    } else {
      console.error('Fel vid hämtning av stadsinformation:', cityData.message || 'Okänt fel');
    }
  } catch (error) {
    console.error('Fel vid hämtning av stadsinformation:', error.message);
  }

  try {
    const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKeyväder}&q=${city}&days=3`);
    const weatherData = await weatherResponse.json();

    // Kontrollera om APIn fungerade
    if (weatherResponse.ok) {
      // Visa aktuella väderförhållanden
      // Visa aktuella väderförhållanden
  const currentTemperature = Math.round(weatherData.current.temp_c);
  document.getElementById('currentWeather1').innerText = `Temperatur: ${currentTemperature}°C`;

      
      // Skriva ut vädertillståndet på svenska istället för engelska.
      const translatedCondition = translateWeatherCondition(weatherData.current.condition.text);
      document.getElementById('currentWeather2').innerText = `Förhållande: ${translatedCondition}`;

      document.getElementById('currentWeather3').innerText = `Risk för regn: ${weatherData.current.precip_mm > 0 ? 'Ja' : 'Nej'}`;
      document.getElementById('currentWeather4').innerText = `Risk för snö: ${weatherData.current.snow_mm > 0 ? 'Ja' : 'Nej'}`;

      // daglig prognos
document.getElementById('forecast1').innerText = 'Daglig Prognos:';
weatherData.forecast.forecastday.forEach((day, index) => {
  if (index < 3) {
    // Konvertera datumet till dagens namn och datum.
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString('sv-SE', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' });

    // Använd Math.round() för att avrunda temperaturvärdena till närmaste heltal
    const maxTemp = Math.round(day.day.maxtemp_c);
    const minTemp = Math.round(day.day.mintemp_c);
    const condition = translateWeatherCondition(day.day.condition.text);

    document.getElementById(`forecast${index + 2}`).innerText = `${dayName} ${formattedDate}:\nMax Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C, Förhållande: ${condition}`;
  }
});

    } else {
      console.error('Fel vid hämtning av väderdata:', weatherData.error.message);
    }
  } catch (error) {
    console.error('Fel vid hämtning av väderdata:', error.message);
  }
}

// Funktion för att översätta weatherapi.coms respons till svenska
function translateWeatherCondition(condition) {
  const translationMap = {
    'Clear': 'Klart',
    'Partly cloudy': 'Delvis molnigt',
    'Cloudy': 'Molnigt',
    'Overcast': 'Mulet',
    'Mist': 'Dimma',
    'Patchy rain possible': 'Möjligt med regnskurar',
    'Patchy snow possible': 'Möjligt med snöbyar',
    'Patchy sleet possible': 'Möjligt med snöblandat regn',
    'Patchy freezing drizzle possible': 'Möjligt med lätt isregn',
    'Thundery outbreaks possible': 'Risk för åska',
    'Blowing snow': 'Snödrev',
    'Blizzard': 'Snöstorm',
    'Fog': 'Dimma',
    'Freezing fog': 'Isdimma',
    'Patchy light drizzle': 'Lätt duggregn',
    'Light drizzle': 'Duggregn',
    'Freezing drizzle': 'Lätt isregn',
    'Heavy freezing drizzle': 'Kraftigt isregn',
    'Patchy light rain': 'Lätt regnskur',
    'Light rain': 'Lätt regn',
    'Moderate rain at times': 'Tidvis måttligt regn',
    'Moderate rain': 'Måttligt regn',
    'Heavy rain at times': 'Tidvis kraftigt regn',
    'Heavy rain': 'Kraftigt regn',
    'Light freezing rain': 'Lätt isregn',
    'Moderate or heavy freezing rain': 'Måttligt eller kraftigt isregn',
    'Light sleet': 'Lätt snöblandat regn',
    'Moderate or heavy sleet': 'Måttligt eller kraftigt snöblandat regn',
    'Patchy light snow': 'Lätt snöfall',
    'Light snow': 'Lätt snöfall',
    'Patchy moderate snow': 'Måttligt snöfall',
    'Moderate snow': 'Måttligt snöfall',
    'Patchy heavy snow': 'Kraftigt snöfall',
    'Heavy snow': 'Kraftigt snöfall',
    'Ice pellets': 'Hagel',
    'Light rain shower': 'Lätt regnskur',
    'Moderate or heavy rain shower': 'Måttlig eller kraftig regnskur',
    'Torrential rain shower': 'Kraftig regnskur',
    'Light sleet showers': 'Lätta snöblandade regnskurar',
    'Moderate or heavy sleet showers': 'Måttliga eller kraftiga snöblandade regnskurar',
    'Light snow showers': 'Lätta snöbyar',
    'Moderate or heavy snow showers': 'Måttliga eller kraftiga snöbyar',
    'Light showers of ice pellets': 'Lätt hagelskur',
    'Moderate or heavy showers of ice pellets': 'Måttlig eller kraftig hagelskur',
    'Thunderstorm': 'Åska',
  };

  return translationMap[condition] || condition;
}

// kallar på funktionen när sidan har laddats
document.addEventListener('DOMContentLoaded', async () => {
  await getWeatherAndCityInfo();
});