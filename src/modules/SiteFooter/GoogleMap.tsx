import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface MapProps extends google.maps.MapOptions {
	style: { [key: string]: string };
	onClick?: (e: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
}

const GoogleMap = () => {
	const [markerPos, setMarkerPos] = useState(null);

	const render = (status: Status) => {
		console.log(status);

		if (status === Status.FAILURE) return <div>'ERROR'</div>;
		return <div>'LOADING'</div>;
	};

	return (
		<Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} render={render}>
			<Map style={{ flexGrow: '1', height: '100%' }}>
				<Marker icon="/images/mapbadge.png" />
			</Map>
		</Wrapper>
	);
};

const Map: React.FC<MapProps> = ({
	onClick,
	onIdle,
	children,
	style,
	...options
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	useEffect(() => {
		if (ref.current && !map) {
			const b = new google.maps.LatLng(47.5042638, 19.1382757);

			setMap(
				new window.google.maps.Map(ref.current, {
					zoom: 16,
					center: b,
				})
			);
		}
	}, [ref, map]);

	return (
		<>
			<div ref={ref} style={style}></div>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, { map });
				}
			})}
		</>
	);
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
	const [marker, setMarker] = React.useState<google.maps.Marker>();

	React.useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	React.useEffect(() => {
		if (marker) {
			marker.setOptions({
				...options,
				position: new google.maps.LatLng(47.5042638, 19.1382757),
			});
		}
	}, [marker, options]);

	return null;
};

export default GoogleMap;
