interface KeyValueMappings {
  [colorValue: string]: string;
}

export const gradientColorsValue = ["0", "1", "2", "3", "4", "5", "6"];
export const commonColorsValue = ["10", "11", "12", "13", "14", "15"];
export const colorValueMappings: KeyValueMappings = {
  "0": "bg-gradient-to-br from-cyan-50 via-yellow-50 to-yellow-100",
  "1": "bg-gradient-to-br from-yellow-50 via-yellow-50 to-cyan-100",
  "2": "bg-gradient-to-br from-pink-50 via-cyan-50 to-yellow-100",
  "3": "bg-gradient-to-br from-slate-600 via-slate-400 to-slate-500",
  "4": "bg-gradient-to-br from-purple-400 via-pink-300 to-pink-200",
  "100": "#000000",
  "101": "#ffffff",
  "102": "#d37a73",
  "103": "#a3c4d7",
  "104": "#d7c9a3",
};

export const sizeValueMappings: KeyValueMappings = {
  "0": "12",
  "1": "14",
  "2": "16",
};
export const styleValueMappings: KeyValueMappings = {
  "0": "",
  "1": "italic",
};
export const weightValueMappings: KeyValueMappings = {
  "0": "400",
  "1": "600",
};

// Color (text\background)
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
// Weight
export function translateValueToFontWeight(value: string): string {
  return weightValueMappings[value] || "";
}
export function translateFontWeight(weight: string): string {
  for (const value in weightValueMappings) {
    if (weightValueMappings[value] === weight) {
      return value;
    }
  }
  return "";
}
