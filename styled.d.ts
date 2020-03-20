import 'styled-components';
import { AppTheme } from './themes/AppTheme';

type MyTheme = typeof AppTheme

declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {}
}