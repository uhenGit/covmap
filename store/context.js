import { createContext, useContext } from 'react';
import { toJS } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
// import { createTestContext } from './test.js';
import Post from './test.js';
const testContext = createContext(null);

export const ContextProvider = ({children}) => {
	// const store = createTestContext();
	const store = useLocalObservable(() => Post);
	// console.log('store: ', toJS(store));
	return <testContext.Provider value={store}>{children}</testContext.Provider>;
};

export const useContextProvider = () => {
	const store = useContext(testContext);
	// console.log('store: ', store);
	if (!store) {
		throw new Error('use context error');
	}
	return store
};
