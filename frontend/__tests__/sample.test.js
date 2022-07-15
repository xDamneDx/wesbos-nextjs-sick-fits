function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);

  return aNum + bNum;
}

describe('Sample test 101', () => {
  it('works as expected', () => {
    // We run our expect statements to see if the test will pass
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });
  it('runs the add function properly', () => {
    expect(add(1, 3)).toBeGreaterThanOrEqual(4);
  });
  it('can add strings of number together', () => {
    expect(add('1', '2')).toBe(3);
  });
});
