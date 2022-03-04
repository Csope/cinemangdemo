import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import NormalDarkButton from '../../common/elements/buttons/NormalDarkButton';
import ContentLoader from '../../common/elements/ContentLoader';
import TriangleDivider from '../../common/elements/TriangleDivider';
import TriangleDividerNextItem from '../../common/elements/TriangleDividerNextItem';
import FiveColSwiper from '../../common/swiper/FiveColSwiper';
import { useGetTrainers } from '../../queries';
import { TrainerType } from '../../types';
import { HttpCodeTypes } from '../../types/ResType';
import { unescape } from 'lodash';
import { GetServerSideProps } from 'next';
import testTrainersData from '../../static/testTrainersData.json';

type PropTypes = {
	trainers: TrainerType[];
};

const Trainers: NextPage<PropTypes> = ({ trainers }: PropTypes) => {
	// const { data, error, isLoading } = useGetTrainers();
	const [selectedTrainer, setSelectedTrainer] = useState<
		TrainerType | undefined
	>(undefined);
	const isLoading = false;
	// useEffect(() => {
	// 	if (!selectedTrainer && data?.data.trainers) {
	// 		setSelectedTrainer(data?.data.trainers[2]);
	// 	}
	// }, [data]);

	return (
		<div className="Trainers_page page">
			<div className="container">
				<div>
					<h1 className="h1-shadow h1-shadow--purple text-center mb-8">
						Oktatók
					</h1>
				</div>
				{isLoading ? (
					<div className="flex items-center justify-center pt-20 pb-28">
						<ContentLoader />
					</div>
				) : (
					<FiveColSwiper
						initialSlide={2}
						onSlideChange={(swiper: any) => {
							if (trainers) {
								setSelectedTrainer(trainers[swiper.snapIndex]);
							}
						}}
						imgSrcs={
							trainers
								? trainers.map(
										(trainer) =>
											'https://geocdn.fotex.net/static.sugarfitness.hu/images/default_employee.jpg'
								  )
								: []
						}
					/>
				)}
			</div>

			<TriangleDivider bgClass="bg-site-3" mTop={-20} />

			<TriangleDividerNextItem>
				<div className="bg-site-2 mt-10">
					<h1 className="h1-shadow h1-shadow--white">
						{selectedTrainer?.last_name} {selectedTrainer?.first_name}
					</h1>
				</div>
			</TriangleDividerNextItem>
			{selectedTrainer && (
				<>
					<div className="bg-site-2 pb-16">
						<div className="container">
							<div className="text-center p-quote p-quote--white">
								{/* &quot; */}
								{unescape(selectedTrainer.motto)}
								{/* &quot; */}
							</div>
							<div className="text-center font-montserrat italic text-white py-10">
								{selectedTrainer.position}
							</div>
							<div className="flex gap-6 justify-center mb-14">
								<NormalDarkButton
									text="Összes óratípus"
									isLink={true}
									linkHref="/trainers"
								/>
								<NormalDarkButton
									text="Bodyart"
									isLink={true}
									linkHref="/trainers"
								/>
								<NormalDarkButton
									text="Deepwork"
									isLink={true}
									linkHref="/trainers"
								/>
							</div>

							<div className="text-white mb-10">
								<div
									dangerouslySetInnerHTML={{
										__html: unescape(selectedTrainer.description),
									}}
								></div>
							</div>

							<div className="flex gap-10">
								<div className="w-1/2">
									<iframe
										style={{ borderRadius: '14px' }}
										width="100%"
										height="350px"
										src={`https://www.youtube.com/embed/48w9kcBfrVA`}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										title="Embedded youtube"
									/>
								</div>
								<div className="w-1/2">
									<iframe
										style={{ borderRadius: '14px' }}
										width="100%"
										height="350px"
										src={`https://www.youtube.com/embed?v=KCrXgy8qtjM`}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
										title="Embedded youtube"
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	/**
	 * FIXME: TEST DATA DONT FORGET TO CHANGE BACK
	 */
	return {
		props: {
			trainers: testTrainersData.data.trainers,
		},
	};
};

export default Trainers;
