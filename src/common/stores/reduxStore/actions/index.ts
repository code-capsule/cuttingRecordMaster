import { reduxFunctionCreator } from '../utils/reduxFunctionCreator';
import { recordPageSlice } from './../reducers/recordPage';
import { userPageSlice } from './../reducers/userPage';

const recordPageActions = reduxFunctionCreator(recordPageSlice);
const userPageActions = reduxFunctionCreator(userPageSlice);

export { recordPageActions, userPageActions };
