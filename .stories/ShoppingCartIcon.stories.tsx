import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ShoppingCartIcon } from "../components/ShoppingCartIcon";
import { Padded } from "../components/Padded";
import { Row } from "../components/Row";
import { useState } from "react";

storiesOf("ShoppingCartIcon", module).add("Empty Cart", () => {
  return (
    <Row>
      <Padded padding={"30px"}>
        <ShoppingCartIcon />
      </Padded>
    </Row>
  );
});

storiesOf("ShoppingCartIcon", module).add("2 items in cart", () => {
  return (
    <Row>
      <Padded padding={"30px"}>
        <ShoppingCartIcon numberOfItems={2} />
      </Padded>
    </Row>
  );
});

const Wrapper = () => {
  const [items, setItems] = useState(0);
  const add = () => setItems(items + 1); 
  const sub = () => setItems(items - 1);
  return (
    <Row>
      <Padded padding={"30px"}>
        <ShoppingCartIcon numberOfItems={items} />
      </Padded>
      <button onClick={add}>add</button>
      <button onClick={sub}>sub</button>
    </Row>
  )
} 

storiesOf("ShoppingCartIcon", module).add("Add Items", () => {
  return <Wrapper />
});
