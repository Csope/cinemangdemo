import React from "react";
import SimpleButton from '../common/elements/buttons/SimpleButton';

interface PropTypes {
	array: number[];
}


function MovieList({
	array,
}: PropTypes) {
	const Cinema = 'norman.jpeg';

	return (
		<div className="container border-t border-b border-site-27">
			<table className="table-fixed border-hidden border-collapse w-full tracking-widest">
				<tbody>
					{array.map((key) => (<tr key={key}>
						<td className='border border-site-27 p-2'>
							<div className='flex gap-2 align-middle'>
								<img style={{ height: '110px', borderRadius: '8px' }} src={Cinema} alt="cinema" />
								<div className='flex gap-2 flex-col justify-center'>
									<div>
										<p className='text-2xl font-bold'>Az Arthur-átok</p>
									</div>
									<p className='font-light'>szinkronizált, francia horror, 18</p>
									<div className='flex gap-2'>
										<SimpleButton text={'premier'} customClasses="bg-site-25 text-white text-xs px-6" />
										<SimpleButton text={'price'} customClasses="bg-site-26 text-white text-xs px-3" />
									</div>
								</div>
							</div>
						</td>
						<td className='border border-site-27 p-2 w-7/12'>
							<div className='flex justify-around'>
								{array.map((key) => (<SimpleButton key={key} customClasses='bg-site-27 text-white text-lg px-7 py-2' text={'12:30'} />))}
							</div>
						</td>
					</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default MovieList;