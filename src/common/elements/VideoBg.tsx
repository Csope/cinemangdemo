import React from 'react';

export default () => (
	<div>
	  <video autoPlay muted loop style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '1200px', objectFit: 'cover',}}
	  src={require('../../../public/videos/video.mp4')}
	   />
	</div>
  )
