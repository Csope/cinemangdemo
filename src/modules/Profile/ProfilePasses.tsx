import { format } from 'date-fns';
import React, { useState } from 'react';
import ContentLoader from '../../common/elements/ContentLoader';
import { useUser } from '../../hooks';
import { useGetOwnedPasses } from '../../queries';
import { OwnedPassType } from '../../types';

const ProfilePasses = () => {
	const { user } = useUser();
	const { data, isFetching, refetch } = useGetOwnedPasses();
	const passes = data?.data.passes || [];

	return (
		<div className="bg-site-1 py-7 rounded-xl mb-8">
			<h1 className="text-xl md:text-2xl font-montserrat text-center text-site-4 italic font-black uppercase mb-5">
				Bérletek
			</h1>

			{isFetching ? (
				<div className="flex items-center justify-center pt-4 pb-10">
					<ContentLoader />
				</div>
			) : passes.length > 0 ? (
				<div className="w-full overflow-x-auto">
					<table className="w-full text-site-4 data-table">
						<thead className="bg-site-6 text-xs">
							<tr className=" hidden md:table-row">
								<th></th>
								<th className="py-2 uppercase pr-10 text-left  px-4 md:px-0">
									Megnevezés
								</th>
								<th className="py-2 uppercase">Alkalmak</th>
								<th className="py-2 uppercase">Érvényesség kezdete</th>
								<th className="py-2 uppercase">Érvényesség vége</th>
							</tr>
						</thead>
						<tbody className="flex flex-col md:table-row-group text-lg">
							{passes.map((pass, i) => (
								<tr key={pass.id} className="flex flex-col md:table-row">
									<td className="px-3 text-center pt-2 md:pt-0">
										<div className="rounded-full m-auto bg-site-6 w-7 h-7 flex items-center justify-center text-sm font-bold">
											{i + 1}
										</div>
									</td>
									<td className="py-2 text-center md:text-left md:py-6 md:pr-10 font-bold whitespace-nowrap px-4 md:px-0">
										{pass.type.title}
									</td>
									<td className="py-2 md:py-6 text-center">
										{pass.max_points - pass.used_points} / {pass.max_points}
									</td>
									<td className="py-2 md:py-6 text-center whitespace-nowrap px-4 md:px-0">
										{format(new Date(pass.start), 'yyyy.MM.dd - HH:mm')}
									</td>
									<td className="pb-4 md:pb-6 py-2 md:py-6 text-center whitespace-nowrap px-4 md:px-0">
										{format(new Date(pass.end), 'yyyy.MM.dd - HH:mm')}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="text-center">Jelenleg nincs aktív bérletem!</div>
			)}
		</div>
	);
};

export default ProfilePasses;
