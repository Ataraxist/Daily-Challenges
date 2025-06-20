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
    const dx: Record<string, number> = { 'E': 1, 'W': -1, 'N': 0, 'S': 0 };
    const dy: Record<string, number> = { 'N': 1, 'S': -1, 'E': 0, 'W': 0 };
  
    type Cand = { gain: number; idx: number; nx: number; ny: number };
  
    // Track prefix positions and baseline max
    const x: number[] = [0];
    const y: number[] = [0];
    let cx = 0, cy = 0;
    let basePeak = 0;
    for (let i = 0; i < n; i++) {
      cx += dx[s[i]];
      cy += dy[s[i]];
      x.push(cx);
      y.push(cy);
      basePeak = Math.max(basePeak, Math.abs(cx) + Math.abs(cy));
    }
  
    const dirs: [number, number][] = [[1,0],[-1,0],[0,1],[0,-1]];
    const cands: Cand[] = [];
  
    for (let i = 0; i < n; i++) {
      const old = [dx[s[i]], dy[s[i]]];
      for (const [nx, ny] of dirs) {
        if (nx === old[0] && ny === old[1]) continue;
  
        // Simulate what happens if we change move i
        const newX = [...x];
        const newY = [...y];
  
        for (let j = i + 1; j <= n; j++) {
          newX[j] += nx - old[0];
          newY[j] += ny - old[1];
        }
  
        let newPeak = 0;
        for (let j = 1; j <= n; j++) {
          newPeak = Math.max(newPeak, Math.abs(newX[j]) + Math.abs(newY[j]));
        }
  
        const gain = newPeak - basePeak;
        if (gain > 0) {
          cands.push({ gain, idx: i, nx, ny });
        }
      }
    }
  
    // Apply top-k best changes
    cands.sort((a, b) => b.gain - a.gain);
    const overrides = new Map<number, [number, number]>();
    for (let i = 0; i < Math.min(k, cands.length); i++) {
      const { idx, nx, ny } = cands[i];
      overrides.set(idx, [nx, ny]);
    }
  
    // Re-simulate
    let X = 0, Y = 0, maxDist = 0;
    for (let i = 0; i < n; i++) {
      const move = overrides.get(i) ?? [dx[s[i]], dy[s[i]]];
      X += move[0];
      Y += move[1];
      maxDist = Math.max(maxDist, Math.abs(X) + Math.abs(Y));
    }
  
    return maxDist;
  }
  
  