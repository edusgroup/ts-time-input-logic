function getCorrectIndex (src: string, start: number): number {
  return src[start] === ':' ? start - 1 : (start >= src.length ? src.length - 1 : start)
}

function oneChange (key: string, src: string, start: number): string {
  const index = getCorrectIndex(src, start)

  return src.substring(0, index) + key + src.substr(index + 1)
}

// 99:99
export function keyDown (key: string, src: string, startRaw: number, endRaw: number): string {
  const start = startRaw < 0 ? 0 : startRaw
  const end = endRaw < 0 ? src.length : endRaw
  if (start === end) {
    const keyNum = parseInt(key, 10)
    if (start % 3 === 0 && (keyNum > 2 && start === 0 || keyNum > 5 && start !== 0)) {
      return src.substring(0, start) + (keyNum + '').padStart(2, '0') + src.substring(start + 2)
    }

    return oneChange(key, src, start)
  }

  let replacePart: string
  const selectPart = src.substring(start, end)
  const colonIndex = selectPart.indexOf(':')
  if (colonIndex === -1) {
    replacePart = (''.padEnd(end - start, '0'))
  } else {
    replacePart = selectPart.split(':').map(str => ''.padEnd(str.length, '0')).join(':')
  }

  const timeText = src.substring(0, start) + replacePart + src.substr(end)

  return oneChange(key, timeText, start)
}

export function keyDownRemove (src: string, start: number, end: number): string {
  return keyDown('0', src, start, end)
}

export function copyPaste (dataRaw: string, src: string, startRaw: number): string {
  const start = startRaw >= src.length ? 0 : (startRaw < 0 ? 0 : startRaw)

  const data = dataRaw.replace(/[^\d]/g, '')
  let dataIndex = 0
  let result = ''
  for (let i = start; i < src.length; i += 1) {
    result += src[i] !== ':' && data[dataIndex] !== undefined ? data[dataIndex++] : src[i]
  }

  return src.substr(0, start) + result
}

export function correctDigit (src: string): string {
  const [hourStr, minuteStr] = src.split(':')
  let hourInt = parseInt(hourStr, 10)
  hourInt = hourInt > 23 ? 23 : hourInt
  let minuteInt = parseInt(minuteStr, 10)
  minuteInt = minuteInt > 59 ? 59 : minuteInt

  return (hourInt + '').padStart(2, '0') + ':' + (minuteInt + '').padStart(2, '0')
}

const CHUNKS_LIMIT = [23, 59, 59]

export function mouseWheel (src: string, start: number, direction: number): string {
  const chunks = src.split(':')

  let chunkIndex = Math.abs(Math.round((start + 1) / 3 - 0.6))
  chunkIndex = chunkIndex >= chunks.length ? chunks.length - 1 : chunkIndex

  for (let i = chunkIndex; i >= 0; i -= 1) {
    let chunk = parseInt(chunks[i], 10) + direction
    if (0 <= chunk && chunk <= CHUNKS_LIMIT[i]) {
      chunks[i] = chunk + ''
      break
    }
    chunk = chunk > CHUNKS_LIMIT[i] ? 0 : CHUNKS_LIMIT[i]
    chunks[i] = chunk + ''
  }

  return chunks.map(chunk => chunk.padStart(2, '0')).join(':')
}

// let str: string
// str = mouseWheel('12:34', 0, 1) // 15:64
// console.log(str)
