import dynamic from 'next/dynamic';

const MapWrap = () => {
	const Map = dynamic(
		() => import('./Cabinet.js'),
		{ ssr: false }
	)
	return <Map />
}

export default MapWrap;
