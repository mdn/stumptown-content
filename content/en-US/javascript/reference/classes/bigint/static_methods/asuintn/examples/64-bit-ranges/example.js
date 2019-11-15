const max = 2n ** 64n - 1n;

BigInt.asUintN(64, max);
// ↪ 18446744073709551615n

BigInt.asUintN(64, max + 1n);
// ↪ 0n
// zero because of overflow
