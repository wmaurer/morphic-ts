import { ModelAlgebraIntersection1 } from '../../algebras/intersections'
import { JsonSchema, JsonSchemaURI, arrayTraverseStateEither, resolveRef, registerSchema } from '.'
import { IntersectionTypeCtor } from '../../json-schema/json-schema-ctors'
import { pipe } from 'fp-ts/lib/pipeable'
import * as SE from '../../StateEither'

export const jsonSchemaIntersectionInterpreter: ModelAlgebraIntersection1<JsonSchemaURI> = {
  intersection: <A>(types: Array<JsonSchema<A>>, name: string) =>
    new JsonSchema<A>(
      pipe(
        arrayTraverseStateEither(types, ({ schema }) => schema),
        SE.chain(schemas => arrayTraverseStateEither(schemas, resolveRef)),
        SE.chainEitherK(IntersectionTypeCtor),
        SE.chain(registerSchema(name))
      )
    )
}
