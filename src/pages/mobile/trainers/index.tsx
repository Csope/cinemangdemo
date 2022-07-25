import { motion } from 'framer-motion';
import { unescape } from 'lodash';
import { useState, useEffect } from 'react';
import LinkBtn from '../../../common/elements/buttons/LinkBtn';
import ContentLoader from '../../../common/elements/ContentLoader';
import TriangleDivider from '../../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../../common/elements/TriangleDividerNextItem';
import FiveColSwiper from '../../../common/swiper/FiveColSwiper';
import { useGetTrainers } from '../../../queries';
import { TrainerType } from '../../../types';
import DefaultEmployeeFemaleImg from '../../../../public/images/defaults/oktato_default-female.jpg';
import DefaultEmployeeMaleImg from '../../../../public/images/defaults/oktato_default-male.jpg';


const MobileTrainers = () => {
	const { data, isLoading } = useGetTrainers();
	const [selectedTrainer, setSelectedTrainer] = useState<
		TrainerType | undefined
	>(undefined);
	const trainers = data?.data.trainers || [];

	const findMakarIndex = trainers.findIndex(
		(trainer) => trainer.last_name.toLowerCase() === 'makár'
	);

	useEffect(() => {
		if (!selectedTrainer && data?.data.trainers) {
			setSelectedTrainer(data?.data.trainers[0]);
		}
	}, [data]);

	return (
		<div className="Trainers_page page">
			<div className="container">
				{isLoading ? (
					<div className="flex items-center justify-center pt-6 pb-10">
						<ContentLoader />
					</div>
				) : trainers.length > 0  ? (
					<>
						<div className="mb-6">
							<FiveColSwiper
								initialSlide={findMakarIndex}
								onSlideChange={(index: number) => {
									if (trainers && trainers[index]) {
										setSelectedTrainer(trainers[index]);
									}
								}}
								imgSrcs={trainers.map((trainer) =>
									trainer.preview_url
										? `${trainer.preview_url}`
										: trainer.gender === 'F'
										? DefaultEmployeeFemaleImg.src
										: DefaultEmployeeMaleImg.src
								)}
							/>
						</div>

						<TriangleDivider bgClass="bg-site-3" mTop={-20} />

						<TriangleDividerNextItem>
							<div className="bg-site-2 mt-10 hidden md:block">
								<motion.h1
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="h1-shadow h1-shadow--white"
									key={
										selectedTrainer?.last_name ||
										'' + selectedTrainer?.first_name
									}
								>
									{selectedTrainer?.last_name} {selectedTrainer?.first_name}
								</motion.h1>
							</div>
						</TriangleDividerNextItem>
					</>
				) : (
					<div className="px-4 text-center text-base h1-shadow h1-shadow--purple">
						Sajnos nincs találat!
					</div>
				)}
			</div>

			{selectedTrainer && (
				<div className="bg-site-2 pb-0 md:pb-16">
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						initial={{ opacity: 0.3, scale: 0.95 }}
						className="container px-4 md:px-0 pb-10"
						key={selectedTrainer.first_name + selectedTrainer.last_name}
					>
						<div>
							<h1
								className="h1-shadow text-center mb-4 h1-shadow--white md:hidden"
								key={
									selectedTrainer?.last_name || '' + selectedTrainer?.first_name
								}
							>
								{selectedTrainer?.last_name} {selectedTrainer?.first_name}
							</h1>
						</div>
						<div className="text-center pb-6 p-quote p-quote--white">
							{unescape(selectedTrainer.motto)}
						</div>
						<div className="flex gap-6 justify-center mb-10 md:mb-14 flex-wrap">
							<LinkBtn
								text="Összes óratípus"
								href={`/mobile/timetable?s=trainer&v=${selectedTrainer.last_name} ${selectedTrainer.first_name}`}
								customClasses="btn-dark w-full md:w-auto"
							/>

							{Object.keys(selectedTrainer.related_class_types).map((key) => (
								<LinkBtn
									// @ts-ignore
									key={selectedTrainer.related_class_types[key].title}
									// @ts-ignore
									text={selectedTrainer.related_class_types[key].title}
									// @ts-ignore
									href={`/mobile/timetable?s=type&v=${selectedTrainer.related_class_types[key].title}&v=${selectedTrainer.last_name} ${selectedTrainer.first_name}`}
									customClasses="btn-dark w-full md:w-auto"
								/>
							))}
						</div>
						<div className="text-white mb-10">
							<div
								dangerouslySetInnerHTML={{
									__html: unescape(selectedTrainer.description),
								}}
							></div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-wrap">
							{selectedTrainer?.others?.videos?.map((video) => (
								// @ts-ignore
								<div key={video.link} className="trainer-youtube">
									<iframe
										style={{ borderRadius: '14px' }}
										width="100%"
										height="100%"
										// @ts-ignore
										src={video.link}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										title="Embedded youtube"
									/>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

MobileTrainers.layout = 'mobile';

export default MobileTrainers;
