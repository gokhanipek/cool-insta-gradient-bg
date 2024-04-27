import { useEffect, useRef, useState } from 'react';
import './App.css';

const messagesArr = [
  {
    sender: 'left',
    text: 'hi!',
  },
  {
    sender: 'right',
    text: 'sup?',
  },
  {
    sender: 'left',
    text: 'good, man! whatcha doing tonight? wanna come with us to the game? ',
  },
  {
    sender: 'right',
    text: 'Sorry',
  },
  {
    sender: 'right',
    text: 'Need to go do the shopping today, there is nothing to eat at the fridge...',
  },
  {
    sender: 'left',
    text: 'Okay, no problem',
  },
  {
    sender: 'left',
    text: 'maybe after that you can ping us and you can join later?',
  },
  {
    sender: 'right',
    text: 'okay, sounds good',
  },
  {
    sender: 'right',
    text: 'alright, see you guyz ',
  },
  {
    sender: 'left',
    text: 'cool, see you then!',
  },
];

function App() {
  let tiltRef = useRef();
  const [togglePopup, setTogglePopup] = useState(false);

  useEffect(() => {
    setTogglePopup(true);
  }, []);

  function handleOrientation(event) {
    const { alpha, beta } = event;

    tiltRef.current.style.backgroundPositionY = beta + '%';
    tiltRef.current.style.backgroundPositionX = alpha + '%';
  }

  async function requestDeviceOrientation() {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const permissionState =
          await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          console.error('Access is not granted');
        }
      } catch (error) {
        console.error(error);
      }
    } else if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      console.error('Device does not support gyroscope');
    }
    setTogglePopup(false);
  }

  return (
    <>
      <div className="messages-wrapper">
        <div ref={tiltRef} className="messages">
          {messagesArr.map((item, index) => (
            <p
              key={index}
              className={`text ${item.sender === 'left' ? 'left' : 'right'}`}
            >
              <span className="text-p">{item.text}</span>
              <span className="whitespace" />
            </p>
          ))}
        </div>
      </div>
      {togglePopup && (
        <div className="popup-overlay">
          <div className="popup">
            To use the sensors of this device, you need to grant access.
            <button onClick={requestDeviceOrientation}>Enable Sensors</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
