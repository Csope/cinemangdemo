import React from 'react';
import BrandImg from '../../../public/images/sugarmozi-logo.svg';

type PropTypes = {
	fillColor: string;
};

const BrandLogo = ({ fillColor }: PropTypes) => {
	
	return <img src={BrandImg.src} />;
};

export default BrandLogo;
