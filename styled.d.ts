import 'styled-components';
import { MainTheme } from './themes/mainTheme';

type Theme = typeof MainTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}