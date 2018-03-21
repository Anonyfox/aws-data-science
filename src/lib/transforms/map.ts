import { TransformObjectData } from './transform_object_data'

export class Map<T, S> extends TransformObjectData<T, S> {
  constructor(handler: (src: T) => S) {
    super(handler) // the default handler is actually a map function
  }
}
