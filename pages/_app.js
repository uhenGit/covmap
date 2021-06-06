// import { ContextProvider } from '../store/context.js';
import '../styles/global.css';
export default function App({ Component, pageProps }) {
	return (<Component { ...pageProps } />)
}
