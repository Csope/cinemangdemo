import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ResType, PassType } from '../../types';
import { chunk } from 'lodash';
import testPassTyesData from '../../static/testPassTypesData.json';
import Btn from '../../common/elements/buttons/Btn';

type PropTypes = {
	passTypes: PassType[];
};

const Prices = ({ passTypes }: PropTypes) => {
	const _passTypes = chunk(testPassTyesData, testPassTyesData.length / 2);

	return (
		<div className="Prices page">
			<div className="container pb-10">
				<div className="bg-white rounded-3xl px-10 pb-6 pt-10 drop-shadow-md mb-10">
					<h1 className="h1-shadow h1-shadow--purple mb-6">
						Csoportos bérletek
					</h1>

					<p className="mb-2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
						nulla ad facere autem voluptatem ullam. Aperiam molestias possimus
						odit nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						A, fuga.
					</p>

					<div className="divide-y divide-site-6">
						{_passTypes[0].map((pass) => (
							<div className="price-row py-6" key={pass.id}>
								<div className="title">{pass.title}</div>
								<div className="desc">Nem hosszabítható</div>
								<div className="price">
									<Btn
										text={(pass.price as unknown as string) + ' Ft'}
										appendBefore={<FaShoppingCart className="mr-4 text-lg" />}
										clickEvent={() => console.log('asdasd')}
										customClasses="btn-dark flex items-center ml-auto"
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white rounded-3xl px-10 pb-6 pt-10 drop-shadow-md mb-10">
					<h1 className="h1-shadow h1-shadow--purple mb-6">Fitness Bérletek</h1>
					<p className="mb-2">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
						nulla ad facere autem voluptatem ullam. Aperiam molestias possimus
						odit nobis.
					</p>
					<div className="divide-y divide-site-6">
						{_passTypes[1].map((pass) => (
							<div className="price-row py-6" key={pass.id}>
								<div className="title">{pass.title}</div>
								<div className="desc">Nem hosszabítható</div>
								<div className="price">
									<Btn
										text={(pass.price as unknown as string) + ' Ft'}
										appendBefore={<FaShoppingCart className="mr-4 text-lg" />}
										clickEvent={() => console.log('asdasd')}
										customClasses="btn-dark flex items-center ml-auto"
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="leading-8 text-justify">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. A nesciunt
					nemo ab? Quia, odio. Nemo, cum architecto consectetur optio id tenetur
					amet ducimus dicta veniam autem ullam qui nulla maxime, sequi
					molestiae, exercitationem cupiditate placeat non inventore
					consequuntur! Nesciunt alias iste tempora praesentium doloremque
					reiciendis dolor veniam quo blanditiis ipsum qui iusto asperiores
					placeat fugiat sunt rerum doloribus accusantium cumque ex non natus, a
					possimus? Repellat cumque voluptas iste, quia tempora dicta
					exercitationem pariatur deleniti blanditiis quidem beatae eum
					perferendis necessitatibus at dolor nihil nesciunt commodi facere
					itaque fugiat accusantium, incidunt ipsam corrupti illum? Ullam
					voluptates laboriosam, eos nisi corporis nihil quos in illum ratione,
					perspiciatis ea deserunt natus ipsum? Quam placeat atque porro quod
					nobis beatae non magnam accusantium maiores labore debitis aut, iste
					consequuntur nostrum, odio, blanditiis voluptatum deleniti provident
					in natus quis nemo. Libero est adipisci repudiandae itaque dolorum ab
					recusandae quas sunt hic! Sunt adipisci pariatur atque, nemo
					repellendus vel provident ipsa, quia ea neque non suscipit eveniet
					consequuntur sed necessitatibus quaerat, facere labore perferendis
					veniam fugiat nam! Quod dolor inventore veritatis, rem nam beatae
					atque, commodi illo obcaecati tenetur error pariatur mollitia ratione
					itaque provident! Ipsum quaerat dignissimos sit repellat iure dicta,
					in libero aut?
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	// try {
	// 	const {
	// 		data: {
	// 			data: { pass_types },
	// 		},
	// 	} = await axios.get<ResType<PassType[]>>(
	// 		`${process.env.NEXT_PUBLIC_API_ROUTE}/fitness/pass_types`
	// 	);
	// 	return {
	// 		props: {
	// 			passTypes: pass_types || [],
	// 		},
	// 	};
	// } catch (error) {
	// 	return {
	// 		props: {
	// 			passTypes: [],
	// 		},
	// 	};
	// }

	return {
		props: {
			passTypes: [],
		},
	};
};

export default Prices;
