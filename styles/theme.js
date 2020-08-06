const fontSizes = [18, 22, 30, 45, 75]
const space = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
const colors = {
  black: ['#191919', '#000'],
  gray: ['#EDEDED', '#B2B2B2', '#666'],
  white: '#FFF',
  green: '#00FF86',
  red: '#FF553B',
}

const theme = {
  breakpoints: ['480px', '768px', '992px', '1200px'],
  fontSizes,
  space,
  fonts: {
    regular: 'untitled-sans',
    medium: 'untitled-sans-medium',
  },
  colors,
  sizes: [1284],
  gridStyles: {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: 20,
  },
}

export default theme
