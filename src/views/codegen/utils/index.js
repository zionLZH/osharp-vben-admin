import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { apiFileCodegen } from './api'


export function createZipObject() {
  return new JSZip()
}

export function codegenByConfigJson(configJson, prefixRoute) {
  console.log(configJson)
  const zip = createZipObject()
  // api
  for (let module of configJson.Modules) {
    let moduleName = module.Name
    for (let entity of module.Entities) {
      let apiFileSource = apiFileCodegen(entity, prefixRoute)
      zip.file(`/src/api/${moduleName}/${entity.Name}.ts`, apiFileSource)
    }
  }

  // export
  zip.generateAsync({type:"blob"}).then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
  })
}
