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
  productPreviewText = '#19181A',
  productPreviewBackground = '#FFF',
}

enum Gradients {
  blackToWhite = "linear-gradient(0deg, rgba(25,24,26,1) 0%, rgba(238,238,238,0.2) 100%)",
  blackToYellow = "linear-gradient(0deg, rgba(25,24,26,1) 0%, rgba(206,188,129,0.64) 100%)",
  crazy= "linear-gradient(345deg, rgba(25,24,26,1) 0%, rgba(120,83,98,0.8) 74%, rgba(111,101,101,0.8) 84%, rgba(108,98,68,0.8) 94%, rgba(34,70,46,0.8) 100%)",
  crazyLite="linear-gradient(340deg, rgba(25,24,26,1) 0%, rgba(161,110,131,0.9640231092436975) 64%, rgba(177,159,158,0.6) 78%, rgba(206,196,129,0.5) 91%, rgba(71,151,97,0.08883928571428571) 100%)",
}

enum Typography {
  fontSize = '16px',
  bigFontSize = '20px',
  smallFontSize = '14px',
  fontFamily = "'Rubik', Arial, sans-serif",
}

enum Transitions {
  sideDrawer = "all 0.3s linear",
  transformed = "all 0.5s ease-in-out",
  filtered = "0.4s ease-in",
}

enum ZIndexes {
  productOptionSelecter = '10',
  modalBelowNavigationBar = '18',
  navigationBar = '19',
  sideDrawer = '20',
  searchBoxResults = '30',
  modal = '40',
}

export const AppTheme = {
  name: "AppTheme",
  primaryColor: Colors.green,
  colors: Colors,
  gradients: Gradients,
  typography: Typography,
  transitions: Transitions,
  zIndexes: ZIndexes,
}