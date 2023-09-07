import React from "react";
import dynamic from 'next/dynamic';

const MapWrap = () => {
	const Map = dynamic(
		() => import('./Covmap.js'),
		{ ssr: false }
	)
	return <Map />
}

export default MapWrap;
