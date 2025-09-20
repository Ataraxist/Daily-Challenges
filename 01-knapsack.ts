// Statement: Given a set of n items numbered from 1 up to n, each with a weight wi and a value vi, along with a maximum weight capacity W, maximize the sum of the values of the items in the knapsack so that the sum of the weights is less than or equal to the knapsack's capacity.

// Top-Down Solution (Memoization)
function knapsackTopDown(weights: number[], values: number[], W: number): number {
    const n = weights.length;
    const memo: Map<string, number> = new Map();

    function dp(i: number, w: number): number {
        // Base case: no items left or no capacity left
        if (i === n || w === 0) {
            return 0;
        }

        const key = `${i},${w}`;
        if (memo.has(key)) {
            return memo.get(key)!;
        }

        let result: number;
        if (weights[i] > w) {
            // Item is too heavy, skip it
            result = dp(i + 1, w);
        } else {
            // Choose max between taking or skipping the item
            const take = values[i] + dp(i + 1, w - weights[i]);
            const skip = dp(i + 1, w);
            result = Math.max(take, skip);
        }

        memo.set(key, result);
        return result;
    }

    return dp(0, W);
}

// Bottom-Up Solution (Tabulation)
function knapsackBottomUp(weights: number[], values: number[], W: number): number {
    const n = weights.length;
    // dp[i][w] = max value with first i items and capacity w
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            // Skip current item (inherit from previous row)
            dp[i][w] = dp[i - 1][w];

            // Try to take current item if it fits
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]
                );
            }
        }
    }

    return dp[n][W];
}

// Space-Optimized Bottom-Up Solution
function knapsackOptimized(weights: number[], values: number[], W: number): number {
    const n = weights.length;
    // Only need previous row, so use 1D array
    const dp: number[] = Array(W + 1).fill(0);

    for (let i = 0; i < n; i++) {
        // Traverse backwards to avoid overwriting values we still need
        for (let w = W; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }

    return dp[W];
}

// Test the solutions
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const capacity = 7;

console.log("Top-Down Solution:", knapsackTopDown(weights, values, capacity));
console.log("Bottom-Up Solution:", knapsackBottomUp(weights, values, capacity));
console.log("Space-Optimized Solution:", knapsackOptimized(weights, values, capacity));

// Expected output: 9 (items with weights [3, 4] and values [4, 5])