import { RiQuestionnaireFill } from 'react-icons/ri';
import { ImNewspaper } from 'react-icons/im';
import { MdContactMail } from 'react-icons/md';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { FaMoneyBill } from 'react-icons/fa';

type PropTypes = {
	close: () => void;
};

const FloatingMenu = ({ close }: PropTypes) => {
	const router = useRouter();

	return (
		<div>
			<Link href="/mobile/prices">
				<a
					onClick={() => close()}
					className={`${
						router.pathname === '/mobile/prices'
							? 'text-site-9'
							: 'text-gray-900'
					} floating-item`}
				>
					<FaMoneyBill />
					<div className="text">Árak</div>
				</a>
			</Link>
			<Link href="/mobile/hazirend">
				<a
					onClick={() => close()}
					className={`${
						router.pathname === '/mobile/hazirend'
							? 'text-site-9'
							: 'text-gray-900'
					} floating-item`}
				>
					<ImNewspaper />
					<div className="text">Házirend</div>
				</a>
			</Link>
			<Link href="/mobile/gyik">
				<a
					onClick={() => close()}
					className={`${
						router.pathname === '/mobile/gyik' ? 'text-site-9' : 'text-gray-900'
					} floating-item`}
				>
					<RiQuestionnaireFill />
					<div className="text">GYIK</div>
				</a>
			</Link>
			<Link href="/mobile/contacts">
				<a
					onClick={() => close()}
					className={`${
						router.pathname === '/mobile/contacts'
							? 'text-site-9'
							: 'text-gray-900'
					} floating-item`}
				>
					<MdContactMail />
					<div className="text">Kapcsolat</div>
				</a>
			</Link>

			<div
				className="h-0.5 rounded mt-2 mb-6"
				style={{
					backgroundColor: '#424242',
					marginRight: -40,
					marginLeft: -40,
					width: 'calc(100% + 80px)',
				}}
			></div>

			<div className="flex flex-col gap-3 mb-3 text-gray-500 text-center">
				<a href="https://sugarmozi.hu/" target={'_blank'} rel="noreferrer">
					Sugár Mozi
				</a>
				<a
					href="https://www.sugarbowling.hu/"
					target={'_blank'}
					rel="noreferrer"
				>
					Sugár Bowling & Pub
				</a>
				<a
					href="https://www.sugarjatszohaz.hu/"
					target={'_blank'}
					rel="noreferrer"
				>
					Sugár Játszóház
				</a>
			</div>

			<div
				className="flex text-right gap-9 pt-4 pb-4 mb-3 text-2xl justify-center"
				style={{ color: '#893686' }}
			>
				<div>
					<a
						href="https://www.instagram.com/sugar_fitnessbp/"
						target={'_blank'}
						rel="noreferrer"
					>
						<FiInstagram />
					</a>
				</div>
				<div>
					<a
						href="https://www.facebook.com/sugarfitness/"
						target={'_blank'}
						rel="noreferrer"
					>
						<FiFacebook />
					</a>
				</div>
				<div>
					<a
						href="https://twitter.com/sugarfitnessbp"
						target={'_blank'}
						rel="noreferrer"
					>
						<FiTwitter />
					</a>
				</div>
			</div>

			<div className="w-full md:w-1/3 text-gray-300 te text-center text-xs">
				Fotexnet Kft. {new Date().getFullYear()} ©
			</div>
		</div>
	);
};

export default FloatingMenu;
