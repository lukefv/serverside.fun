import { useNProgress } from '@tanem/react-nprogress';
import { FC } from 'react';
import Bar from './Bar';
import Container from './Container';

// eslint-disable-next-line react/function-component-definition
const Progress: FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};

export default Progress;
