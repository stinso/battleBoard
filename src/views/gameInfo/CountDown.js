import Countdown, { zeroPad, } from "react-countdown";


const CountDown = ({
  timeObject,
  getEventDetails,
  setTimeObject,
}) => {
    
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setTimeObject({ showTimer: false, });
      getEventDetails();
      return null;
    } else {
      return (
        <p>
        {zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
        </p>
      )
    }
  };

  return (
    <Countdown
      date={timeObject.time}
      key={timeObject.time}
      renderer={renderer}
    />
  )
}

export default CountDown;