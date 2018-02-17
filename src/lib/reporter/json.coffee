import { writeFileSync } from "fs"
import { join } from "path"
import { cwd } from "process"

export default (data, outPath) ->
  outPath ?= join cwd(), "data.json"
  text = JSON.stringify data, null, 2
  writeFileSync outPath, text, encoding: "utf-8"