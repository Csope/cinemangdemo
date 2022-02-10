import React from 'react';
import SimpleButton from '../../common/elements/buttons/SimpleButton';

interface PropTypes {
	show: boolean;
}

function ExpandedFilter({ show }: PropTypes) {
	return (
		<div
			className={`bg-site-7 ExpandedFilter ${
				show ? 'ExpandedFilter--show' : ''
			}`}
		>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4 ">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28">
						Nehézség
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						<SimpleButton customClasses="bg-site-2 text-white" text="Kezdő" />
						<SimpleButton customClasses="bg-white text-black" text="Normál" />
						<SimpleButton customClasses="bg-white text-black" text="Haladó" />
					</div>
				</div>
			</div>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28">
						Terem
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						<SimpleButton
							customClasses="bg-white text-black "
							text="Club Royal"
						/>
						<SimpleButton customClasses="bg-white text-black" text="Aerobik" />
						<SimpleButton
							customClasses="bg-white text-black"
							text="Performance"
						/>
						<SimpleButton customClasses="bg-site-2 text-white" text="balance" />
						<SimpleButton customClasses="bg-white text-black" text="Move" />
						<SimpleButton customClasses="bg-white text-black" text="Spinning" />
						<SimpleButton customClasses="bg-white text-black" text="Impulse" />
					</div>
				</div>
			</div>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4 ">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28">
						Óratípus
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						<SimpleButton
							customClasses="bg-white text-black "
							text="Alakformáló"
						/>
						<SimpleButton customClasses="bg-white text-black" text="Aerobik" />
						<SimpleButton
							customClasses="bg-white text-black"
							text="Alakformáló body control"
						/>
						<SimpleButton
							customClasses="bg-site-2 text-white"
							text="Alakformáló starter"
						/>
						<SimpleButton customClasses="bg-white text-black" text="Bodyart" />
						<SimpleButton
							customClasses="bg-white text-black"
							text="Box body control"
						/>
						<SimpleButton
							customClasses="bg-white text-black"
							text="Box body control alapok"
						/>
						<SimpleButton
							customClasses="bg-white text-black"
							text="Callanetics"
						/>
					</div>
				</div>
			</div>
			<div className="border-t-2 border-site-6">
				<div className="container flex flex-col justify-center items-center md:flex-row md:justify-start text-center md:text-left pt-3 pb-4 px-4 ">
					<div className="uppercase text-sm text-site-4 mb-2 md:mb-0 w-28">
						Oktató
					</div>
					<div className="flex justify-center md:justify-start md:flex-1 flex-wrap gap-2">
						<SimpleButton
							customClasses="bg-white text-black "
							text="Adamncsek Edit"
						/>
						<SimpleButton customClasses="bg-white text-black" text="Aerobik" />
						<SimpleButton
							customClasses="bg-white text-black"
							text="Angyal Andris"
						/>
						<SimpleButton
							customClasses="bg-site-2 text-white"
							text="Heimer Viktroria"
						/>
						<SimpleButton customClasses="bg-white text-black" text="Bodyart" />
						<SimpleButton
							customClasses="bg-white text-black"
							text="Kis Pista"
						/>
						<SimpleButton
							customClasses="bg-white text-black"
							text="Nagy Róbert"
						/>
						<SimpleButton customClasses="bg-white text-black" text="John Doe" />
						<SimpleButton
							customClasses="bg-white text-black"
							text="Kovács Ede"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExpandedFilter;
