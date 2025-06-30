const sleep = async (msec: number): Promise<void> => {
  return await new Promise<void>(r => {
    setTimeout(() => {
      r();
    }, msec);
  });
};

export default sleep;
