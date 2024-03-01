import React, { useRef, useEffect } from 'react';

function Screen() {
  const videoRef = useRef(null);
  const startRef = useRef(null);
  const stopRef = useRef(null);  

  const startCapture = () => {
    navigator.mediaDevices.getDisplayMedia()
      .then((strm) => {
        let displaySurface = strm.getVideoTracks()[0].getSettings().displaySurface;
  
        if (displaySurface !== 'monitor') {
          throw 'Selection of entire screen is mandatory';
        }
  
        videoRef.current.srcObject = strm;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  const stopCapture = () => {
    const tracks = videoRef.current.srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
  };

  useEffect(() => {
    startRef.current.addEventListener('click', startCapture);
    stopRef.current.addEventListener('click', stopCapture);

    return () => {
      startRef.current.removeEventListener('click', startCapture);
      stopRef.current.removeEventListener('click', stopCapture);
      stopCapture();
    };
  }, []);

  return (
    <div>
      <div style={{ width: '80%', background: 'grey', margin: 'auto' }}>
        <video ref={videoRef} autoPlay playsInline muted />
      </div>
      <div style={{ width: '80%', margin: 'auto', paddingTop: 10 }}>
        <button ref={startRef} className="btn btn-primary">
          Start Screen Sharing
        </button>
        <button ref={stopRef} className="btn btn-secondary">
          Stop
        </button>
      </div>
    </div>
  );
}

export default Screen;
