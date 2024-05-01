export const map = () => {

    const markerProps = [
        {
            iconSrc: "../assets/img/mappoint.svg",
            coordinates: [30.326142, 59.953139]
        },
        {
            iconSrc: "../assets/img/mappoint.svg",
            coordinates: [30.430374, 59.938283]
        },
        {
            iconSrc: "../assets/img/mappoint.svg",
            coordinates: [30.361730, 59.929081]
        }
    ];
    main();
      async function main() {
        // Waiting for all api elements to be loaded
        await ymaps3.ready;
        const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;

        // Initialize the map
        const map = new YMap(
          // Pass the link to the HTMLElement of the container
          document.getElementById('map'),
          // Pass the map initialization parameters
          {location: {center: [30.361730, 59.929081], zoom: 11}, showScaleInCopyrights: true, mode: 'vector'},
          [
            // Add a map scheme layer
            new YMapDefaultSchemeLayer({}),
            // Add a layer of geo objects to display the markers
            new YMapDefaultFeaturesLayer({})
          ]
        );

        // Create markers with a custom icon and add them to the map
        markerProps.forEach((markerProp) => {
          const markerElement = document.createElement('img');
          markerElement.className = 'icon-marker';
          markerElement.src = markerProp.iconSrc;
          map.addChild(new YMapMarker({coordinates: markerProp.coordinates}, markerElement));
        });
    }

    
}

