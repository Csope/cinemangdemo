import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { SessionType } from '../../types';
import NormalDarkButton from '../elements/buttons/NormalDarkButton';
// @ts-ignore
import { unescape } from 'lodash';
import { format } from 'date-fns';

type PropTypes = {
	session: SessionType | undefined;
};

function ClassDescription({ session }: PropTypes) {
	return (
		<div className="flex flex-col-reverse px-4 flex-wrap md:flex-row-reverse md:items-start lg:flex-row lg:flex-nowrap lg:gap-8">
			<div className="text-center lg:text-left mb-8 lg:basis-5/12 ">
				<div
					dangerouslySetInnerHTML={{
						__html: unescape(session?.class.description),
					}}
				></div>
			</div>
			<div className="mb-8 flex flex-col-reverse md:mb-0 md:flex-col md:basis-3/12 lg:basis-2/12">
				<div className="bg-site-8 md:mb-8 rounded-xl p-4 text-center">
					<div className="mb-4">
						<img
							className="rounded-xl"
							src="https://sugarfitness.hu/files/1264/preview.jpg"
						/>
					</div>
					<div className="leading-5 text-xl italic text-white">
						<div>{session?.trainer.last_name}</div>
						<div>{session?.trainer.first_name}</div>
					</div>
				</div>
				<div className="mb-8 md:mb-0 text-center">
					<div className="inline-block bg-rose-500 rounded-full px">
						<FiAlertCircle className="mx-auto w-14 h-14" />
					</div>
					<div className="text-site-4 text- text-xl uppercase">Haladó</div>
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
					<NormalDarkButton
						text="Foglalás"
						customClasses="w-full"
						isLink={false}
					/>
				</div>
			</div>
		</div>
	);
}

export default ClassDescription;
