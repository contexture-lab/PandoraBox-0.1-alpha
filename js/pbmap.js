var map;
var units = [];
var targets  = [];
var wayUnit  = [];
var iunit;
var itarget;
var ipathline;

var unitCircle;
var wayPath;

var isAddTarget = false;
var isUpdTarget = false;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: startLat, lng: startLng},
        mapTypeId: 'roadmap',
        zoom: 13,
        disableDefaultUI: true,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
        },
        fullscreenControl: false,
        styles: map_style0_show
    });

    map.addListener('rightclick', function(event) {
        var newLatLng = event.latLng;
        var strLat = event.latLng.lat;
        var strLng = event.latLng.lng;
        $.post("app/ajax.php", { oper: "add_target", lat: strLat, lng: strLng }, function(result) {
            soundClick();
            eval(result);
            if (isAddTarget == true) {
                var newmarker = addTarget(newLatLng, map, nameTarget, idNewTarget);
                map.panTo(newLatLng);
                var infoNewTarget = new google.maps.InfoWindow({
                    content: locale.new_goal_added+': '+nameTarget
                });
                infoNewTarget.open(map, newmarker);
                newmarker.addListener('click', function(e) {
                    map.panTo(e.latLng);
                });
                newmarker.addListener('dragend', function(e) {
                    var substrLat = e.latLng.lat;
                    var substrLng = e.latLng.lng;
                    $.post("app/ajax.php", { oper: "update_target_coord", targid: newmarker.dbid, lat: substrLat, lng: substrLng }, function(res) {
                        soundClick();
                        eval(res);
                        if (isUpdTarget == true) {
                            isUpdTarget = false;
                            if (isTargetList) {
                                $("#idTargetListBody").html("");
                                str1 = "oper=load_all_target_body&value="+countMsgList;
                                $("#idTargetListBody").load("app/ajax.php", str1);
                            }
                        }
                    } );
                });
                targets.push(newmarker);
                isAddTarget = false;
                if (isTargetList) {
                    countMsgList = 10;
                    $("#idTargetListBody").html("");
                    str1 = "oper=load_all_target_body&value="+countMsgList;
                    $("#idTargetListBody").load("app/ajax.php", str1);
                }
            }
        } );
    });

    unitCircle = new google.maps.Circle({
        strokeWeight: 0,
        fillColor: '#00FF00',
        fillOpacity: 0.10,
        map: map,
        geodesic: true,
        center: { lat: 0, lng: 0 },
        radius: 0
    });
    unitCircle.setMap(null);

    iunit = addUnit({lat: 0, lng: 0}, map, "_", 0);
    iunit.setMap(null);
    itarget = addTargetU({lat: 0, lng: 0}, map, "_", 0);
    itarget.setMap(null);
    ipathline = addLineUT({lat: 0, lng: 0}, {lat: 1, lng: 1}, map);
    ipathline.setMap(null);
    wayPath = new google.maps.Polyline({
        path: [{lat: 0, lng: 0}, {lat: 1, lng: 1}],
        geodesic: true,
        map: map,
        strokeColor: '#FF00FF',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    wayPath.setMap(null);

    var styleControl = document.getElementById('style-selector-control');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

    document.getElementById('hide-poi').addEventListener('click', function() {
      map.setOptions({styles: map_styles['hide']});
    });
    document.getElementById('show-poi').addEventListener('click', function() {
      map.setOptions({styles: map_styles['default']});
    });
}

function addLineUT(startCoords, stopCoords, map) {
    var flightPlanCoordinates = [
        startCoords,
        stopCoords
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        map: map,
        strokeColor: '#FF00FF',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    return flightPath;
}

function computeDistance(startCoords, stopCoords) {
    var ll01 = new google.maps.LatLng(startCoords);
    var ll02 = new google.maps.LatLng(stopCoords);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(ll01, ll02);
    return distance;
}

function addUnit(latLng, map, texttitle, dbidunit) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 5,
                strokeColor: '#1aeb22',
                strokeWeight: 2
            },
            title: texttitle,
            dbid: dbidunit
        });
    return marker;
}

function addManyUnits() {
    deleteAllUnits();
    $.post("app/ajax.php", { oper: "count_units" }, function(result1) {
        eval(result1);
        if (countunits > 0) {
            for (var i1 = 0; i1 < countunits; i1++) {
                $.post("app/ajax.php", { oper: "load_unit", value: i1, timecheck: timecheck }, function(result2) {
                    eval(result2);
                    var newmarker = addUnit(newLatLng, map, nameUnit, idNewUnit);
                    newmarker.addListener('click', function(e) {
                        countMsgList = 10;
                        panToUnit(idNewUnit);
                    });
                    units.push(newmarker);
                } );
            }
        }
    } );
}

function deleteAllUnits() {
    for (var i = 0; i < units.length; i++) {
        units[i].setMap(null);
    }
    units = [];
}

function addTarget(latLng, map, texttitle, dbidtarget) {
        var marker = new google.maps.Marker({
            position: latLng,
            draggable: true,
            map: map,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                scale: 5,
                strokeColor: '#ff001d',
                strokeWeight: 3
            },
            title: texttitle,
            dbid: dbidtarget
        });
    return marker;
}

function addTargetU(latLng, map, texttitle, dbidtarget) {
        var marker = new google.maps.Marker({
            position: latLng,
            draggable: false,
            map: map,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                scale: 5,
                strokeColor: '#ff001d',
                strokeWeight: 3
            },
            title: texttitle,
            dbid: dbidtarget
        });
    return marker;
}

function addManyTargets() {
    deleteAllTargets();
    $.post("app/ajax.php", { oper: "count_targets" }, function(result1) {
        eval(result1);
        if (counttargets > 0) {
            for (var i1 = 0; i1 < counttargets; i1++) {
                $.post("app/ajax.php", { oper: "load_target", value: i1 }, function(result2) {
                    eval(result2);
                    var newmarker = addTarget(newLatLng, map, nameTarget, idNewTarget);
                    newmarker.addListener('click', function(e) {
                        map.panTo(e.latLng);
                    });
                    newmarker.addListener('dragend', function(e) {
                        var substrLat = e.latLng.lat;
                        var substrLng = e.latLng.lng;
                        $.post("app/ajax.php", { oper: "update_target_coord", targid: newmarker.dbid, lat: substrLat, lng: substrLng }, function(res) {
                            soundClick();
                            eval(res);
                            if (isUpdTarget == true) {
                                isUpdTarget = false;
                                if (isTargetList) {
                                    $("#idTargetListBody").html("");
                                    str1 = "oper=load_all_target_body&value="+countMsgList;
                                    $("#idTargetListBody").load("app/ajax.php", str1);
                                }
                            }
                        } );
                    });
                    targets.push(newmarker);
                } );
            }
        }
    } );
}

function deleteAllTargets() {
    for (var i = 0; i < targets.length; i++) {
        targets[i].setMap(null);
    }
    targets = [];
}

function toggleTypeMap(tMap) {
    soundClick();
    map.setOptions({mapTypeId: tMap});
}
