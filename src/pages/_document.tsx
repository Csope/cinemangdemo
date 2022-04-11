import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="font-roboto">
				<Main />
				<NextScript />

				{/* <script
					type="text/javascript"
					src="//maps.googleapis.com/maps/api/js?key=AIzaSyBRWYQbcLQ6_k1BZBZLoMJe2GcIOOgj3GE"
				></script>

				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: ` console.log('asdasd'); setTimeout(()=> { var b = new google.maps.LatLng(47.5042638,19.1382757);
    var marker;
    var map;

    function initialize() {
      var mapOptions = {
        zoom: 16,
        center: b,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
      marker = new google.maps.Marker({
        map: map,
        position: b,
        icon: '/images/mapbadge.png'
      });
      google.maps.event.addListener(marker, 'click', toggleBounce);
    }

    function toggleBounce() {

      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    google.maps.event.addDomListener(window, 'load', initialize); }, 5000);`,
					}}
				></script> */}
			</body>
		</Html>
	);
}
