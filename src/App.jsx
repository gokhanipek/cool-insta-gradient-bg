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
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(messagesArr);
  let tiltRef = useRef();
  let divRef = useRef();

  // const onChangeHandler = (e) => {
  //   setInputValue(e.target.value);
  // };
  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   console.warn(e);
  //   const newMessages = [
  //     ...messages,
  //     {
  //       sender: 'right',
  //       text: inputValue,
  //     },
  //   ];
  //   setMessages(newMessages);
  //   setInputValue('');
  // };

  useEffect(()=> {
    window.addEventListener('deviceorientation', handleOrientation);
  }, [])

  function handleOrientation(event) {
    const { alpha, beta, gamma } = event;

    divRef.current = JSON.stringify(event);
    // const betaCorrected = beta - 90;
    // setAlpha(alpha);
    console.log(Math.sin(gamma), Math.sin(beta), Math.sin(alpha) );
      // setGamma(gamma);
    console.log(tiltRef.current)
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
  }

  return (
    <>
    <div ref={divRef}>divRef: {divRef.current}</div>
      <div className="messages-wrapper">
          <div ref={tiltRef} className="messages">
            {messages.map((item, index) => (
              <p key={index} className={`text ${item.sender === 'left' ? 'left' : 'right'}`}>
                <span className="text-p">{item.text}</span>
                <span className="whitespace" />
              </p>
            ))}
          </div>
          {/* <form onSubmit={formSubmit} id="form">
            <input
              value={inputValue}
              onChange={onChangeHandler}
              placeholder="Write away!"
            />
            <button type='submit' form='form'>Send!</button>
          </form>
          <button className='request-access'>Enabled Gyroscope</button> */}
        </div>
    </>

  );
}

export default App;
