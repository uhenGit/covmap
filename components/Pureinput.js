const PureInput = (props) => {
	return ((props.inputType !== "textarea") ? (
		<label className="flex f-column">
			<p>{props.name}</p>
			<input type={props.inputType} name={props.inputName} placeholder={props.placeholder} onChange={props.inputFunc} value={props.val} />
		</label>
	):
	(
		<label className="flex f-column">
			<p>{props.name}</p>
			<textarea name={props.inputName} placeholder={props.placeholder} onChange={props.inputFunc} value={props.val}></textarea>
		</label>
	)
	);
}

export default PureInput;
