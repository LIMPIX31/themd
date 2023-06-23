import { AnyColor, Colord, colord, extend } from 'colord'
import deltaPlugin from 'colord/plugins/lab'
import mixPlugin from 'colord/plugins/mix'

extend([deltaPlugin, mixPlugin])

export function delta(target: Colord, guides: AnyColor[]) {
  return guides.map((guide) => [1 - target.delta(guide), guide] as [number, AnyColor])
}

export interface DeriveOptions {
  dry?: number
  rate?: number
}

export function derive(guides: AnyColor[], { rate = 0.75, dry = 0.5 }: DeriveOptions = {}) {
  if (guides.length < 2) {
    throw new Error('Autotheme `derive` requires at least 2 color guides')
  }

  return function (target: AnyColor) {
    const clrd = colord(target)

    const deltas = delta(clrd, guides)

    deltas.sort(([a], [b]) => a - b)

    const last = deltas.at(-1)!

    let result = clrd.mix(colord(last[1]), dry)

    while (rate > 0) {
      const next = deltas.pop()

      if (!next) {
        break
      }

      const [delta, guide] = next

      const previousRate = rate
      rate -= delta
      const ratio = rate >= delta ? rate : previousRate

      result = result.mix(guide, ratio)
    }

    return result.toHex()
  }
}
