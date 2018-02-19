import { TransformObjectData } from './transform_object_data'

export type handlerFn<T> = (data: T) => boolean

export class Filter<T> extends TransformObjectData<T, T> {
  constructor(fn: handlerFn<T>) {
    super((data: T) => (!!fn(data) ? data : undefined))
  }
}
