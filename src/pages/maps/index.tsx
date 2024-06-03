import DashboardLayout from '@/components/Layouts/DashboardLayout'
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
export default function Maps() {
    const containerStyle = {
        height: '50vh',
        width: '100%',
    }

    const center = {
        lat: 23.8041,
        lng: 90.4152,
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyB4iHwJTinaEMDdNEciuo3TZLfn9oAt9W0',
    })

    const [map, setMap] = React.useState(null)
    const [markerPosition, setMarkerPosition] = React.useState(center)

    const onMapClick = event => {
        const clickedLatLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        }
        setMarkerPosition(clickedLatLng)
    }

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    return (
        <DashboardLayout title="Maps">
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={onMapClick}>
                    {/* Child components, such as markers, info windows, etc. */}
                    {map && (
                        <Marker
                            position={markerPosition}
                            // onLoad={marker =>
                            //     console.log('Marker loaded', marker)
                            // }
                        />
                    )}
                </GoogleMap>
            )}
        </DashboardLayout>
    )
}
