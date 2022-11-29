import { useState } from 'react';
import './App.css';



function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&limit=1&appid=${process.env.REACT_APP_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetch(url)
        .then((res) => res.json())
        .then(data => {
          setData(data)
          console.log(data)
        })
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className='search'>
        <input
          type='text'
          onKeyPress={searchLocation}
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location...'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : 'Please Search a Location'}
          </div>
          <div className='description'>
            {data.weather ? <p> {data.weather[0].description}</p> : null}
          {data.weather ? <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={`${data.weather[0].description}`} /> : null}
          </div>
        </div>
        {data.main !== undefined &&

          <div className='bottom'>
            <div className='feels'>
              <p>Feels Like</p>
              {data.main ? <p> {data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className='humidity'>
              {data.main ? <p> {data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p> {data.wind.speed}mph</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
