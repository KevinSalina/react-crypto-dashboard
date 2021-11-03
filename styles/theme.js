import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  mdlg: "55em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

const customTheme = extendTheme({
  colors: {
    brand: {
      primary: {
        50: '#e4f7f3',
        100: '#cce1dc',
        200: '#b1cbc4',
        300: '#95b5ad',
        400: '#79a096',
        500: '#5f867c',
        600: '#486860',
        700: '#324c45',
        800: '#1b2e28',
        900: '#00120d',
      },
      secondary: {
        50: '#e5f4ff',
        100: '#c4daef',
        200: '#a0c2df',
        300: '#7ca9d1',
        400: '#5891c2',
        500: '#3f77a9',
        600: '#2f5d84',
        700: '#20425f',
        800: '#0f283b',
        900: '#000e19',
      }
    }
  }
}, { breakpoints })

export default customTheme