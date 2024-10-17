import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';

const containerStyle = {
  width: '100%',
  height: '400px'
};



type Local={
        cep:string,
        street:string,
        neighborhood:string,
        state:string,
        city:string,
        complement:string,
        number:number
    }

function ProfileMaps() {
    const router = useRouter()
 const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCTKEURFyZu2doRNGRSnckjGwVjAgXOgXI"
  })
  const [local, setLocal] = useState<Local>()
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(()=>{
    if(router.isReady){
    api.get(`/getPartnerAddressPage/${router.query.perfil}`).then((ress)=>{
        setLocal(ress.data)
        
    })
}
    
  },[router.isReady])
  useEffect(()=>{
    local && local.number != undefined &&
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${local.number}+${local.street.replace(/\s+/g, '+')},+${local.neighborhood.replace(/\s+/g, '+')},+CA&key=AIzaSyCTKEURFyZu2doRNGRSnckjGwVjAgXOgXI`)
    .then((response)=>{
        setLatitude(parseFloat(response.data.results[0].geometry.location.lat))
        setLongitude(parseFloat(response.data.results[0].geometry.location.lng))
        console.log(response)
    })
  },[local])

  const position = {
    lat: latitude,
    lng: longitude
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map:any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(position);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map:any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={position}/>
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(ProfileMaps)