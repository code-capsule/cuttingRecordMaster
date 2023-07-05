import { reduxFunctionCreator } from '../utils/reduxFunctionCreator';
import { recordPageSlice } from './../reducers/recordPage';
import { userPageSlice } from './../reducers/userPage';
import { projectPageSlice } from './../reducers/projectPage';

const recordPageActions = reduxFunctionCreator(recordPageSlice);
const userPageActions = reduxFunctionCreator(userPageSlice);
const projectPageActions = reduxFunctionCreator(projectPageSlice);

export { recordPageActions, userPageActions, projectPageActions };
