import React from 'react';
import BgImg from '../../public/images/404-bg.jpg';

const Custom500 = () => {
	return (
		<div
			style={{
				background: `url(${BgImg.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center bottom',
			}}
			className="flex items-center justify-center"
		>
			<div className="text-center font-bold text-white py-44">
				<h1 style={{ fontSize: 180, lineHeight: 0.8 }}>500</h1>
				<h2 className="uppercase text-xl">
					Belső kiszolgálóhiba, próbáld újra később!
				</h2>
			</div>
		</div>
	);
};

export default Custom500;
