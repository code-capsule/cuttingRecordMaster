import master from '../model'

export default async function setup() {
  // @ts-ignore
  global.master = master
  require('@electron/remote/main').initialize()
}
