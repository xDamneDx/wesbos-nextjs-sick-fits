import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(2)).toEqual('$0.02');
    expect(formatMoney(20)).toEqual('$0.20');
    expect(formatMoney(49)).toEqual('$0.49');
    expect(formatMoney(99)).toEqual('$0.99');
  });
  it('leaves off cents when its whole dollars', () => {
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(1000)).toEqual('$10');
    expect(formatMoney(2000)).toEqual('$20');
    expect(formatMoney(30000)).toEqual('$300');
    expect(formatMoney(400000)).toEqual('$4,000');
  });
  it('works with whole and fractional dollars', () => {
    expect(formatMoney(101)).toEqual('$1.01');
    expect(formatMoney(1049)).toEqual('$10.49');
    expect(formatMoney(2099)).toEqual('$20.99');
    expect(formatMoney(30002)).toEqual('$300.02');
    expect(formatMoney(400099)).toEqual('$4,000.99');
  });
});
