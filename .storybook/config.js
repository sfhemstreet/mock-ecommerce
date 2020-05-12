import { configure, addDecorator, addParameters } from '@storybook/react';
import { withThemesProvider } from 'themeprovider-storybook';
import { AppTheme } from '../themes/AppTheme';


// add themes to all stories
const theme = [AppTheme];
addDecorator(withThemesProvider(theme));

// add backgrounds to stories
addParameters({
  backgrounds: [
    {
      name: 'black', value: AppTheme.colors.black, default: true
    },
    {
      name: 'white', value: AppTheme.colors.white
    },
    {
      name: 'rose', value: AppTheme.colors.rose
    },
    {
      name: 'yellow', value: AppTheme.colors.yellow
    },
    {
      name: 'green', value: AppTheme.colors.green
    },
    {
      name: 'brown', value: AppTheme.colors.brown
    },
    {
      name: 'black-white gradient', value: AppTheme.gradients.blackToWhite
    },
    {
      name: 'black-yellow gradient', value: AppTheme.gradients.blackToYellow
    },
  ],
});


// automatically import all files ending in *.stories.tsx
configure(require.context('../stories', true, /\.stories\.tsx?$/), module);

