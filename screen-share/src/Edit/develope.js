
import React, { useState } from 'react';
import Screen from '../screencode/screen';


export default function Develop() {
  const [showScreen, setShowScreen] = useState(false);

  const onStartCapture = () => {
    // Add any logic you want to execute when screen sharing starts
    console.log('Screen sharing started!');
  };

  return (
    <div className="id">
      <div className="key">
        <h1 className="content">Screen recording</h1>
       
        <h3>Create animated GIFs from a screen recording.</h3>

        <Screen />
      </div>
    </div>
  );
}



/*
import React,{ useRef, useEffect } from 'react'
import ScreenSharingButton from './Screenshare'


export default function Develop(){


       
        return(



                
                 <div class='id' >            
                       <div class ='key'>
                            <h1 class ='content'> 
                                Screen recording
                         </h1>
                    <img src= 'https://cdn.iconscout.com/icon/premium/png-256-thumb/screen-sharing-4-789936.png' alt='' />
                        
                         <h3> Create animated GIFs from a screen recording. </h3>

                        
                         
                       </div>
                       
                       

                </div>
                  
        )
}
*/