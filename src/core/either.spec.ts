import { Either, left, right } from './either'

function doSomething(shouldReturnSuccess: boolean): Either<string, number> {
  if (shouldReturnSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isLeft()).toBe(false)
  expect(result.isRight()).toBe(true)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})
