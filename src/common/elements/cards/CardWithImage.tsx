import { IoMdArrowDropdown } from 'react-icons/io';

type PropTypes = {
	/**
	 * Source of the header image
	 */
	imgSrc: string;

	/**
	 * Body content
	 */
	bodyContent: JSX.Element;

	mobileApp?: boolean;
};

const CardWithImage = ({
	imgSrc,
	bodyContent,
	mobileApp = false,
}: PropTypes) => {
	return (
		<div className="CardWithImage rounded-xl md:rounded-none">
			<div>
				<div className="CardWithImage__header">
					<img
						src={imgSrc}
						alt="card-image"
						style={{ minHeight: 120, backgroundColor: '#e5e1d8' }}
					/>
				</div>
				<div className="CardWithImage__body overflow-hidden">
					<div style={{ padding: '18px 16px' }}>{bodyContent}</div>
				</div>
			</div>
		</div>
	);
};

export default CardWithImage;
