/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import { banks } from '../api/banks';
import { errorApi } from '../error/errorApi';

export async function bankMap() {
  const title = el('h1.bankMap__title', 'Карта банкоматов');
  const divTop = el('div.bankMap__divTop', title);
  const createMap = el('div.#map');
  const createCoder = el('div.#geocoder.geocoder');
  const divBot = el('div.bankMap__divBot', createMap, createCoder);
  const container = el('div.bankMap__container', divTop, divBot);
  const ATM = await banks();

  function mapOnly(pos) {
    if (pos.length === 0) pos = [37.617698, 55.755864];
    mapboxgl.accessToken = 'pk.eyJ1IjoibGFtbWFwcm9qZWN0cyIsImEiOiJjbGc1aG9raTMwM21pM3BxbjB3OHlxNTZtIn0.fujytbzIsK1bAmFhrK00pQ';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: pos,
      zoom: 8,
    });

    for (const i of ATM.payload) {
      const element = el('div.marker');
      const arr = [i.lon, i.lat];

      const marker = new mapboxgl.Marker(element)
        .setLngLat(arr)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              '<h3>Время работы</h3><p>C 7:00 до 23:00</p>',
            ),
        )
        .addTo(map);
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
    });

    const inp = document.getElementById('geocoder');
    inp.appendChild(geocoder.onAdd(map));
  }

  function success({ coords }) {
    const { latitude, longitude } = coords;
    const position = [longitude, latitude];
    mapOnly(position);
  }

  function error({ message }) {
    mapOnly([]);
  }

  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
  });

  return container;
}
