import React, {useEffect, useRef, useState} from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

import classes from "./Map.module.css";

const Map = () => {
    const mapElement = useRef<HTMLDivElement>(null);
    const mapLongitude:number = 28.4393523;
    const mapLatitude:number = 49.2392492;
    const center = [mapLongitude, mapLatitude] as [number, number];
    const mapZoom:number = 18;
    const [map, setMap] = useState({});

    useEffect(() => {
        let map = tt.map({
            key: "PeLJs6Mcq7g5TyHRADwfDzWfJ6mZyhF3",
            container: mapElement.current!,
            center: center,
            zoom: mapZoom,
        });

        let marker = new tt.Marker().setLngLat(center).addTo(map);

        let popupOffsets:any = {
            top: [0, 0],
            bottom: [0, -70],
            "bottom-right": [0, -70],
            "bottom-left": [0, -70],
            left: [25, -35],
            right: [-25, -35],
        };

        let popup = new tt.Popup({offset: popupOffsets}).setHTML(
            "Типографія ПромЕнерго\n вул.Генерала Арабея 13"
        );

        marker.setPopup(popup).togglePopup();
        setMap(map);
        return () => map.remove();
    }, []);

    return <div ref={mapElement} className={classes.map}/>;
};

export default Map;