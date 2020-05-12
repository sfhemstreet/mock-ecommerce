import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MenuIcon } from '../components/MenuIcon';
import { useState } from 'react';

storiesOf("MenuIcon", module).add('closed', () => {
  return <MenuIcon onClick={action("Clicked")} isOpen={false} />
});

storiesOf("MenuIcon", module).add('open', () => {
  return <MenuIcon onClick={action("Clicked")} isOpen={true} />
});

const Wrapper = () => {
  const [open, setOpen] = useState(false);
  return <MenuIcon onClick={() => {setOpen(!open); action('clicked');}} isOpen={open} />
}

storiesOf("MenuIcon", module).add('animated', () => {
  return <Wrapper />
})
