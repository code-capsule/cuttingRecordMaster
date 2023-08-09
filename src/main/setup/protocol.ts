import path from 'path';
import { protocol } from 'electron';

export const MASTER_PROTOCOL = 'master';

/**
 * @description
 * 1.以 file 协议打开缩略图图片时，会出现 Not Allowed to load local resource 错误
 * 2.通过 protocol 模块来注册自定义协议并拦截现有协议请求
 * 3.当匹配到自定义的协议时，会拦截此协议请求，并返回一个本地路径
 */
function proxyFileProtocol2Master() {
  // 注册协议 MASTER_PROTOCOL://
  protocol.registerFileProtocol(MASTER_PROTOCOL, (request, callback) => {
    const url = request.url.substr(9);
    // 防止url 解析不正常 使用 decodeURI
    callback(decodeURI(path.normalize(url)));
  });
}

export default proxyFileProtocol2Master;
