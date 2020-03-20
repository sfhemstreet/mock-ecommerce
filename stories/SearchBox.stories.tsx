import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { Padded } from "../components/Padded";

const Wrapper = () => {
  const [txt, setText] = useState("");
  const [isActive, setActive] = useState(false);

  return (
    <Padded>
      <SearchBox
        text={txt}
        onTextChange={e => setText(e.target.value)}
        isActive={isActive}
        onActiveClick={() => setActive(!isActive)}
      />
    </Padded>
  );
};

storiesOf("SearchBox", module).add("story", () => {
  return <Wrapper />;
});
