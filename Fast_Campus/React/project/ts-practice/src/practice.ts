function wrap<T>(param: T) {
  return {
    param,
  };
}

const wrapped = wrap(10);

wrapped.