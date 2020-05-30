export const debounce = <F extends (...args: any[]) => any>(func: F, waitTime: number) => {
  let timeout: number | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitTime);
    });
}