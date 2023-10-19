/**
 * @description 本地文件工具服务
 */
import fs from 'fs';
const fsPromiseAPIs = fs.promises;

class FileTool {
  /**
   * @description 是否能读取此文件
   * @param path 文件路径
   */
  public canReadFile(path: string): Promise<void> {
    return fsPromiseAPIs.access(path, fs.constants.R_OK);
  }
  /**
   * @description 读取文件内容
   * @param path 路径
   * @returns {Promise}
   */
  public read(path: string, encoding?: BufferEncoding): Promise<string> {
    return fsPromiseAPIs.readFile(path, { encoding: encoding || 'utf8' });
  }
  /**
   * @description 是否可写入此文件
   * @param path 路径
   * @returns {Promise}
   */
  public canWrite(path: string): Promise<void> {
    return fsPromiseAPIs.access(path, fs.constants.W_OK);
  }
  /**
   * @description 写入文件内容
   * @param path 路径
   * @returns {Promise}
   */
  public write(
    path: string,
    content: string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView>,
    encoding?: BufferEncoding
  ): Promise<void> {
    const updateContent = typeof content === 'string' ? content : JSON.stringify(content);
    return fsPromiseAPIs.writeFile(path, updateContent, { encoding: encoding || 'utf8' });
  }
  /**
   * @description 是否存在文件
   * @param path 路径
   * @returns {Promise}
   */
  public hasFile(path: string): Promise<void> {
    return fsPromiseAPIs.access(path, fs.constants.F_OK);
  }
  /**
   * @description 创建文件夹
   * @param path 创建 /a/b/c，不管`/a` 和 /a/b 是否存在。
   * @returns {Promise}
   */
  public mkdirDir(path: string): Promise<string | undefined> {
    return fsPromiseAPIs.mkdir(path, { recursive: true });
  }

  /**
   * @description 读取文件夹目录
   * @param path 路径
   * @returns {Promise<string[]>}
   */
  public readdirSync(path: string): Promise<string[]> {
    return fsPromiseAPIs.readdir(path);
  }

  /**
   * @description 确定文件流是否存在，并返回文件流
   * @param filename 文件名
   */
  public ensureWriteStream = (filename: string): fs.WriteStream => {
    try {
      const exists = fs.existsSync(filename);
      if (!exists) {
        console.log('the write steam is not exists, will create');
        return fs.createWriteStream(filename);
      } else {
        console.log('the write steam is exists, will return write stream');
        return fs.createWriteStream(filename, { flags: 'a' });
      }
    } catch (error) {
      console.error('ensureStreamFile error', error);
      throw error;
    }
  };
}

export default new FileTool() as FileTool;
