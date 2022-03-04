import React from 'react';

type PropTypes = {
	customClasses: string;
	fillColor: string;
};

const CardioTreadmillIcon = ({ customClasses, fillColor }: PropTypes) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			className={customClasses}
			fill={fillColor}
		>
			<g>
				<g>
					<path d="M30.89,9.55a1,1,0,0,0-1.34-.45l-4,2a1,1,0,0,0-.54.75L23.13,25H4a3,3,0,0,0,0,6H24a3,3,0,0,0,1.12-5.78l1.79-12.56,3.53-1.77A1,1,0,0,0,30.89,9.55ZM4.71,12.71,8.41,9h5.07l-2.4,5.61a1,1,0,0,0,.52,1.31L18,18.66V23a1,1,0,0,0,2,0V18a1,1,0,0,0-.61-.92l-6.08-2.61L15.67,9c.11,0,.21,0,.33,0a4,4,0,1,0-4-4,4,4,0,0,0,.56,2H8a1,1,0,0,0-.71.29l-4,4a1,1,0,0,0,1.41,1.41ZM16,3a2,2,0,1,1-2,2A2,2,0,0,1,16,3ZM11.05,17.68l-.72,2.16L6.2,19a1,1,0,0,0-.39,2l5,1,.2,0a1,1,0,0,0,.95-.68l1-3a1,1,0,0,0-1.9-.63ZM16,11a1,1,0,0,0,1,1h4a1,1,0,0,0,.71-.29l3-3a1,1,0,0,0-1.41-1.41L20.59,10H17A1,1,0,0,0,16,11Zm8,18H4a1,1,0,0,1,0-2H24a1,1,0,0,1,0,2Z" />
				</g>
			</g>
		</svg>
	);
};

export default CardioTreadmillIcon;
