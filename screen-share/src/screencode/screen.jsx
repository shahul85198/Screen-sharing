import React, { useRef, useEffect, useState } from 'react';

  function Screen() {
  const videoRef = useRef(null);
   const startRef = useRef(null);
  const stopRef = useRef(null);  
  const [showScreen, setShowScreen] = useState(false);

  const startCapture = () => {
    setShowScreen(true)
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
    setShowScreen(false)
    const tracks = videoRef.current.srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
  };

  // useEffect(() => {
  //   startRef.current.addEventListener('click', startCapture);
  //   stopRef.current.addEventListener('click', stopCapture);

  //   return () => {
  //     startRef.current.removeEventListener('click', startCapture);
  //     stopRef.current.removeEventListener('click', stopCapture);
  //     stopCapture();
  //   };
  // }, []);


  return (
    <div>
      {<div style={{ backgroundcolor: 'gery', margin: 'auto', display: showScreen ? 'block' : 'none' }}>
        <video style={{width:'1000px'}} ref={videoRef} autoPlay playsInline muted />
      </div> }
      <div >
      {!showScreen && <button className='button-start' onClick={startCapture} ref={startRef} >
          Start Screen Sharing
        </button>} 
        {showScreen && <button className='button-stop' onClick={stopCapture} ref={stopRef} >
          Stop
        </button>}
      </div>
    </div>
  );
}

export default Screen;
