import styled from "styled-components";
import { useState, useRef } from "react";

const PriceRangeSliderContainer = styled.div`
  width: 160px;
  height: 30px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderLine = styled.div`
  width: 100px;
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
  border-radius: 4px;

  background: ${props => props.theme.colors.white};

  position: absolute;
  top: 5px;

  cursor: grab;
`;

type PriceRangeSliderProps = {
  onChange: (low: number, high: number) => void;
};

export const PriceRangeSlider = ({
  onChange
}: PriceRangeSliderProps) => {
  const MIN_POS = 1;
  const MAX_POS = 101;
  const PUSHRIGHT = 20;

  const [lowPosStart, setLowPosStart] = useState(0);
  const [lowPosCur, setLowPosCur] = useState(MIN_POS);
  const [lowIsMoving, setLowIsMoving] = useState(false);

  const [highPosStart, setHighPosStart] = useState(0);
  const [highPosCur, setHighPosCur] = useState(MAX_POS);
  const [highIsMoving, setHighIsMoving] = useState(false);

  const lowRef = useRef<HTMLDivElement>(null);
  const highRef = useRef<HTMLDivElement>(null);

  const handleLowNodeStart = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!lowRef.current) return;

    lowRef.current.setPointerCapture(evt.pointerId);
    setLowIsMoving(true);
    setLowPosStart(evt.pageX);
  };

  const handleLowNodeMove = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!lowIsMoving) return;

    const pos = evt.pageX - lowPosStart;
    const cur = pos + lowPosCur;

    if (cur + 20 > highPosCur || cur + 1 < MIN_POS) return;

    setLowPosStart(evt.pageX);
    setLowPosCur(cur);
    onChange(Math.floor(cur), Math.floor(highPosCur));
  };

  const handleLowNodeLeave = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!lowRef.current) return;

    lowRef.current.releasePointerCapture(evt.pointerId);
    setLowIsMoving(false);
  }

  const handleHighNodeStart = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!highRef.current) return;

    highRef.current.setPointerCapture(evt.pointerId);
    setHighIsMoving(true);
    setHighPosStart(evt.pageX);
  };

  const handleHighNodeMove = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!highIsMoving) return;

    const pos = evt.pageX - highPosStart;
    const cur = pos + highPosCur;

    if (cur - 20 < lowPosCur || cur > MAX_POS) return;

    setHighPosStart(evt.pageX);
    setHighPosCur(cur);
    onChange(Math.floor(lowPosCur), Math.floor(cur));
  };

  const handleHighNodeLeave = (evt: React.PointerEvent<HTMLDivElement>) => {
    if (!highRef.current) return;

    highRef.current.releasePointerCapture(evt.pointerId);
    setHighIsMoving(false);
  }

  return (
    <PriceRangeSliderContainer draggable="false" touch-action="none">
      <SliderLine draggable="false" touch-action="none" />
      <SliderLineFilled
        style={{
          left: `${lowPosCur + 5 + PUSHRIGHT}px`,
          width: `${highPosCur + 10 - lowPosCur}px`,
        }}
        draggable="false" touch-action="none" 
      />
      <SliderNode
        ref={lowRef}
        style={{ left: `${(lowPosCur + PUSHRIGHT)}px` }}
        draggable="false"
        touch-action="none"
        onPointerDown={handleLowNodeStart}
        onPointerMove={handleLowNodeMove}
        onPointerUp={handleLowNodeLeave}
        onPointerCancel={handleLowNodeLeave}
      />
      <SliderNode
        ref={highRef}
        style={{ left: `${(highPosCur + PUSHRIGHT)}px` }}
        draggable="false"
        touch-action="none"
        onPointerDown={handleHighNodeStart}
        onPointerMove={handleHighNodeMove}
        onPointerUp={handleHighNodeLeave}
        onPointerCancel={handleHighNodeLeave}
      />
    </PriceRangeSliderContainer>
  );
};
