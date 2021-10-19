import React, { useState, useEffect } from 'react';

type Props = {
  children: React.ReactElement;
  waitBeforeShow?: number;
};

const SecondMessage = ({ children, waitBeforeShow = 1200000 }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShown ? children : null;
};

export default SecondMessage;