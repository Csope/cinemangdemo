import React from 'react';

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
		<div className="CardWithImage">
			<div>
				<div className="CardWithImage__header">
					<img src={imgSrc} alt="card-image" />
				</div>
				<div className="CardWithImage__body">{bodyContent}</div>
			</div>
		</div>
	);
};

export default CardWithImage;
