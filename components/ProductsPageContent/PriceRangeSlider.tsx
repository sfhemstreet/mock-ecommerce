import styled from "styled-components";
import { useState } from "react";

const PriceRangeSliderContainer = styled.div`
  width: 160px;
  height: 30px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderLine = styled.div`
  width: 130px;
  height: 3px;

  background: ${props => props.theme.colors.transparentWhite};
`;

const SliderLineFilled = styled.div`
  height: 3px;

  position: absolute;
  top: 14px;
  background-color: ${props => props.theme.colors.white};
`;

const SliderNode = styled.div`
  width: 20px;
  height: 20px;

  background: ${props => props.theme.colors.transparentWhite};

  position: absolute;
  top: 5px;

  cursor: grab;
`;

type PriceRangeSliderProps = {
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
};

export const PriceRangeSlider = ({
  low,
  high,
  onChange
}: PriceRangeSliderProps) => {
  const MIN_POS = 0;
  const MAX_POS = 130;

  const [lowPosStart, setLowPosStart] = useState(0);
  const [lowPosCur, setLowPosCur] = useState(MIN_POS);
  const [lowIsMoving, setLowIsMoving] = useState(false);

  const [highPosStart, setHighPosStart] = useState(0);
  const [highPosCur, setHighPosCur] = useState(MAX_POS);
  const [highIsMoving, setHighIsMoving] = useState(false);

  const handleLowNodeStart = (evt: React.PointerEvent<HTMLDivElement>) => {
    setLowIsMoving(true);
    setLowPosStart(evt.pageX);
  };

  const handleLowNodeMove = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!lowIsMoving) {
      return;
    }

    const pos = evt.pageX - lowPosStart;
    setLowPosStart(evt.pageX);

    const cur = pos + lowPosCur;
    if (cur < highPosCur)
      setLowPosCur(cur);
  };

  const handleHighNodeStart = (evt: React.PointerEvent<HTMLDivElement>) => {
    setHighIsMoving(true);
    setHighPosStart(evt.pageX);
  };

  const handleHighNodeMove = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!highIsMoving) {
      return;
    }

    const pos = evt.pageX - highPosStart;
    setHighPosStart(evt.pageX);

    const cur = pos + highPosCur;
    if (cur > lowPosCur)
      setHighPosCur(cur);
  };

  return (
    <PriceRangeSliderContainer draggable="false" touch-action="none">
      <SliderLine draggable="false" touch-action="none" />
      <SliderLineFilled
        style={{
          left: `${lowPosCur + 5}`,
          width: `${highPosCur + 10 - lowPosCur}`
        }}
        draggable="false"
        touch-action="none"
      />
      <SliderNode
        style={{ left: `${lowPosCur}px` }}
        draggable="false"
        touch-action="none"
        onPointerDown={handleLowNodeStart}
        onPointerMove={handleLowNodeMove}
        onPointerUp={() => setLowIsMoving(false)}
        onPointerCancel={() => setLowIsMoving(false)}
      />
      <SliderNode
        style={{ left: `${highPosCur}px` }}
        draggable="false"
        touch-action="none"
        onPointerDown={handleHighNodeStart}
        onPointerMove={handleHighNodeMove}
        onPointerUp={() => setHighIsMoving(false)}
        onPointerCancel={() => setHighIsMoving(false)}
      />
    </PriceRangeSliderContainer>
  );
};
