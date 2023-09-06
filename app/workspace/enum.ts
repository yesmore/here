interface KeyValueMappings {
  [colorValue: string]: string;
}

export const colorValueMappings: KeyValueMappings = {
  "0": "bg-gradient-to-br from-cyan-50 via-yellow-50 to-yellow-100",
  "2": "bg-gradient-to-br from-pink-50 via-cyan-50 to-yellow-100",
  "3": "bg-gradient-to-br from-slate-600 via-slate-400 to-slate-500",
  "4": "bg-gradient-to-br from-purple-400 via-pink-300 to-pink-200",
  "100": "#000000",
  "101": "#ffffff",
  "102": "#d37a73",
  "103": "#a3c4d7",
  "104": "#d7c9a3",
  "105": "#ffffff",
  "106": "#d37a73",
  "107": "#a3c4d7",
  "108": "#d7c9a3",
  "109": "#a3c4d7",
  "110": "#d7c9a3",
  "111": "#ffffff",
  "112": "#d37a73",
  "113": "#a3c4d7",
  "114": "#d7c9a3",
  "115": "#07c9a3",
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
export const layoutValueMappings: KeyValueMappings = {
  "0": "start",
  "1": "center",
};
export const roundedValueMappings: KeyValueMappings = {
  "0": "rect",
  "1": "rounded",
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
// Layout
export function translateValueToLayout(value: string): string {
  return layoutValueMappings[value] || "";
}
export function translateLayout(layout: string): string {
  for (const value in layoutValueMappings) {
    if (layoutValueMappings[value] === layout) {
      return value;
    }
  }
  return "";
}
// Rounded
export function translateValueToRounded(value: string): string {
  return roundedValueMappings[value] || "";
}
export function translateRounded(rounded: string): string {
  for (const value in roundedValueMappings) {
    if (roundedValueMappings[value] === rounded) {
      return value;
    }
  }
  return "";
}
