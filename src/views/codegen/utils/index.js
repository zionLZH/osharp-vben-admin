import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { apiFileCodegen } from './api'
import { routeFileCodegen } from './route'
import { pageFileCodegen } from './page'

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
  // route
  for (let module of configJson.Modules) {
    let moduleName = module.Name
    let routeFileSource = routeFileCodegen(module, moduleName)
    zip.file(`/src/router/routes/modules/${moduleName}.ts`, routeFileSource)
  }
  // page
  for (let module of configJson.Modules) {
    let moduleName = module.Name
    for (let entity of module.Entities) {
      pageFileCodegen(zip, entity, moduleName)
    }
  }
  // export
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    // see FileSaver.js
    saveAs(content, 'codegen.zip')
  })
}
