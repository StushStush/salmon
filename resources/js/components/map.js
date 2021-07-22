import Alpine from "alpinejs";
import { gsap } from "gsap";

let map;
const mapSettings = {
  zoom: 9,
};
const styles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

Alpine.data("map", () => ({
  selectedCity: null,
  citiesArray: [],
  init() {
    const zoomInButton = document.getElementById("map-button__plus");
    const zoomOutButton = document.getElementById("map-button__minus");
    const locationButton = document.getElementById("map-button__location");
    const image = "assets/static/location-icon.svg";

    let selfLocationMarker;

    this.citiesArray = JSON.parse(this.$el.dataset.cities);

    this.$el.querySelectorAll("button").forEach((el, i) => {
      this.citiesArray[i].button = el;
    });

    map = new google.maps.Map(this.$refs.mapContainer, {
      zoom: mapSettings.zoom,
      minZoom: mapSettings.zoom - 3,
      maxZoom: mapSettings.zoom + 6,
      center: {
        lat: Number(this.citiesArray[0].center_lat),
        lng: Number(this.citiesArray[0].center_lng),
      },
      disableDefaultUI: true,
      styles: styles,
    });

    this.citiesArray.forEach(({ geojson }) => {
      map.data.loadGeoJson(geojson);
    });

    map.data.setStyle({
      fillColor: "#d09cf6",
      strokeColor: "#d09cf6",
      fillOpacity: 0.15,
      strokeWeight: 2,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.select(this.citiesArray[0].title);
      });
    });

    locationButton.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (selfLocationMarker)
            selfLocationMarker.setMap(null);

          selfLocationMarker = new google.maps.Marker({
            position: pos,
            map,
            icon: image,
          });

          selfLocationMarker.setMap(map);

          map.panTo(pos);
        });
      } else {
        alert("SORRY!");
      }
    });

    google.maps.event.addDomListener(zoomInButton, "click", function () {
      map.setZoom(map.getZoom() + 1);
    });

    google.maps.event.addDomListener(zoomOutButton, "click", function () {
      map.setZoom(map.getZoom() - 1);
    });
  },
  select(id) {
    this.selectedCity = this.citiesArray.find((u) => u.title === id);

    gsap.to("[data-mapSelect-bg]", {
      ease: "power4.inOut",
      x: this.selectedCity.button.offsetLeft,
      width: this.selectedCity.button.offsetWidth,
    });

    map.panTo({
      lat: Number(this.selectedCity.center_lat),
      lng: Number(this.selectedCity.center_lng),
    });
  },
}));
