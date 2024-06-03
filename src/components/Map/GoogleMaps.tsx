import React, { useState, useCallback, FC, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Grid } from '@mui/joy'
import { googleApiKey } from '@/utils/constans'

interface MapsProps {
    initialCenter: google.maps.LatLngLiteral
    onUpdatePosition: (position: google.maps.LatLngLiteral) => void
}

const Maps: FC<MapsProps> = ({ initialCenter, onUpdatePosition }) => {
    const containerStyle = {
        height: '50vh',
        width: '100%',
    }

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [
        markerPosition,
        setMarkerPosition,
    ] = useState<google.maps.LatLngLiteral>(initialCenter)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleApiKey,
    })

    const onMapClick = useCallback(
        (event: google.maps.MapMouseEvent) => {
            const clickedLatLng = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            }
            setMarkerPosition(clickedLatLng)
            onUpdatePosition(clickedLatLng)
        },
        [onUpdatePosition],
    )

    const onLoad = useCallback(
        (map: google.maps.Map) => {
            const bounds = new window.google.maps.LatLngBounds(initialCenter)
            map.fitBounds(bounds)
            map.setOptions({ maxZoom: 15 })
            setMap(map)
        },
        [initialCenter],
    )

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    useEffect(() => {
        // Update marker position when the initial center is updated
        setMarkerPosition(initialCenter)
        if (map) {
            const bounds = new window.google.maps.LatLngBounds(initialCenter)
            map.fitBounds(bounds)
        }
    }, [initialCenter, map])

    return (
        <Grid container>
            <Grid xs={12}>
                {isLoaded && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={initialCenter}
                        zoom={8}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={onMapClick}>
                        {map && <Marker position={markerPosition} />}
                    </GoogleMap>
                )}
            </Grid>
        </Grid>
    )
}

export default Maps
