import React from "react";
import PropTypes from "prop-types";
import Head from 'next/head';

const Headblock = ({ title }) => {
	return (
		<Head>
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
			<link rel="manifest" href="/favicon/site.webmanifest"/>
			<link rel="shortcut icon" href="/favicon/favicon.ico"/>
			<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
				integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
				crossOrigin=""/>
			<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
				integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
				crossOrigin=""></script>
			<title>{ title }</title>
		</Head>
	)
}

Headblock.propTypes = {
	title: PropTypes.string,
}

export default Headblock;
