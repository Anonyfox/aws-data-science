import { TransformObjectData } from './transform_object_data'

export class Map<T, S> extends TransformObjectData<T, S> {
  constructor() {
    super() // the deault handler is actually a map function
  }
}
