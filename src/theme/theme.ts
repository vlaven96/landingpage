import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      500: '#0088cc',
      600: '#0077b3',
      900: '#004466',
    },
    accent: {
      100: '#e6fff9',
      500: '#00ccaa',
    },
    darkBg: {
      900: '#1A202C', // Softer than pure black
      800: '#2D3748',
      700: '#4A5568'
    }
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'darkBg.900' : 'white',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
        transition: 'background-color 0.3s ease',
      }
    })
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '4px',
        fontWeight: '500',
      },
      variants: {
        solid: (props) => ({
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          }
        }),
        ghost: (props) => ({
          color: props.colorMode === 'dark' ? 'brand.100' : 'brand.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'brand.50',
          }
        }),
        outline: (props) => ({
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
          color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.50'
          }
        })
      }
    },
    Input: {
      variants: {
        filled: (props) => ({
          field: {
            borderRadius: '4px',
            bg: props.colorMode === 'dark' ? 'darkBg.800' : 'gray.50',
            _hover: {
              bg: props.colorMode === 'dark' ? 'darkBg.700' : 'gray.100',
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'darkBg.800' : 'white',
              borderColor: 'brand.500',
            }
          }
        })
      },
      defaultProps: {
        variant: 'filled',
      }
    },
    Textarea: {
      variants: {
        filled: (props) => ({
          borderRadius: '4px',
          bg: props.colorMode === 'dark' ? 'darkBg.800' : 'gray.50',
          _hover: {
            bg: props.colorMode === 'dark' ? 'darkBg.700' : 'gray.100',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'darkBg.800' : 'white',
            borderColor: 'brand.500',
          }
        })
      },
      defaultProps: {
        variant: 'filled',
      }
    },
    Card: {
      baseStyle: (props) => ({
        bg: props.colorMode === 'dark' ? 'darkBg.800' : 'white',
        boxShadow: 'sm'
      })
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl'
      }
    },
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      })
    },
    Box: {
      variants: {
        card: (props) => ({
          bg: props.colorMode === 'dark' ? 'darkBg.800' : 'white',
          borderRadius: 'lg',
          boxShadow: 'sm',
          p: 6
        }),
      }
    }
  }
});

export default theme; 