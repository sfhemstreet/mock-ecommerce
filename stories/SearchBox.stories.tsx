import { storiesOf } from "@storybook/react";
import { useState } from "react";
import { SearchBox } from "../components/SearchBox/SearchBox";
import { Padded } from "../components/Padded";

const Wrapper = () => {
  const [txt, setText] = useState("");
  const [isActive, setActive] = useState(false);

  return (
    <Padded>
      <SearchBox
        isActive={isActive}
        onActiveClick={() => setActive(!isActive)}
      />
    </Padded>
  );
};

storiesOf("SearchBox", module).add("story", () => {
  return <Wrapper />;
});
