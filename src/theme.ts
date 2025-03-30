/**
 * 全局主題設置
 * 定義顏色、字體、組件樣式等
 */
const theme = {
  colors: {
    primary: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      200: '#80c9ff',
      300: '#4db3ff',
      400: '#1a9cff',
      500: '#0086e6',
      600: '#0069b3',
      700: '#004d80',
      800: '#00304d',
      900: '#00141f',
    },
    background: '#f7f8fa',
    text: {
      primary: '#333333',
      secondary: '#666666',
      hint: '#999999',
      disabled: '#cccccc',
      white: '#ffffff',
    },
  },
  fonts: {
    heading: `'PingFang TC', 'Noto Sans TC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", sans-serif`,
    body: `'PingFang TC', 'Noto Sans TC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
          _active: {
            bg: 'primary.700',
          },
        },
        outline: {
          border: '1px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
        ghost: {
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
        },
      },
    },
  },
};

// 全局樣式
export const kStyleGlobal = theme;

export default theme; 