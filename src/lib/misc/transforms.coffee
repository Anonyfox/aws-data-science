import { fromPairs, reverse, sortBy, toPairs } from "lodash"

export ascendingArray = (obj) -> sortBy toPairs(obj), 1
export descendingArray = (obj) -> reverse ascendingArray obj
export ascendingObject = (obj) -> fromPairs ascendingArray obj
export descendingObject = (obj) -> fromPairs descendingArray obj