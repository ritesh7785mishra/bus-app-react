import './Home.css'
import React, { useEffect, useState,useRef } from 'react'
import { Box,Button,TextField } from '@mui/material'
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import Autocomplete from '@mui/material/Autocomplete';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { AccountCircleOutlined } from '@mui/icons-material';
import { apiKey } from '../../util';
import { useSelector } from 'react-redux';





function Home(props) {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(null)
  //26.423649620885715, 80.39904990500386
  const [latitude, setLatitude] = useState(null)
  const admin = useSelector(state => state.admin)

  //





// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'Ramadevi-to-Rawatpur', year: 1994 },
  { label: 'Rawatpur-to-ramadevi', year: 1974 },
  { label: 'Jajmau-to-Bithoor', year: 1972 },
  { label: 'Bithoor-to-Jajmau', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
];

  const convertToPoints = (lngLat) => {
    // console.log("This is lngLat",lngLat)
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng
      }
    }
  }

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson
      },
      paint: {
        'line-color': '#4a90e2',
        'line-width': 6

      }
    })
  }

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element
    })
    .setLngLat(lngLat)
    .addTo(map)
  }

  
  



  useEffect(() => {

    navigator.geolocation.getCurrentPosition(function(position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
    const origin = {
      lng: longitude,
      lat: latitude,
    }
    const destinations = []

  

    let map = tt.map({
      key: apiKey,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 14,
    })
    setMap(map)

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25]
      }
      const popup = new tt.Popup({ offset: popupOffset }).setHTML('This is you!')
      const element = document.createElement('div')
      element.className = 'marker'

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
      .setLngLat([longitude, latitude])
      .addTo(map)
      
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })

      marker.setPopup(popup).togglePopup()
      
    }
    addMarker()

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination)
      })
      const callParameters = {
        key: apiKey,
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      }

    return new Promise((resolve, reject) => {
      ttapi.services
        .matrixRouting(callParameters)
        .then((matrixAPIResults) => {
          const results = matrixAPIResults.matrix[0]
          const resultsArray = results.map((result, index) => {
            return {
              location: locations[index],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            }
          })
          resultsArray.sort((a, b) => {
            return a.drivingtime - b.drivingtime
          })
          const sortedLocations = resultsArray.map((result) => {
            return result.location
          })
          resolve(sortedLocations)
        })
      })
    }

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin)

        ttapi.services
          .calculateRoute({
            key: apiKey,
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson()
            drawRoute(geoJson, map)
        })
      })
    }


    map.on('click', (e) => {
      destinations.push(e.lngLat)
      addDeliveryMarker(e.lngLat, map)
      recalculateRoutes()
      console.log(destinations, 'This is destinations array')
    })

    return () => map.remove()
  }, [longitude, latitude])


  const allBusesLocation = () => {
    admin.conductors.map(conductor =>{
      console.log(conductor)

      fetch(`https://api.tomtom.com/locationHistory/1/history/position/${conductor.id}?key=${apiKey}`)
      .then(res => res.json())
      .then(data => console.log(data))
    })
  }

    

  return (
    <div className='homeBox'>
        <div className="homeNavBar">
            <DepartureBoardIcon/>
            <h3 className="homeTitle">Home</h3>
            <div className="homeUserName">
              <AccountCircleOutlined/>
              <p className="userName">Ritesh Mishra</p>
            </div>
        </div>

        <div className="searchBar">
            <h2>Where to?</h2>
           
            {/* <input
                type="text"
                id='longitude' 
                className='longitude'
                placeholder='put in longitude'
                onChange={(e)=>{setLongitude(e.target.value)}}
            />

            <input
                type="text"
                id='latitude' 
                className='latitude'
                placeholder='put in latitude'
                onChange={(e)=>{setLatitude(e.target.value)}}
            /> */}

          <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 200 , marginLeft: '5em',marginBottom: '3em'}}
              renderInput={(params) => <TextField {...params} label="Select Route" size='small' />}
          />

        </div>

        <Button onClick={()=>allBusesLocation()}>get current location</Button>
        
        <div ref={mapElement} className='busMap'/>
        
    </div>
  )
}

export default Home