# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]
> - [Deprecation]

## 3.0.0-RC0

- **New Feature**
  - add `mutable`
- **Breaking Change**
  - make `array`, `nonempty`, `interface`, `partial`, `both` readonly

## 2.0.0

Promotion from 2.0.0-alpha.19

## 2.0.0-alpha.19

- **New Feature**
  - add `record`
- **Polish**
  - add tests for `strMap`
- **Breaking Change**
  - fix wording of `AOfMorphADT` and `EOfMorphADT` (`Morhp` to `Morph`) (thanks @erlandsona)
  - upgrade fast-check to ^2.6.O (this may break some code in userland)
