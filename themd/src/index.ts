import { AnyColor, Colord, colord, extend } from 'colord'
import deltaPlugin from 'colord/plugins/lab'
import mixPlugin from 'colord/plugins/mix'

extend([deltaPlugin, mixPlugin])

function delta(target: Colord, guides: AnyColor[]) {
  return guides.map((guide) => [1 - target.delta(guide), guide] as [number, AnyColor])
}

function clampColor(target: Colord, guides: AnyColor[]) {
  const deltas = guides.map((guide) => [target.delta(guide), guide] as [number, AnyColor])
  deltas.sort(([a], [b]) => a - b)
  return colord(deltas[0][1])
}

export interface DeriveOptions {
  dry?: number
  ratio?: number
  clamp?: boolean
  strict?: boolean
}

export function derive(
  guides: AnyColor[],
  { ratio: rate = 0.75, dry = 0.5, clamp = false, strict = false }: DeriveOptions = {},
) {
  if (guides.length < 2) {
    throw new Error('Themd `derive` requires at least 2 color guides')
  }

  return function (target: AnyColor) {
    const clrd = colord(target)

    const deltas = delta(clrd, guides)

    deltas.sort(([a], [b]) => a - b)

    const top = deltas.at(-1)!

    if (strict) {
      return colord(top[1]).toHex()
    }

    let result = clrd.mix(colord(top[1]), dry)

    while (rate > 0) {
      const next = deltas.pop()

      if (!next) {
        break
      }

      const [delta, guide] = next

      const previousRate = rate
      rate -= delta
      const ratio = previousRate >= delta ? delta : previousRate

      result = result.mix(guide, ratio)
    }

    return (clamp ? clampColor(result, guides) : result).toHex()
  }
}
