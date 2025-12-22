import React from "react";
import styled, { keyframes } from "styled-components";

type LoadingSpinnerProps = {
  message?: string;
  color?: string;
  barSize?: number;
  duration?: number;
  barCount?: number;
};

const blink = keyframes`
  0% { opacity: 0.1; transform: scaleY(0.5); }
  50% { opacity: 1; transform: scaleY(1.2); }
  100% { opacity: 0.1; transform: scaleY(0.5); }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DataStream = styled.div`
  display: flex;
  gap: 8px;
`;

const Bar = styled.div<{
  $color: string;
  $barSize: number;
  $duration: number;
  $delay: number;
}>`
  width: ${({ $barSize }) => $barSize}px;
  height: 60px;
  background: ${({ $color }) => $color};
  filter: ${({ $color }) => `drop-shadow(0 0 10px ${$color})`};
  animation: ${blink} ${({ $duration }) => $duration}s infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transform-origin: bottom;
  will-change: transform, opacity;
`;

const Text = styled.div<{ $color: string }>`
  margin-top: 20px;
  color: ${({ $color }) => $color};

  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 1.1rem;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  color = "#1DB954",
  barSize = 8,
  duration = 1.2,
  barCount = 8,
}) => {
  return (
    <Wrapper role="status" aria-live="polite">
      <DataStream aria-hidden="true">
        {Array.from({ length: barCount }).map((_, i) => (
          <Bar key={i} $color={color} $barSize={barSize} $duration={duration} $delay={i * 0.15} />
        ))}
      </DataStream>
      <Text $color={color}>{message}</Text>
    </Wrapper>
  );
};

export default LoadingSpinner;
