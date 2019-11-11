import { Kind, URIS, URIS2, Kind2, HKT2 } from '../../src/HKT'
import { GetAlgebra, Algebra, Algebra1, Algebra2 } from '../../src/core'
import { Program } from '../../src/usage/programs-hkt'

type AllAlgebra = GetAlgebra<
  'Primitive' | 'Intersection' | 'Object' | 'Recursive' | 'Set' | 'StrMap' | 'TaggedUnions' | 'Unions'
>

export interface ModelAlgebra<F> extends Algebra<AllAlgebra, F> {}
export interface ModelAlgebra1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface ModelAlgebra2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}

export interface AlgebraUnion<F> extends Algebra<AllAlgebra, F> {}
export interface AlgebraUnion1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface AlgebraUnion2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}

export type ProgramUnionURI = 'ProgramUnion'

declare module '../../src/usage/programs-hkt' {
  interface Program<E, A> {
    ProgramUnion: <G>(a: AlgebraUnion<G>) => HKT2<G, E, A>
  }
  interface Program1<E, A> {
    ProgramUnion: <G extends URIS>(a: AlgebraUnion1<G>) => Kind<G, A>
  }
  interface Program2<E, A> {
    ProgramUnion: <G extends URIS2>(a: AlgebraUnion2<G>) => Kind2<G, E, A>
  }
}

export type ProgramUnion<E, A> = Program<E, A>[ProgramUnionURI]