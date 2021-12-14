import { createContext, useState } from 'react';

export const ThemeContext = createContext();
const themes = {
  dark: {
    backgroundColor: "#131313",
    color: "white"
  },
  light: {
    backgroundColor: "#ffff",
    color: "black"
  }
}
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light
  const toggleTheme = () => {
    setIsDark(!isDark);
  }
  return (
    <ThemeContext.Provider value={[theme, isDark, toggleTheme]}>
      {children}</ThemeContext.Provider>
  )
}

