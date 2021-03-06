import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraPrimitive } from '@morphic-ts/model-algebras/lib/primitives'
import type { Arbitrary } from 'fast-check'
import { array, bigInt, boolean, constant, float, integer, oneof, option, string, uuid } from 'fast-check'
import { left, right } from 'fp-ts/Either'
import { cons } from 'fp-ts/NonEmptyArray'
import { fromNullable, none, some } from 'fp-ts/Option'
import type { UUID } from 'io-ts-types/lib/UUID'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckPrimitiveInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraPrimitive<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    date: configs => env =>
      new FastCheckType(
        fastCheckApplyConfig(configs)(
          integer().map(n => new Date(n)),
          env
        )
      ),
    boolean: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(boolean(), env)),
    string: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(string(), env)),
    number: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(float(), env)),
    bigint: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(bigInt(), env)),
    stringLiteral: (l, config) => env => new FastCheckType(fastCheckApplyConfig(config)(constant(l), env)),
    tag: (l, config) => env => new FastCheckType(fastCheckApplyConfig(config)(constant(l), env)),
    keysOf: (k, config) => env =>
      new FastCheckType(
        fastCheckApplyConfig(config)(oneof(...(Object.keys(k) as (keyof typeof k)[]).map(constant)), env)
      ),
    nullable: (T, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config)(option(T(env).arb).map(fromNullable), env)),
    mutable: (T, config) => env => new FastCheckType(fastCheckApplyConfig(config)(T(env).arb, env)),
    array: (T, config) => env => new FastCheckType(fastCheckApplyConfig(config)(array(T(env).arb), env)),
    nonEmptyArray: (T, config) => env => {
      const gen = T(env).arb
      return new FastCheckType(
        fastCheckApplyConfig(config)(
          array(gen).chain(rest => gen.map(h => cons(h, rest))),
          env
        )
      )
    },
    uuid: config => env => new FastCheckType(fastCheckApplyConfig(config)(uuid() as Arbitrary<UUID>, env)),
    either: (e, a, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config)(oneof(e(env).arb.map(left), a(env).arb.map(right)) as any, env)),
    option: (a, config) => env =>
      new FastCheckType(fastCheckApplyConfig(config)(oneof(a(env).arb.map(some), constant(none)), env))
  })
)
