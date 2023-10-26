import { reduxFunctionCreator } from '../utils/reduxFunctionCreator';
import { recordPageSlice } from './../reducers/recordPage';
import { userPageSlice } from './../reducers/userPage';
import { projectPageSlice } from './../reducers/projectPage';
import { draftPageSlice } from './../reducers/draftPage';
import { trackPageSlice } from '../reducers/trackPage';

const recordPageActions = reduxFunctionCreator(recordPageSlice);
const userPageActions = reduxFunctionCreator(userPageSlice);
const projectPageActions = reduxFunctionCreator(projectPageSlice);
const draftPageActions = reduxFunctionCreator(draftPageSlice);
const trackPageActions = reduxFunctionCreator(trackPageSlice);

export { recordPageActions, userPageActions, projectPageActions, draftPageActions, trackPageActions };
