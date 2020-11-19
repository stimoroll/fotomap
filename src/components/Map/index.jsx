import React from "react";
import './Map.css';
import L from "leaflet";
import config from '../../config/config';
import UIContext from '../../providers/uiContext';
import uploadWidget from '../../helpers/uploadWidget';
import saveToCloud from '../../helpers/saveToCloud';
import Loader from '../Loader';
import { db } from '../../providers/firebase';

//TODO: move to default config
config.spinner = {
  type: 'spinningBubbles'
}

//TODO: move to css file
const style = {
  width: "100vw",
  height: "100vh"
};

class Map extends React.Component {

  static contextType = UIContext;
  constructor() {
    super();
    //TODO: replace with reading form cloudinary
    this.state = {
      center: config.defaults.position,
      markers: [
        // { lat: 50.25798891933303, lng: 19.021024703979496 },
        // { lat: 59.2580, lng: 19.0212 }
      ]
    }

    db.get()
      .then(snapshot => {
        let tempmark = [];
        snapshot.forEach(doc => {
          // console.log(doc.data());
          // this.setState([...this.state.markers, doc.data()]);
          // this.state.markers.push(doc.data());
          tempmark.push(doc.data());
        });
        console.log(tempmark);
        this.setState({...this.state, markers: tempmark });
      })
    
    // .then()

  }
  showLoader() {
    this.setState({
      ...this.state,
      loading: true
    });
  }

		// var marker = L.marker(photo, {
		// 	icon: L.divIcon(L.extend({
		// 		html: '<div style="background-image: url(' + photo.thumbnail + ');"></div>​',
		// 		className: 'leaflet-marker-photo'
		// 	}, photo, this.options.icon)),
		// 	title: photo.caption || ''
    // });
    
  
  // var myIcon = L.divIcon({className: 'my-div-icon'});
// you can set .my-div-icon styles in CSS

  showMarkers() {
    this.state.markers.map((data, idx) => {
      console.log(data);
      let { lat, lng, thumbnail_url, secure_url, width, height } = data;
      console.log("LATLNG", data.lat, data.lng);
      let greenIcon = L.icon({
        iconUrl: thumbnail_url,
        iconSize: [40, 40], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      let popup = L.popup()
          .setContent('<div style="width: 300px; height: 10vh; min-height: 150px; background: url(' + secure_url + ')" ></div>')

      let marker = L.marker([lat, lng], { icon: greenIcon })
        .addTo(this.fotosMap)
        .bindPopup(popup)

      marker.on('mouseover', function (ev) {
        marker.openPopup();
      });
      marker.on('mouseout', function (ev) {
        marker.closePopup();
      });
      marker.on('click', function (e) {
        //TODO: add redirect to full image with description
      });
    });
    // this.map.fitBounds(this.fotosMap.getBounds());
  }

  makeHideLoader() {
    return () => {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentDidMount() {
    this.fotosMap = L.layerGroup(this.maker);
    const baseMap = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
    this.map = L.map("map", {
      center: this.state.center,
      zoom: 16,
      layers: [baseMap, this.fotosMap ]
    });

    this.map.on('click', (e) => {
      this.showLoader()
      const hideLoader = this.makeHideLoader();
      uploadWidget(config, e.latlng, saveToCloud, hideLoader);

      this.addMarker(e.latlng);
      this.setState([...this.state.markers, e.latlng]);
      this.marker = L.marker(e.latlng).addTo(this.map);
    });

  }
  componentDidUpdate(prevState) {
    if (prevState !== this.state) {
      //TODO: compare and update only diffrent 
      this.showMarkers();
    }
  }

  addMarker = (LatLng) => {
    this.setState([...this.state.markers, LatLng]);
    this.marker = L.marker(LatLng).addTo(this.map);
  }

  render() {
    return (
      <div>
        {
          this.state.loading && <Loader type={config.spinner.type} color="#000" />
        }
        <div id="map" style={style} />
      </div>
    )
  }
}

export default Map;