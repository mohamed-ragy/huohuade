draw_location_map = function(container,lat,lng,controls = true){
    let markerIcon = L.icon({
        iconUrl: '../storage/imgs/marker-icon.png',
        iconSize:     [25, 41], // size of the icon
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
     });
    let location = [parseFloat(lat),parseFloat(lng)];
    let LocationZoom = 18;
    if(lng == '0' && lat == '0' ){
        LocationZoom = 1;
    }
    window[container] = L.map(container).setView(location, LocationZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' +
            ', Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>',
    }).addTo(window[container]);
    window[`${container}_marker`] = L.marker(location,{icon: markerIcon})
    if(lng != '0' && lat != '0' ){
        window[`${container}_marker`].addTo(window[container]);
    }
    $('#'+container).find('.leaflet-control-attribution').children().first().addClass('none')
    $('#'+container).find('.leaflet-control-attribution').children().eq(1).addClass('none')
    window[container].invalidateSize();
    $('#'+container).find('.leaflet-control-zoom-in').text('').addClass('p5').attr('title',null).attr('tooltip',text.main.zoomIn).append(
        $('<div/>',{class:'ico-zoom-in h20 w20'})
    )
    $('#'+container).find('.leaflet-control-zoom-out').text('').addClass('p5').attr('title',null).attr('tooltip',text.main.zoomOut).append(
        $('<div/>',{class:'ico-zoom-out h20 w20'})
    )
    if(controls){
        $('#'+container).find('.leaflet-control-zoom').append(
            $('<a/>',{
                class:'leaflet-control-currentLocation',
                'aria-disabled':false,
                role:'button',
                tooltip:text.main.currentLocation,
            }).append(
                $('<div/>',{class:'ico-gps h20 w20'})
            )
        )

    }


    if(controls){
        window[container].on('click',function(e){
            if($('.leaflet-control-currentLocation:hover').length > 0){return;}
            window[`${container}_marker`].addTo(window[container]).setLatLng(e.latlng);
        });
        $('html,body').on('click',`#${container} .leaflet-control-currentLocation`,function(e){
            // e.preventDefault();
            // e.stopPropagation();
            e.stopImmediatePropagation();
            navigator.geolocation.getCurrentPosition(function(pos){
                window[container].flyTo([pos.coords.latitude,pos.coords.longitude], 15, {
                    animate: true,
                    duration: 1
                });
                window[`${container}_marker`].addTo(window[container]).setLatLng([pos.coords.latitude,pos.coords.longitude]);
            });
        })
    }





}
