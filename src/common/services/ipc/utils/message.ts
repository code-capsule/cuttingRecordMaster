import {
  IIpcMessageCtx,
  IRequestResponse,
  IHandleMessageParams,
  IIpcMessage,
} from '../typings'
import { CODE_REQUEST_SUCCESS } from '../constants'
import { getUuid } from './uuid'

export const generateMessageCtx = (
  params: IHandleMessageParams
): IIpcMessageCtx => {
  const { message, resolveHandle } = params
  const { headers } = message
  const ctx: IIpcMessageCtx = {
    ...message,
    request: {
      resolve: function (result: any) {
        const requestResponse: IRequestResponse = {
          headers,
          data: {
            code: CODE_REQUEST_SUCCESS,
            body: result,
          },
        }
        resolveHandle(requestResponse)
      },
    },
  }
  return ctx
}

export const generateIpcMessage = (
  channel: string,
  args?: any
): IIpcMessage => {
  return {
    channel,
    headers: {
      reqId: getUuid(),
    },
    data: {
      body: args,
    },
  }
}
