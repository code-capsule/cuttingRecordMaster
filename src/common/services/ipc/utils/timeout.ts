export const timeoutWrap = (handler: Function, timeout = 15000, ...args: any[]): Promise<any> => {
  return Promise.race([handler(...args), Timeout(timeout, ...args)]);
};

const Timeout = (timeout = 15000, ...args: any[]) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('request is timeout'));
    }, timeout);
  });
};
