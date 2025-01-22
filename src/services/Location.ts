export default class Location {
  private _geolocaiontEndpoint = `https://nominatim.openstreetmap.org/search?&format=geojson&q=`;
  private _zipcodeEndpoint = `https://viacep.com.br/ws/$zipcode/json/`;

  async getCoordinates(cityName: string) {
    if (!cityName) {
      return null;
    }

    const response = await fetch(
      `${this._geolocaiontEndpoint}${encodeURIComponent(cityName)}`
    );
    const data = await response.json();
    if (!data.features.length) {
      return data.features[0].geometry.coordinates;
    }
  }

  async getLocationByZipCode(zipCode: string) {
    if (!zipCode) {
      return null;
    }

    const response = await fetch(
      this._zipcodeEndpoint.replace("$zipcode", zipCode)
    );
    const data = await response.json();
    if (data.uf && data.localidade) {
      const coordinates = this.getCoordinates(data.localidade);

      return {
        uf: data.uf,
        city: data.localidade,
        address: data.logradouro,
        neighborhood: data.bairro,
        coordinates: coordinates || [],
      };
    }
  }
}
