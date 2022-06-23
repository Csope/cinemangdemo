import React, { useEffect, useState } from 'react';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';
import ClassDescription from '../../common/site/ClassDescription';
import { SessionType } from '../../types';
import { isEmpty } from 'lodash';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import FavoriteMark from '../../common/site/FavoriteMark';
import DefaultClass from '../../../public/images/defaults/oratipus_default.jpg';

type PropTypes = {
	sessions: SessionType[];
	swiperBg?: string;
};

function FilteredClassesSwiperView({
	sessions,
	swiperBg = 'bg-site-1',
}: PropTypes) {
	const [selectedSession, setSelectedSession] = useState<
		SessionType | undefined
	>(undefined);

	const swiperData = sessions.map((session) => ({
		src: session.class.preview_url
			? session.class.preview_url
			: DefaultClass.src,
		favoriteId: session.class.title,
		info: format(new Date(session.start), 'HH:mm'),
	}));

	return (
		<div className={`FilteredClassesSwiperView ${swiperBg}`}>
			{isEmpty(sessions) ? (
				<div className="bg-white divide-site-2 border-t border-b border-site-2 ">
					<div className="text-center py-20 text-xl h1-shadow h1-shadow--purple">
						Sajnos nincs találat!
					</div>
				</div>
			) : (
				<>
					<div className="container pt-6 mb-6 md:mb-0">
						<FiveColSwiper
							key={sessions.map((session) => session.id).join('')}
							onSlideChange={(index: number) => {
								if (sessions && sessions[index]) {
									setSelectedSession(sessions[index]);
								}
							}}
							initialSlide={0}
							imgSrcs={swiperData.map((data) => `${data.src}`)}
							hasFavorite={swiperData.map((data) => data.favoriteId)}
							hasInfo={swiperData.map((data) => data.info)}
						/>
					</div>

					<TriangleDivider bgClass="bg-site-3" mTop={-20} />
					<TriangleDividerNextItem>
						{!isEmpty(sessions) && (
							<motion.h1
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								// exit={{ x: 200, opacity: 0 }}
								className="h1-shadow h1-shadow--white mt-4 hidden md:flex"
								key={selectedSession?.class.id}
							>
								{selectedSession?.class.title}
								<FavoriteMark
									id={selectedSession?.class.title as string}
									customClasses="ml-4 text-3xl"
								/>
							</motion.h1>
						)}
					</TriangleDividerNextItem>

					{!isEmpty(sessions) && (
						<div className="bg-site-2 text-white pb-8">
							<motion.div
								animate={{ opacity: 1, scale: 1 }}
								initial={{ opacity: 0.3, scale: 0.95 }}
								className="container"
								key={selectedSession?.id}
							>
								<h1
									className="h1-shadow h1-shadow--white justify-center px-4 md:hidden flex flex-col items-center text-center"
									key={selectedSession?.class.id}
								>
									{selectedSession?.class.title}
									<FavoriteMark
										id={selectedSession?.class.title as string}
										customClasses="mt-3 text-3xl"
									/>
								</h1>
								<ClassDescription session={selectedSession} />
							</motion.div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default FilteredClassesSwiperView;
