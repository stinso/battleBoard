import Countdown, { zeroPad } from 'react-countdown';
import { Typography } from '@material-ui/core';

const CountDown = ({ timeObject, getEventDetails, setTimeObject }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setTimeObject({ showTimer: false });
      getEventDetails();
      return null;
    } else {
      return (
        <Typography color="textPrimary" variant="h2">
          {zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
        </Typography>
      );
    }
  };

  return (
    <Countdown
      date={timeObject.time}
      key={timeObject.time}
      renderer={renderer}
    />
  );
};

export default CountDown;
