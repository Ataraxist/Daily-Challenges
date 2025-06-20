// ! You are given a string s consisting of the characters 'N', 'S', 'E', and 'W', where s[i] indicates movements in an infinite grid:

// * 'N' : Move north by 1 unit.
// * 'S' : Move south by 1 unit.
// * 'E' : Move east by 1 unit.
// * 'W' : Move west by 1 unit.
// * Initially, you are at the origin (0, 0). You can change at most k characters to any of the four directions.

// * Find the maximum Manhattan distance from the origin that can be achieved at any time while performing the movements in order.

// * The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.
 

// ? Example 1:

// Input: s = "NWSE", k = 1

// Output: 3

// Explanation:

// Change s[2] from 'S' to 'N'. The string s becomes "NWNE".

// Movement	Position (x, y)	Manhattan Distance	Maximum
// s[0] == 'N'	(0, 1)	0 + 1 = 1	1
// s[1] == 'W'	(-1, 1)	1 + 1 = 2	2
// s[2] == 'N'	(-1, 2)	1 + 2 = 3	3
// s[3] == 'E'	(0, 2)	0 + 2 = 2	3
// The maximum Manhattan distance from the origin that can be achieved is 3. Hence, 3 is the output.

// ? Example 2:

// Input: s = "NSWWEW", k = 3

// Output: 6

// Explanation:

// Change s[1] from 'S' to 'N', and s[4] from 'E' to 'W'. The string s becomes "NNWWWW".

// The maximum Manhattan distance from the origin that can be achieved is 6. Hence, 6 is the output.

 

// ? Constraints:

// 1 <= s.length <= 105
// 0 <= k <= s.length
// s consists of only 'N', 'S', 'E', and 'W'.

function maxDistance(s: string, k: number): number {
    const n = s.length;
    const step: Record<string, [number, number]> = {
      N: [0, 1], S: [0, -1], E: [1, 0], W: [-1, 0],
    };
  
    // 1️⃣ prefix positions
    const px: number[] = [0];
    const py: number[] = [0];
    for (let c of s) {
      px.push(px[px.length - 1] + step[c][0]);
      py.push(py[py.length - 1] + step[c][1]);
    }
  
    // 2️⃣ collect reversal candidates (D·v < 0) with gain = 2·suffixLen
    type Cand = { idx: number; nx: number; ny: number; gain: number };
    const cands: Cand[] = [];
    for (let i = 0; i < n; i++) {
      const vx = step[s[i]][0];
      const vy = step[s[i]][1];
      const Dx = px[i];
      const Dy = py[i];
      if (Dx * vx + Dy * vy < 0) {           // pulling back toward origin
        cands.push({
          idx: i,
          nx: -vx,                           // flip to opposite dir
          ny: -vy,
          gain: 2 * (n - i),                 // effect lasts to the end
        });
      }
    }
  
    cands.sort((a, b) => b.gain - a.gain);
    const chosen = new Map<number, [number, number]>();
    for (let i = 0; i < Math.min(k, cands.length); i++) {
      const { idx, nx, ny } = cands[i];
      chosen.set(idx, [nx, ny]);
    }
  
    // 3️⃣ simulate once more with the selected flips
    let x = 0, y = 0, best = 0;
    for (let i = 0; i < n; i++) {
      const v = chosen.get(i) ?? step[s[i]];
      x += v[0];
      y += v[1];
      best = Math.max(best, Math.abs(x) + Math.abs(y));
    }
    return best;
  }