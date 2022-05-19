import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import { ResType } from '../../types';
import { unescape } from 'lodash';

const HazirendIndex = ({ policy }: any) => {
	return (
		<div className="page">
			<div className="container">
				<div className="bg-white rounded-xl md:rounded-3xl mx-4 md:mx-0 px-4 md:px-10 pb-6 pt-10 drop-shadow-md mb-10">
					<h1 className="h1-shadow h1-shadow--purple mb-6 text-center md:text-left">
						Házirend
					</h1>

					<div dangerouslySetInnerHTML={{ __html: unescape(policy) }}></div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const {
			data: {
				// @ts-ignore
				data: { policy },
			},
		} = await axios.get<ResType<{ policy: any }>>(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/page_data/policy`
		);
		return {
			props: {
				policy: policy || '',
			},
		};
	} catch (error) {
		console.log(error);

		return {
			props: {
				policy: '',
			},
		};
	}
};
export default HazirendIndex;
