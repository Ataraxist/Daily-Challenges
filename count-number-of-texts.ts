// Alice is texting Bob using her phone. The mapping of digits to letters is shown in the figure below.

// In order to add a letter, Alice has to press the key of the corresponding digit i times, where i is the position of the letter in the key.

// For example, to add the letter 's', Alice has to press '7' four times. Similarly, to add the letter 'k', Alice has to press '5' twice.
// Note that the digits '0' and '1' do not map to any letters, so Alice does not use them.
// However, due to an error in transmission, Bob did not receive Alice's text message but received a string of pressed keys instead.

// For example, when Alice sent the message "bob", Bob received the string "2266622".
// Given a string pressedKeys representing the string received by Bob, return the total number of possible text messages Alice could have sent.

// Since the answer may be very large, return it modulo 109 + 7.

 

// Example 1:
// Input: pressedKeys = "22233"
// Output: 8
// Explanation:
// The possible text messages Alice could have sent are:
// "aaadd", "abdd", "badd", "cdd", "aaae", "abe", "bae", and "ce".
// Since there are 8 possible messages, we return 8.

// Example 2:
// Input: pressedKeys = "222222222222222222222222222222222222"
// Output: 82876089
// Explanation:
// There are 2082876103 possible text messages Alice could have sent.
// Since we need to return the answer modulo 109 + 7, we return 2082876103 % (109 + 7) = 82876089.
 

// Constraints:

// 1 <= pressedKeys.length <= 105
// pressedKeys only consists of digits from '2' - '9'.

function countTexts(pressedKeys: string): number {
   const stringLength = pressedKeys.length
    const mod = 1000000007;
    const outputArray: number[] = new Array(stringLength + 1).fill(0);
    outputArray[0] = 1; 
    const keyLookup: {[key: string]: number} = {
        '2': 3,
        '3': 3,
        '4': 3,
        '5': 3,
        '6': 3,
        '7': 4, 
        '8': 3,
        '9': 4   
    };

    for (let positionInString = 1; positionInString <= stringLength; positionInString++) {
        const currentDigit = pressedKeys[positionInString - 1];
        for (let possitionInLookup = 1; possitionInLookup <= keyLookup[currentDigit] && possitionInLookup <= positionInString; possitionInLookup++) {
            let canGroup = true; 
            for (let groupSize = positionInString - possitionInLookup; groupSize < positionInString - 1; groupSize++) {
                if (pressedKeys[groupSize] !== currentDigit) {
                    canGroup = false;
                    break;
                }
            }
            if (canGroup) outputArray[positionInString] = (outputArray[positionInString] + outputArray[positionInString - possitionInLookup]) % mod;
        }
    }
    return outputArray[pressedKeys.length];
};