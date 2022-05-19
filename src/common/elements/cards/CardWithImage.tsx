import React, { useEffect, useRef, useState } from 'react';

type PropTypes = {
	/**
	 * Source of the header image
	 */
	imgSrc: string;

	/**
	 * Body content
	 */
	bodyContent: JSX.Element;
};

const CardWithImage = ({ imgSrc, bodyContent }: PropTypes) => {
	return (
		<div className="CardWithImage drop-shadow-md rounded-xl md:rounded-none">
			<div>
				<div className="CardWithImage__header">
					<img
						src={imgSrc}
						alt="card-image"
						style={{ minHeight: 120, backgroundColor: '#e5e1d8' }}
					/>
				</div>
				<div className="CardWithImage__body">{bodyContent}</div>
			</div>
		</div>
	);
};

export default CardWithImage;
