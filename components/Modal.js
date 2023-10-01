import React from "react";
import PropTypes from "prop-types";
import Details from "./Details.js";

import ModalStyle from '../styles/modal.module.css';

const Modal = ({ isShowModalContent, closeModal, selectedCountry }) => {
	const outerStyle = isShowModalContent
		? `${ModalStyle.outer} ${ModalStyle.active}`
		: `${ModalStyle.outer}`;
	return (
		<div className={ outerStyle }>
			<div className={ ModalStyle.inner }>
				<button
					className={ ModalStyle.closeBtn }
					onClick={ () => closeModal(null) }
				>
					close
				</button>
				{
					isShowModalContent
						? <Details countryData = { selectedCountry }/>
						: null
				}
			</div>
		</div>
	)
}

Modal.propTypes = {
	isShowModalContent: PropTypes.bool,
	closeModal: PropTypes.func,
	selectedCountry: PropTypes.object,
}

export default Modal;