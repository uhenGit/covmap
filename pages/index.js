import Headblock from '../components/Headblock.js';
import Header from '../components/Header.js';
import Description from '../components/Description.js';
import Footer from '../components/Footer.js';

const IndexPage = () => {
	return (
		<div>
			<Headblock title={ 'Covid tracker' } />
			<Header />
			<Description />
			<Footer />
		</div>
)};

export default IndexPage;
