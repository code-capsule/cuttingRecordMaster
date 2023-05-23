import { RenderIpc } from '@common/services/ipc'
import master from './index'

/**
 * 给渲染进程的全局变量中注册 ipc
 */
export function attachIpc(processKey: string) {
  const renderIpc = new RenderIpc({ processKey })
  console.log('init render ipc...', renderIpc)
  master.service.ipc = renderIpc
}
