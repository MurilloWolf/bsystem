import { Directions, InputFormat, RadiationByAngle } from "./types";

function calculateSolarRadiation(data: InputFormat, location: string) {
  const directions: Directions[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const angles = Array.from({ length: 19 }, (_, i) => i * 5); // Inclinações de 0 a 90 graus
  const MOTHS = 12;
  const azimuths: Record<Directions, number> = {
    N: 0,
    NNE: 22.5,
    NE: 45,
    ENE: 67.5,
    E: 90,
    ESE: 112.5,
    SE: 135,
    SSE: 157.5,
    S: 180,
    SSW: 202.5,
    SW: 225,
    WSW: 247.5,
    W: 270,
    WNW: 292.5,
    NW: 315,
    NNW: 337.5,
  };

  const results: RadiationByAngle = {};

  // Iterar sobre cada direção cardeal
  directions.forEach((direction) => {
    const azimuth = azimuths[direction]; // Obtém o azimute para a direção
    results[direction] = {};

    // Iterar sobre cada inclinação
    angles.forEach((angle) => {
      results[direction][`${angle}`] = {};
      let totalRadiation = 0;
      // Calcular a radiação para cada mês
      Object.keys(data.properties.parameter.ALLSKY_SFC_SW_DNI).forEach(
        (month) => {
          const dni = data.properties.parameter.ALLSKY_SFC_SW_DNI[month];

          const adjustedRadiation =
            dni *
            Math.cos((angle * Math.PI) / 180) *
            Math.cos((azimuth * Math.PI) / 180);

          // Evitar valores negativos (ocorre quando o ângulo de incidência não capta radiação)
          const normalizedRadiation = Math.max(0, adjustedRadiation);

          results[direction][`${angle}`][month] = normalizedRadiation;
          totalRadiation += normalizedRadiation;
        }
      );
      results[direction][`${angle}`]["annual"] = totalRadiation / MOTHS;
    });
  });

  return {
    location,
    results,
  };
}
export default calculateSolarRadiation;
