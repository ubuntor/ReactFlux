import { generate, getRgbStr } from "@arco-design/color";

import { getConfig } from "./config";

const colors = {
  Red: { light: "#F53F3F", dark: "#F76965" },
  Orange: { light: "#F77234", dark: "#F9925A" },
  Green: { light: "#00B42A", dark: "#27C346" },
  Blue: { light: "#165DFF", dark: "#3C7EFF" },
  Purple: { light: "#722ED1", dark: "#8E51DA" },
};

const getColorValue = (colorName) => {
  // 查找匹配颜色名称的对象
  const color = colors[colorName] || colors.Blue;
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const theme = getConfig("theme");
  const isDarkMode = theme === "system" ? isSystemDark : theme === "dark";
  return isDarkMode ? color.dark : color.light;
};

const applyColor = (colorName) => {
  const colorPalette = generate(getColorValue(colorName), { list: true }).map(
    getRgbStr,
  );
  colorPalette.forEach((color, index) => {
    document.body.style.setProperty(`--primary-${index + 1}`, color);
  });
};

export { colors, getColorValue, applyColor };