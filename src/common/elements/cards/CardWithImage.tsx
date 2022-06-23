import React, { useEffect, useRef, useState } from 'react';
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
	const ref = useRef<HTMLDivElement>(null);
	const [openDesc, setOpenDesc] = useState(false);

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
				<div className="CardWithImage__body overflow-hidden">
					<div
						className="overflow-hidden transition-all"
						style={{
							height: mobileApp
								? openDesc
									? ref.current?.clientHeight
									: 0
								: ref.current?.clientHeight,
						}}
					>
						<div style={{ padding: '18px 16px' }} ref={ref}>
							{bodyContent}
						</div>
					</div>
					<div
						onClick={() => setOpenDesc(!openDesc)}
						className={`text-xl flex justify-center ${
							mobileApp ? 'block' : 'hidden'
						} ${openDesc ? 'rotate-180' : ''}`}
					>
						<IoMdArrowDropdown />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardWithImage;
