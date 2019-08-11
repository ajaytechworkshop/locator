$(document).ready(() => {
    let mymap = L.map('mapid');
    let notes = null;

    loadMap();
    loadMyLocation();
    populateSavedLocationInMap();

    function loadMap() {
        const tilesurl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWpheXRlY2h3b3Jrc2hvcCIsImEiOiJjanowMXo5cTMwN2M0M21xbGgzN3c2eXk4In0.o3sB4fUIa4Zqbn2Jf17D_Q';
        const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
        const accessToken = 'pk.eyJ1IjoiYWpheXRlY2h3b3Jrc2hvcCIsImEiOiJjanowMXo5cTMwN2M0M21xbGgzN3c2eXk4In0.o3sB4fUIa4Zqbn2Jf17D_Q';

        L.tileLayer(`${tilesurl}`, { attribution: `${attribution}`, maxZoom: 18, id: 'mapbox.streets', accessToken: `${accessToken}` }).addTo(mymap);
        console.log("Map  Loaded");
    }

    //Load My Location    
    function loadMyLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            let currentLatitude = position.coords.latitude;
            let currentLongitude = position.coords.longitude;
            var circle = L.circle([currentLatitude, currentLongitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 5000
            }).addTo(mymap);
            mymap.setView([currentLatitude, currentLongitude], 10);
            L.marker([currentLatitude, currentLongitude]).addTo(mymap).bindTooltip('You are currently here').openTooltip();
        });
    }

    //
    function populateSavedLocationInMap() {
        console.log("Fetching All Locations");
        fetch('/location/all').then((response) => response.json()).then((data) => {
            console.log(data);
            for (i in data) {
                L.marker([data[i].latitude, data[i].longitude],
                    {
                        markerId: data[i]._id,
                        notes: data[i].notes
                    }).addTo(mymap).on('mouseover', (e) => {
                        if(e.sourceTarget.options.notes){
                            e.sourceTarget.bindTooltip(e.sourceTarget.options.notes).openTooltip();
                        }    
                        console.log(e.sourceTarget.options.markerId);
                    }).on('click', (event) => {
                        L.popup().setLatLng([event.latlng.lat, event.latlng.lng]).setContent('<div class="panel-body" id="popUp"><h6>Notes</h6><input type="text" id="notes" name="notes" width="100"/><div class="panel-body"><div class="btn-group-horizontal"><button id="btnSave" class="btn btn-success" name="save" style="margin-right:5px">Save</button><button class="btn btn-danger" id="btnDelete" name="delete">Delete</button></div></div>').openOn(mymap);
                        $('#notes').val(event.sourceTarget.options.notes);
                        $('#btnDelete').click(() => {
                            const options = {
                                method: 'DELETE',
                            };
                            fetch(`/location/${event.sourceTarget.options.markerId}`, options).then((response) => {
                                if (response.status == 202) {
                                    location.reload();
                                }
                            }
                            );
                        });
                        $('#btnSave').click(() => {
                            let options = {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    latitude: event.latlng.lat,
                                    lomgitude: event.latlng.lng,
                                    notes: document.getElementById('notes').value
                                })
                            };
                            //alert(document.getElementById('notes').value);
                            fetch(`/location/${event.sourceTarget.options.markerId}`, options).then((response) => {
                                if (response.status == 200) {
                                    location.reload();
                                }
                            });
                        });
                    });
            }
        });
    }

    //Save the location on click on the map
    mymap.on('click', function (e, txtValue) {
        let popup = L.popup().setLatLng([e.latlng.lat, e.latlng.lng])
            .setContent('<div class="panel-body" id="popUp"><h6>Notes</h6><input type="text"  id="notes" name="notes" width="100"/><button class="btn btn-success" style="margin-left:5px" id="btnSave" name="save">Save</button>').openOn(mymap);
        //marker.bindPopup(popup);

        $('#btnSave').click(() => {
            document.getElementsByClassName('leaflet-popup-content').hidden = true;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                    notes: document.getElementById('notes').value
                })
            };
            fetch('/location', options)
                .then((response) => {
                    if (response.status == 201) {
                        //populateSavedLocationInMap();
                        location.reload();
                    }
                });
        });
    });

});
