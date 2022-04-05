import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { SessionType } from '../../types';
import { unescape } from 'lodash';
import { format } from 'date-fns';
import Btn from '../elements/buttons/Btn';
import DefaultEmployeeImg from '../../../public/images/defaults/default-employee.jpeg';
import { useSelectedSession, useSiteStates, useUser } from '../../hooks';
import { DifficultyTypes } from '../../types/ClassFilterTypes';
import DifficultyTwo from '../icons/difficulties/DifficultyTwo';
import DifficultyOne from '../icons/difficulties/DifficultyOne';
import DifficultyThree from '../icons/difficulties/DifficultyThree';

type PropTypes = {
	session: SessionType | undefined;
	hideParentPopup?: () => void;
};

function ClassDescription({ session, hideParentPopup }: PropTypes) {
	const { status } = useUser();
	const { doShowLogin } = useSiteStates();
	const { selectedSessionDispatch } = useSelectedSession();
	const trainerImage = session?.trainer.preview_url
		? session?.trainer.preview_url
		: DefaultEmployeeImg.src;

	const reservationClick = (e: MouseEvent, session: SessionType) => {
		e.stopPropagation();

		if (status === 'loading') return;

		if (hideParentPopup) hideParentPopup();

		if (status === 'unauthenticated') {
			doShowLogin();
			return;
		}

		selectedSessionDispatch({ type: 'SET_SELECTED', payload: session });
	};

	return (
		<div className="flex flex-col-reverse px-4 flex-wrap md:flex-row-reverse md:items-start lg:flex-row lg:flex-nowrap lg:gap-8">
			<div
				className="text-center lg:text-left mb-8 lg:basis-5/12 overflow-auto custom-scrollbar--light pr-5"
				style={{ maxHeight: 430 }}
			>
				<div
					dangerouslySetInnerHTML={{
						__html: unescape(session?.class.description),
					}}
				></div>
			</div>
			<div className="mb-8 flex flex-col-reverse md:mb-0 md:flex-col md:basis-3/12 lg:basis-2/12">
				<div className="bg-site-8 md:mb-8 rounded-xl p-4 text-center">
					<div className="mb-4">
						<img className="rounded-xl" src={trainerImage} />
					</div>
					<div className="leading-5 text-xl italic text-white">
						<div>{session?.trainer.last_name}</div>
						<div>{session?.trainer.first_name}</div>
					</div>
				</div>
				<div className="mb-8 md:mb-0 text-center">
					{session?.class?.difficulty === DifficultyTypes.NORMAL && (
						<>
							<div className="inline-block w-12">
								<DifficultyTwo fillColor="#466ed8" />
							</div>
							<div style={{ color: '#466ed8 ' }} className="text-xl uppercase">
								Normál
							</div>
						</>
					)}
					{session?.class?.difficulty === DifficultyTypes.BEGINNER && (
						<>
							<div className="inline-block w-12">
								<DifficultyOne fillColor="#0c860c" />
							</div>
							<div style={{ color: '#0c860c ' }} className="text-xl uppercase">
								KEZDŐ
							</div>
						</>
					)}
					{session?.class?.difficulty === DifficultyTypes.ADVENCED && (
						<>
							<div className="inline-block w-12">
								<DifficultyThree fillColor="#ef3f3f" />
							</div>
							<div style={{ color: '#ef3f3f ' }} className="text-xl uppercase">
								Haladó
							</div>
						</>
					)}
				</div>
			</div>
			<div className="bg-site-8 rounded-xl px-4 pt-7 pb-8 text-center mt-4 md:mr-8 mb-8 md:mb-0 md:mt-0 md:basis-8/12 lg:mr-0 lg:basis-5/12 ">
				<div className="mb-4">
					<div className="text-site-4 uppercase">Oktató</div>
					<div className="text-white text-xl">
						{session?.trainer.last_name} {session?.trainer.first_name}
					</div>
				</div>
				<div className="mb-4">
					<div className="text-site-4 uppercase">Dátum</div>
					<div className="text-white text-xl">
						{session?.date && format(new Date(session?.date), 'yyyy-MM-dd')}
					</div>
				</div>
				<div className="mb-4">
					<div className="text-site-4 uppercase">Időtartam</div>
					<div className="text-white text-xl">
						{session?.start && format(new Date(session?.start), 'HH:mm')} -{' '}
						{session?.end && format(new Date(session?.end), 'HH:mm')}
					</div>
				</div>
				<div className="mb-4">
					<div className="text-site-4 uppercase">Helyszín</div>
					<div className="text-white text-xl">{session?.location.title}</div>
				</div>
				<div className="mb-6">
					<div className="text-site-4 uppercase">Férőhelyek</div>
					<div className="text-white text-xl">
						{session?.current_headcount}/{session?.max_headcount}
					</div>
				</div>
				<div className="w-10/12 mx-auto">
					<Btn
						text="Foglalás"
						customClasses="w-full btn-dark"
						// @ts-ignore
						clickEvent={(e) => reservationClick(e, session)}
					/>
				</div>
			</div>
		</div>
	);
}

export default ClassDescription;
