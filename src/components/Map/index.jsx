import React from "react";
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
        { lat: 50.25798891933303, lng: 19.021024703979496 },
        { lat: 59.2580, lng: 19.0212 }
      ]
    }

    db.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          //TODO: change to setState if required
          this.state.markers.push(doc.data());
        });
      });

  }
  showLoader() {
    this.setState({
      ...this.state,
      loading: true
    });
  }

  showMarkers() {
    this.state.markers.map((data, idx) => {
      const { lat, lng } = data;
      console.log(data);
      console.log(lat, lng);
      this.marker = L.marker({ lat, lng }).addTo(this.map);
    });
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
    this.map = L.map("map", {
      center: this.state.center,
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    this.showMarkers();

    this.map.on('click', (e) => {
      this.showLoader()
      const hideLoader = this.makeHideLoader();
      uploadWidget(config, e.latlng, saveToCloud, hideLoader);

      this.addMarker(e.latlng);
      this.setState([...this.state.markers, e.latlng]);
      this.marker = L.marker(e.latlng).addTo(this.map);
    });

  }
  componentDidUpdate({markers}) {

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