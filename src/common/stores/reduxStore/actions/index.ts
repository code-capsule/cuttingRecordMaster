import { reduxFunctionCreator } from '../utils/reduxFunctionCreator';
import { recordPageSlice } from './../reducers/recordPage';

const recordPageActions = reduxFunctionCreator(recordPageSlice);

export { recordPageActions };
