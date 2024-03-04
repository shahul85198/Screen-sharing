import React, { useRef, useState } from 'react';

function Screen() {
  const videoRef = useRef(null);
  const startRef = useRef(null);
  const stopRef = useRef(null);
  const seekBarRef = useRef(null);
  const [showScreen, setShowScreen] = useState(false);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
  const [recording, setRecording] = useState(false); // Added recording state

  const startCapture = async () => {
    try {
      setShowScreen(true);

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      // Reset recordedVideoBlob when starting a new recording
      setRecordedVideoBlob(null);
      setRecording(true);

      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideoBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false); // Set recording state to false
      };

      recorder.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopCapture = () => {
    setShowScreen(false);

    if (recordedVideoBlob) {
      console.log('Recorded video: ', recordedVideoBlob);
    } else {
      console.log('No video recorded yet.');
    }
  };

  const handleSeekBarChange = () => {
    const seekBarValue = seekBarRef.current.value;
    const videoDuration = videoRef.current.duration;
    const seekToTime = (seekBarValue / 100) * videoDuration;
    videoRef.current.currentTime = seekToTime;
  };

  return (
    <div>
      {recordedVideoBlob && (
        <div style={{ width: '1000px', position: 'relative' }}>
          <video
            style={{ width: '1000px' }}
            ref={videoRef}
            autoPlay
            playsInline
            muted
            src={URL.createObjectURL(recordedVideoBlob)}
          />
          <input
            type="range"
            ref={seekBarRef}
            //min="0"
            //max="100"
            //step="0"
            onChange={handleSeekBarChange}
            style={{ width: '100%' }}
          />
        </div>
      )}
      {showScreen && !recordedVideoBlob && (
        <div
          style={{
            backgroundColor: 'grey',
            margin: 'auto',
            display: 'block',
          }}
        >
          <video ref={videoRef} autoPlay playsInline muted />
        </div>
      )}
      <div style={{ width: '80%', margin: 'auto' }}>
        {!showScreen && (
          <button
            onClick={startCapture}
            ref={startRef}
            className="button-start"
          >
            Start Screen Sharing
          </button>
        )}
        {showScreen && (
          <button
            onClick={stopCapture}
            ref={stopRef}
            className="button-stop"
            disabled={recording} // Disable button while recording
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

export default Screen;

/*
import React, { useRef, useState } from 'react';

function Screen() {
  const videoRef = useRef(null);
  const startRef = useRef(null);
  const stopRef = useRef(null);
  const [showScreen, setShowScreen] = useState(false);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
  const [recording, setRecording] = useState(false); 
  
  const startCapture = async () => {
    try {
      setShowScreen(true);

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

     
      setRecordedVideoBlob(null);
      setRecording(true);

      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideoBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false); 
      };

      recorder.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopCapture = () => {
    setShowScreen(false);

    if (recordedVideoBlob) {
      console.log('Recorded video: ', recordedVideoBlob);
    } else {
      console.log('No video recorded yet.');
    }
  };

  return (
    <div >
    <div >
      {recordedVideoBlob && (
        <div style={{ width: '1000px' }}>
          <video
            style={{ width: '1000px' }}
            ref={videoRef}
            autoPlay
            playsInline
            muted
            src={URL.createObjectURL(recordedVideoBlob)}
          />
        </div>
      )}
      {showScreen && !recordedVideoBlob && (
        <div
          style={{
            backgroundColor: 'grey',
            margin: 'auto',
            display: 'block',
          }}
        >
          <video ref={videoRef} autoPlay playsInline muted />
        </div>
      )}
      <div style={{ width: '80%', margin: 'auto' }}>
        {!showScreen && (
          <button
            onClick={startCapture}
            ref={startRef}
            className="button-start"
          >
            Start Screen Sharing
          </button>
        )}
        {showScreen && (
          <button
            onClick={stopCapture}
            ref={stopRef}
            className="button-stop"
            disabled={recording}
          >
            Stop
          </button>
        )}
      </div>
    </div>
  </div>
  );
}

export default Screen;

*/