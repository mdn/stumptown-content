const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max);
// ↪ 9223372036854775807n

BigInt.asIntN(64, max + 1n);
// ↪ -9223372036854775807n
// negative because of overflow
