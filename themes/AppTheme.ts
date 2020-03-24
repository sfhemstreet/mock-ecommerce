enum Colors {
  black = '#19181A',
  green = '#479761',
  yellow = '#CEBC81',
  rose = '#A16E83',
  brown = '#B19F9E',
  white = '#EEE',
  transparentBlack = 'rgba(25, 24, 26, 0.6)',
  transparentGreen = 'rgba(71, 151, 97, 0.6)',
  transparentYellow = 'rgba(206, 188, 129, 0.6)',
  transparentRose = 'rgba(161, 110, 131, 0.6)',
  transparentBrown = 'rgba(177, 159, 158, 0.6)',
  transparentWhite = 'rgba(238, 238, 238, 0.6)',
}

enum Gradients {
  blackToWhite = "linear-gradient(0deg, rgba(25,24,26,1) 0%, rgba(238,238,238,0.2) 100%)",
  blackToYellow = "linear-gradient(0deg, rgba(25,24,26,1) 0%, rgba(206,188,129,0.64) 100%)",
}

enum Typography {
  fontSize = '16px',
  fontFamily = "'Rubik', Arial, sans-serif",
}

enum Transitions {
  sideDrawer = "all 0.3s linear",
  transformed = "all 0.5s ease-in-out",
  filtered = "0.4s ease-in",
}

export const AppTheme = {
  name: "AppTheme",
  primaryColor: Colors.green,
  colors: Colors,
  gradients: Gradients,
  typography: Typography,
  transitions: Transitions,
}