# Calculate Radiation per angle

## Data format

```javascript
// input data
const input = {
  type: "Feature",
  geometry: { type: "Point", coordinates: [-51.374, -22.116, 407.49] },
  properties: {
    parameter: {
      ALLSKY_SFC_SW_DNI: {
        202201: 4.35,
        202202: 5.75,
        202203: 4.59,
        202204: 6.08,
        202205: 4.83,
        202206: 5.01,
        202207: 5.71,
        202208: 4.98,
        202209: 3.37,
        202210: 4.34,
        202211: 6.86,
        202212: 5.04,
      },
    },
  },
};

// output data
const output = {
  location: "Presidente Prudente",
  results: {
    N: {
      0: {
        202201: 4.35,
        202202: 5.75,
        202203: 4.59,
        202204: 6.08,
        202205: 4.83,
        202206: 5.01,
        202207: 5.71,
        202208: 4.98,
        202209: 3.37,
        202210: 4.34,
        202211: 6.86,
        202212: 5.04,
        annual: 5.07,
      },
      5: {
        // ...
      },
    },
    NE: {
      0: {
        // ...
      },
      5: {
        // ...
      },
    },
  },
};
```
