# Solar Data

### Documentation

#### API Brazil cities

[Documentation](https://servicodados.ibge.gov.br/api/docs/localidades)

#### API Temporal Monthly Point - Solar data

[Power API](https://power.larc.nasa.gov/api/pages/)
[NASA POWER VIEW](https://power.larc.nasa.gov/data-access-viewer/)

#### API GEOLOCATION - latitude and longitude

[Geolocation search](https://nominatim.openstreetmap.org/search?q=Presidente%20Prudente&format=geojson)

### API Temporal Monthly Point - Solar data

```bash
https://power.larc.nasa.gov/api/temporal/monthly/point?start=20210101&end=20220101&latitude=-51.389&longitude=-22.131&community=sb&parameters=ALLSKY_SFC_SW_DWN&format=json&user=wolf&header=true&time-standard=utc
```

```javascript
const startDate = "2021";
const endDate = "2022"
const latitude = "-23.255";
const longitude = "-51.2043";
const param = "ALLSKY_SFC_SW_DWN";

const endpoint = `https://power.larc.nasa.gov/api/temporal/monthly/point`
const query =  `?start=${startDate}&end=${endDate}&latitude=${latitude}&longitude=${longitude}&community=RE&parameters=${param}&format=JSON&theme=light&user=DAVE&time-standard=UTC
```
