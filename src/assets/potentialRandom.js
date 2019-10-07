'use strict';

exports.case = {
  weapon: {
    1: {
      1: { calc: () => { return (Math.floor(Math.random() * 2) + 1); } },
      2: { calc: () => { return (Math.floor(Math.random() * 2) + 1) * 5; } },
      3: { calc: 1 },
      4: { calc: 4 },
      5: { calc: 1 },
      6: { calc: [3, 10] },
      7: { calc: [20, 20] },
      8: { calc: [10, 1] },
      9: { calc: [20, 1] },
      10: { calc: [5, 1] },
      11: { calc: [10, 1] },
      12: { calc: [20, 1] },
      13: { calc: [10, 1] },
      14: { calc: [20, 1] },
      15: { calc: 15 },
    }
  }
};