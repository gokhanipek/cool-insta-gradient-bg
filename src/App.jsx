import { useRef, useState } from 'react';
import './App.css';

import styled from 'styled-components';

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
    text: 'Need to catchup with my gf, she wants to do that boring shopping shit...',
  },
  {
    sender: 'left',
    text: 'Thats a fucking sheisse news bruh',
  },
  {
    sender: 'right',
    text: 'after shopping maybe I can join you',
  },
  {
    sender: 'left',
    text: 'okay, sounds good',
  },
  {
    sender: 'right',
    text: 'alright, see you guyz ',
  },
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(messagesArr);
  let tiltRef = useRef();

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.warn(e);
    const newMessages = [
      ...messages,
      {
        sender: 'right',
        text: inputValue,
      },
    ];
    setMessages(newMessages);
    setInputValue('');
  };

  function handleOrientation(event) {
    const { alpha, beta, gamma } = event;
    // const betaCorrected = beta - 90;
    // setAlpha(alpha);
    if (gamma < 90 && gamma > -90) {
      // setGamma(gamma);
      tiltRef.current.style.backgroundPositionY = gamma + 'px';
    }

    if (alpha < 90 && alpha > -90) {
      // setAlpha(alpha);
      tiltRef.current.style.backgroundPositionX = alpha + 'px';
    }
  }

  async function requestDeviceOrientation() {
    console.log('clicked');
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
  }

  return (
    <div className="messages-wrapper">
      <div ref={tiltRef} className="messages">
        {messages.map((item) => (
          <p className={`text ${item.sender === 'left' ? 'left' : 'right'}`}>
            <span className="text-p">{item.text}</span>
            <span className="whitespace" />
          </p>
        ))}
      </div>
      {/* <form onSubmit={formSubmit}>
        <input
          value={inputValue}
          onChange={onChangeHandler}
          placeholder="Write away!"
        />
      </form> */}
      <button onClick={requestDeviceOrientation}>Enabled Gyroscope</button>
    </div>
  );
}

export default App;