import { reduxFunctionCreator } from '../utils/reduxFunctionCreator';
import { recordPageSlice } from './../reducers/recordPage';
import { userPageSlice } from './../reducers/userPage';
import { projectPageSlice } from './../reducers/projectPage';
import { draftPageSlice } from './../reducers/draftPage';

const recordPageActions = reduxFunctionCreator(recordPageSlice);
const userPageActions = reduxFunctionCreator(userPageSlice);
const projectPageActions = reduxFunctionCreator(projectPageSlice);
const draftPageActions = reduxFunctionCreator(draftPageSlice);

export { recordPageActions, userPageActions, projectPageActions, draftPageActions };
