/**
 * https://leetcode.com/problems/evaluate-reverse-polish-notation/
 *
 * First idea:
 * 1. Build a tree by reversely traversing the tokens. And number must be leaf.
 *    for example, tokens = ["2","1","+","3","*"]
 *            *
 *           / \
 *          3   +
 *             / \
 *            1   2
 * 2. Traverse the tree and compute the result recursive.
 *    for example, 3 * (1 + 2) = 9
 *
 * Second idea: O(N) solution
 * 1. Use stack.
 * 2. Traverse the tokens in-order.
 *    When see a number: push to stack
 *    When see a operator, do computation then push the result back.
 * 3. Answer will be in the stack[0]
 */

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  // 1. Use stack
  let stack = []

  // 2. Traverse the tokens in-order.
  for (let i = 0; i < tokens.length; i++) {
    if (['+', '-', '*', '/'].includes(tokens[i])) {
      const rightOperand = stack.pop()
      const leftOperand = stack.pop()
      stack.push(compute(tokens[i], leftOperand, rightOperand))
    } else {
      stack.push(tokens[i])
    }
  }

  return stack[0]
}

function compute(operator, leftOperand, rightOperand) {
  const l = Number(leftOperand)
  const r = Number(rightOperand)

  if (operator === '+') {
    return l + r
  }
  if (operator === '-') {
    return l - r
  }
  if (operator === '*') {
    return l * r
  }
  if (operator === '/') {
    return Math.trunc(l / r)
  }

  throw new Error('not valid operator')
}

console.log(evalRPN(['2', '1', '+', '3', '*']))
console.log(evalRPN(['4', '13', '5', '/', '+']))
console.log(
  evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])
)
