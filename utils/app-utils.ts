export const convertTemp = (
  temp: number | undefined,
  unit: string | undefined
) => {
  if (temp === undefined) {
    return "😔";
  }
  let res = temp;
  switch (unit) {
    case "kelvin":
      break;
    case "celsius":
      res = temp - 273.15;
      break;
    case "fahr":
      res = (temp - 273.15) * (9 / 5) + 32;
      break;
    default:
      return "Invalid unit";
  }
  return `${res.toFixed(2)} ${
    unit === "celsius" ? "C" : unit === "fahr" ? "F" : "K"
  }`;
};

export const getBgColor = (condition: string) => {
  switch (condition) {
    case "Rain":
      return "bg-blue-500";
    case "Snow":
      return "bg-white";
    case "Clouds":
      return "bg-gray-300";
    default:
      return "bg-gray-100";
  }
};
