import { isFinite, isNumber, isString } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ResType, SessionType } from '../../../types';

type PropTypes = {
	session: SessionType;
};

const Reserve = ({ session }: PropTypes) => {
	console.log(session);

	return <div>Reserve</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		query: { id },
	} = context;

	// @ts-ignore
	if (!id || isNaN(id)) {
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
			props: {},
		};
	}

	try {
		const {
			data: {
				data: { session },
			},
		} = await axios.get<ResType<SessionType>>(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/sessions/${id}`
		);

		if (!session) {
			return {
				redirect: {
					permanent: false,
					destination: '/404',
				},
				props: {},
			};
		} else {
			return {
				props: {
					session,
				},
			};
		}
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
			props: {},
		};
	}
};

export default Reserve;
