import { IIpcMessage, IRequestResponse } from './channel'

export interface IHandleMessageParams {
  message: IIpcMessage;
  resolveHandle: (requestResponse: IRequestResponse) => void;
}
