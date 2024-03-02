
import React, { useRef, useState } from 'react';

function Screen() {
  const videoRef = useRef(null);
  const startRef = useRef(null);
  const stopRef = useRef(null);
  const [showScreen, setShowScreen] = useState(false);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);

  const startCapture = async () => {
    try {
      setShowScreen(true);

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' }); 
        setRecordedVideoBlob(blob);
        stream.getTracks().forEach((track) => track.stop()); 
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
    <div>
      {recordedVideoBlob && (
        <div
          style={{ backgroundColor: 'grey', margin: 'auto', display: 'block' }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            src={URL.createObjectURL(recordedVideoBlob)}
          />
        </div>
      )}
      {showScreen &&
        !recordedVideoBlob && ( 
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
      <div style={{ width: '80%', margin: 'auto', paddingTop: 10 }}>
        {!showScreen && (
          <button
            onClick={startCapture}
            ref={startRef}
            className="btn btn-primary"
          >
            Start Screen Sharing
          </button>
        )}
        {showScreen && (
          <button
            onClick={stopCapture}
            ref={stopRef}
            className="btn btn-secondary"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

export default Screen;
