import { FC } from 'react';

const Container: FC<{
  animationDuration: number;
  isFinished: boolean;
  children: any;
  // eslint-disable-next-line react/function-component-definition
}> = ({ animationDuration, children, isFinished }) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

export default Container;
