import React from 'react';
import { useGetFrontpageData } from '../../queries';

const VideoBg = () => {
	return (
		<div>
		<video autoPlay muted loop style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '1200px', objectFit: 'cover',}}
		src={require('../../../public/videos/video.mp4')}
		/>
		</div>
	);
}

export default VideoBg;
