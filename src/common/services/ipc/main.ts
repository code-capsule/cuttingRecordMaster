const { ipcMain, MessageChannelMain } = require('electron')
import BaseIpc from './base'
import {
  IMainIpc,
  IBaseIpcProps,
  EIpcNamespace,
  TProcessKey,
  TMessagePort,
  IIpcMessage,
  IRequestResponse,
  IRemovePortMsg,
  IRenderRegisterMsg,
  IRenderRegisterReturnValue,
} from './typings'
import {
  CHANNEL_RENDER_REGISTER,
  CHANNEL_RENDER_ADD_PORT,
  CHANNEL_MESSAGE,
  CHANNEL_REQUEST,
  CHANNEL_RENDER_REMOVE_PORT,
  CHANNEL_RENDER_PROVIDE_PORT,
  CHANNEL_CLOSE,
} from './constants'

class MainIpc extends BaseIpc implements IMainIpc {
  public namespace = EIpcNamespace.Main
  constructor(props: IBaseIpcProps) {
    super(props)
    this.init()
  }

  public init = () => {
    this._addIpcRenderRegisteredListener()
  }

  /**
   * 增加【注册渲染进程 ipc】的监听事件
   */
  private _addIpcRenderRegisteredListener = (): void => {
    ipcMain.on(
      CHANNEL_RENDER_REGISTER,
      (ipcMainEvent: Electron.IpcMainEvent, message: IRenderRegisterMsg) => {
        this.logger.info(CHANNEL_RENDER_REGISTER)
        const { port1, port2 } = new MessageChannelMain()
        const { processKey } = message
        const registerSuccess = this._registerProcessIpcPort(
          processKey,
          ipcMainEvent,
          port1
        )
        if (!registerSuccess) {
          return
        }
        this._mainProcessAddlistenerProcessMessage(processKey)
        this._allProcessAddlistenerProcessMessage(processKey, port2)
        this._addListenerPortClose(processKey)
      }
    )
  }

  private _registerProcessIpcPort = (
    processKey: TProcessKey,
    ipcMainEvent: Electron.IpcMainEvent,
    messagePort: TMessagePort
  ): boolean => {
    const webContents = ipcMainEvent.sender
    const hasValue = !!this.processMessagePortMap[processKey]
    if (hasValue) {
      const error = `register render ipc error, the process key: ${processKey} is already exists`
      this.logger.error(error)
      ipcMainEvent.returnValue = {
        success: false,
        message: error,
      } as IRenderRegisterReturnValue
      return false
    }
    this.processMessagePortMap[processKey] = {
      processKey,
      messagePort,
      webContents,
    }
    ipcMainEvent.returnValue = { success: true } as IRenderRegisterReturnValue
    return true
  }

  private _mainProcessAddlistenerProcessMessage = (
    processKey: TProcessKey
  ): void => {
    const renderMessagePort = this.processMessagePortMap[processKey].messagePort
    renderMessagePort?.start()
    // @ts-ignore
    renderMessagePort?.on(CHANNEL_MESSAGE, (event) => {
      const message: IIpcMessage = event.data
      this.logger.info('[receive]', message)
      const resolveHandle = (response: IRequestResponse): void => {
        renderMessagePort.postMessage({
          channel: CHANNEL_REQUEST,
          ...response,
        })
      }
      this.handleMessage({ message, resolveHandle })
    })
  }

  private _allProcessAddlistenerProcessMessage = (
    processKey: TProcessKey,
    mainPort: Electron.MessagePortMain
  ): void => {
    const newProcessWillProviedProcessKeys: TProcessKey[] = [this.processKey]
    const newProcessWillProvidePorts: Electron.MessagePortMain[] = [mainPort]
    for (const processMessagePort of Object.values(
      this.processMessagePortMap
    )) {
      const key = processMessagePort.processKey
      if (processKey !== key) {
        const { port1, port2 } = new MessageChannelMain()
        processMessagePort.webContents?.postMessage(
          CHANNEL_RENDER_ADD_PORT,
          { processKey },
          [port1]
        )
        newProcessWillProviedProcessKeys.push(key)
        newProcessWillProvidePorts.push(port2)
      }
    }
    this.processMessagePortMap[processKey].webContents?.postMessage(
      CHANNEL_RENDER_PROVIDE_PORT,
      {
        processKeys: newProcessWillProviedProcessKeys,
        processKey,
      },
      newProcessWillProvidePorts
    )
  }

  private _addListenerPortClose = (processKey: TProcessKey): void => {
    // @ts-ignore
    this.processMessagePortMap[processKey].messagePort.on(CHANNEL_CLOSE, () => {
      this.logger.info('port will be close', processKey)
      this._removeProcessMessagePort(processKey)
    })
  }

  private _removeProcessMessagePort = (processKey: TProcessKey): void => {
    delete this.processMessagePortMap[processKey]
    this.send(CHANNEL_RENDER_REMOVE_PORT, { processKey } as IRemovePortMsg)
  }
}

export { MainIpc }
