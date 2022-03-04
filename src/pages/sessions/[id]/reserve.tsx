import { useRouter } from 'next/router';
import React from 'react';

const Reserve = () => {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	// console.log(typeof id);
	// console.log(id);
	// if (id) {
	// 	// const idAsNumber = parseInt(id)
	// }

	// if()

	return <div>Reserve</div>;
};

export default Reserve;
