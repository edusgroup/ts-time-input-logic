import * as api from '../src'

test('keyDown without selection', () => {
  expect(api.keyDown('5', '12:34', 0, 0)).toBe('05:34')
  expect(api.keyDown('5', '12:34', 1, 1)).toBe('15:34')
  expect(api.keyDown('5', '12:34', 2, 2)).toBe('15:34')
  expect(api.keyDown('5', '12:34', 3, 3)).toBe('12:54')
  expect(api.keyDown('5', '12:34', 4, 4)).toBe('12:35')
  expect(api.keyDown('5', '12:34', 5, 5)).toBe('12:35')

  expect(api.keyDown('6', '12:34', 3, 3)).toBe('12:06')
})

test('keyDown with selection', () => {
  // select 1
  expect(api.keyDown('5', '12:34', 0, 1)).toBe('52:34')
  // select 12
  expect(api.keyDown('5', '12:34', 0, 2)).toBe('50:34')
  // select 12:
  expect(api.keyDown('5', '12:34', 0, 3)).toBe('50:34')
  // select 12:3
  expect(api.keyDown('5', '12:34', 0, 4)).toBe('50:04')
  // select 12:34
  expect(api.keyDown('5', '12:34', 0, 5)).toBe('50:00')
  // select 12:34
  expect(api.keyDown('5', '12:34', 0, 6)).toBe('50:00')
  // select 2:3
  expect(api.keyDown('5', '12:34', 1, 4)).toBe('15:04')
})

test('mouseWheel', () => {
  // before 1
  expect(api.mouseWheel('12:34', 0, 1)).toBe('13:34')
  expect(api.mouseWheel('23:34', 0, 1)).toBe('00:34')
  expect(api.mouseWheel('00:34', 0, -1)).toBe('23:34')
  // before 2
  expect(api.mouseWheel('12:34', 1, 1)).toBe('13:34')
  // before :
  expect(api.mouseWheel('12:34', 2, 1)).toBe('13:34')
  // before :
  expect(api.mouseWheel('12:34', 3, 1)).toBe('12:35')
  // in the end
  expect(api.mouseWheel('12:34', 5, 1)).toBe('12:35')
  expect(api.mouseWheel('12:34', 100, 1)).toBe('12:35')
  expect(api.mouseWheel('12:59', 3, 1)).toBe('13:00')
  expect(api.mouseWheel('12:00', 3, -1)).toBe('11:59')
})

test('keyDownRemove', () => {
  expect(api.keyDownRemove('12:34', 0, 10)).toBe('00:00')
  // out of range
  expect(api.keyDownRemove('12:34', 0, -1)).toBe('00:00')
  expect(api.keyDownRemove('12:34', -1, 5)).toBe('00:00')
})

test('copyPaste', () => {
  expect(api.copyPaste('5', '12:34', 0)).toBe('52:34')
  expect(api.copyPaste('56', '12:34', 0)).toBe('56:34')
  expect(api.copyPaste('56', '12:34', 1)).toBe('15:64')
  expect(api.copyPaste('56', '12:34', 2)).toBe('12:56')
  expect(api.copyPaste('56', '12:34', 3)).toBe('12:56')
  expect(api.copyPaste('56', '12:34', 4)).toBe('12:35')
  expect(api.copyPaste('56', '12:34', 5)).toBe('56:34')
  expect(api.copyPaste('5678', '12:34', 0)).toBe('56:78')
  expect(api.copyPaste('5678', '12:34', 1)).toBe('15:67')
  // out of rage
  expect(api.copyPaste('5', '12:34', -1)).toBe('52:34')
  expect(api.copyPaste('5', '12:34', 100)).toBe('52:34')
  expect(api.copyPaste('56', '12:34', -1)).toBe('56:34')
  expect(api.copyPaste('56', '12:34', 100)).toBe('56:34')
  expect(api.copyPaste('5678', '12:34', -1)).toBe('56:78')
  expect(api.copyPaste('5678', '12:34', 100)).toBe('56:78')
  // wrong date
  expect(api.copyPaste('TT5', '12:34', 0)).toBe('52:34')
})

test('correctDigit', () => {
  expect(api.correctDigit('01:59')).toBe('01:59')
  expect(api.correctDigit('23:54')).toBe('23:54')
  expect(api.correctDigit('30:99')).toBe('23:59')
})
