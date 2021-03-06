import type { AnyEnv } from '@morphic-ts/common/lib/config'
import { memo } from '@morphic-ts/common/lib/utils'
import type { ModelAlgebraUnknown } from '@morphic-ts/model-algebras/lib/unknown'
import { anything } from 'fast-check'

import { fastCheckApplyConfig } from '../config'
import { FastCheckType, FastCheckURI } from '../hkt'

/**
 *  @since 0.0.1
 */
export const fastCheckUnknownInterpreter = memo(
  <Env extends AnyEnv>(): ModelAlgebraUnknown<FastCheckURI, Env> => ({
    _F: FastCheckURI,
    unknown: configs => env => new FastCheckType(fastCheckApplyConfig(configs)(anything(), env))
  })
)
