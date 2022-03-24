import React, { useState } from 'react';
import ContentLoader from '../../common/elements/ContentLoader';
import { useUser } from '../../hooks';
import { useGetOwnedPasses } from '../../queries';
import { OwnedPassType } from '../../types';

const ProfilePasses = () => {
	const { user } = useUser();
	const { data, isFetching } = useGetOwnedPasses(user?.id as number);
	const passes = data?.data.passes || [];

	return (
		<div className="bg-site-1 pt-7 pb-7 rounded-xl mb-8">
			<h1 className="text-2xl text-center text-site-4 italic font-black uppercase mb-5">
				Bérletek
			</h1>

			{isFetching ? (
				<div className="flex items-center justify-center pt-4 pb-10">
					<ContentLoader />
				</div>
			) : passes.length > 0 ? (
				<div className="">
					<table className="w-full text-site-4 data-table">
						<thead className="bg-site-6 text-xs">
							<tr>
								<th></th>
								<th className="py-2 uppercase pr-10 text-left">Megnevezés</th>
								<th className="py-2 uppercase">Alkalmak</th>
								<th className="py-2 uppercase">Érvényesség kezdete</th>
								<th className="py-2 uppercase">Érvényesség vége</th>
							</tr>
						</thead>
						<tbody className=" text-lg">
							{passes.map((pass, i) => (
								<tr key={pass.id}>
									<td className="px-3 text-center">
										<div className="rounded-full m-auto bg-site-6 w-7 h-7 flex items-center justify-center text-sm font-bold">
											{i + 1}
										</div>
									</td>
									<td className="py-6 pr-10 font-bold">{pass.type.title}</td>
									<td className="py-6 text-center">
										{pass.used_points} / {pass.max_points}
									</td>
									<td className="py-6 text-center">{pass.start}</td>
									<td className="py-6 text-center">{pass.end}</td>
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
