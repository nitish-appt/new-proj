export const hello = (): string => {
  return 'world';
};

describe('Hello world', () => {
  it('hello -> world', () => {
    expect(hello()).toBe('world');
  });
});
