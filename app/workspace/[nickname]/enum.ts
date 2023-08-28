interface KeyValueMappings {
  [colorValue: string]: string;
}

export const colorValueMappings: KeyValueMappings = {
  "0": "#000",
  "1": "#FF0000",
};
export const sizeValueMappings: KeyValueMappings = {
  "0": "12",
  "1": "14",
  "2": "16",
};
export const styleValueMappings: KeyValueMappings = {
  "0": "",
  "1": "",
  "2": "",
};

// Color
export function translateValueToColor(value: string): string {
  return colorValueMappings[value] || "#ffffff";
}
export function translateColorToValue(color: string): string {
  for (const value in colorValueMappings) {
    if (colorValueMappings[value] === color) {
      return value;
    }
  }
  return "";
}
// Size
export function translateValueToSize(value: string): string {
  return sizeValueMappings[value] || "#14";
}
export function translateValueToFontSize(size: string): string {
  for (const value in sizeValueMappings) {
    if (sizeValueMappings[value] === size) {
      return value;
    }
  }
  return "";
}
// Style
export function translateValueToFontStyle(value: string): string {
  return styleValueMappings[value] || "";
}
export function translateFontStyle(style: string): string {
  for (const value in styleValueMappings) {
    if (styleValueMappings[value] === style) {
      return value;
    }
  }
  return "";
}
