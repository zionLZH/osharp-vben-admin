import { listFileTemplate } from './listFileTemplate'

function listFileCodegen(entity, moduleName) {
  const entityName = entity.Name
  let template = listFileTemplate + ''
  template = template.replace(/#\{Entity}/gi, entityName)
  t
  return template
}

export function pageFileCodegen(zip, entity, moduleName) {
  const entityName = entity.Name
  const listFileSource = listFileCodegen(entity, moduleName)
  zip.file(`/src/views/${moduleName}/${entityName}/${entityName}.vue`, listFileSource)
}
