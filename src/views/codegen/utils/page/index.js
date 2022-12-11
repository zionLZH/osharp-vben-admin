import { listFileTemplate } from './listFileTemplate'
import { dtlModalFileTemplate } from './dtlModalFileTemplate'
import { pageDataConfTemplate } from './pageDataConfTemplate'

function listFileCodegen(entity, moduleName) {
  const entityName = entity.Name
  let template = listFileTemplate + ''
  template = template.replace(/#\{Entity}/gi, entityName)
  let apiFilePath = `api/${moduleName}/${entityName}`
  template = template.replace(/#\{ApiFile}/gi, entityName)
  return template
}

function dtlModalFileCodegen(entity, moduleName) {
  const entityName = entity.Name
  let template = dtlModalFileTemplate + ''
  template = template.replace(/#\{Entity}/gi, entityName)
  let apiFilePath = `api/${moduleName}/${entityName}`
  template = template.replace(/#\{ApiFile}/gi, entityName)
  return template
}

function pageDataConfFileCodegen(entity, moduleName) {
  const entityName = entity.Name
  let ForeignsMap = {}
  for (let foreign of entity.Foreigns) {
    ForeignsMap[foreign.SelfNavigation] = foreign
  }
  let template = pageDataConfTemplate + ''
  template = template.replace(/#\{Entity}/gi, entityName)
  // 生成列表列项
  let ColumnsText = []
  for (let Properties of entity.Properties) {
    if (Properties.IsNavigation) {
      const foreignConf = ForeignsMap[Properties.TypeName]
      if (!foreignConf) {
        continue
      }
    }
    ColumnsText.push(`  {`)
    ColumnsText.push(`    title: '${Properties.Display}',`)
    if (!Properties.IsNavigation) {
      ColumnsText.push(`    dataIndex: '${Properties.Name}',`)
    } else {
      // 外键
      const foreignConf = ForeignsMap[Properties.TypeName]
      ColumnsText.push(`    dataIndex: '${foreignConf.SelfForeignKey}',`)
    }
    ColumnsText.push(`    width: 'auto',`)
    // 根据数据类型决定是否需要自定义渲染
    switch (Properties.TypeName) {
      case 'System.DateTime':
        ColumnsText.push(
          `    customRender: ({ text }) => (text ? formatToDate(new Date(text), 'YYYY-MM-DD') : ''),`,
        )
        break
    }
    ColumnsText.push(`  },`)
  }

  // 生成列表搜索项目
  let FormSchemas = []
  for (let Properties of entity.Properties) {
    if (Properties.IsNavigation) {
      const foreignConf = ForeignsMap[Properties.TypeName]
      if (!foreignConf) {
        continue
      }
    }
    FormSchemas.push(`    {`)
    if (!Properties.IsNavigation) {
      FormSchemas.push(`      field: '${Properties.Name}',`)
    } else {
      // 外键
      const foreignConf = ForeignsMap[Properties.TypeName]
      FormSchemas.push(`      field: '${foreignConf.SelfForeignKey}',`)
    }
    FormSchemas.push(`      label: '${Properties.Display}',`)
    FormSchemas.push(`      colProps: { span: 8 },`)
    FormSchemas.push(`      width: 'auto',`)
    // 根据数据类型决定是否需要自定义渲染
    if (!Properties.IsNavigation) {
      switch (Properties.TypeName) {
        case 'System.DateTime':
          FormSchemas.push(`      component: 'DatePicker',`)
          FormSchemas.push(`      defaultValue: '',`)
          FormSchemas.push(`      componentProps: {`)
          FormSchemas.push(`        style: {`)
          FormSchemas.push(`          width: '100%',`)
          FormSchemas.push(`        },`)
          FormSchemas.push(`        valueFormat: 'YYYY-MM-DD',`)
          FormSchemas.push(`        format: 'YYYY-MM-DD',`)
          FormSchemas.push(`        placeholder: '${Properties.Display}',`)
          FormSchemas.push(`      },`)
          break
        default:
          FormSchemas.push(`      component: 'Input',`)
          FormSchemas.push(`      defaultValue: '',`)
          FormSchemas.push(`      componentProps: {`)
          FormSchemas.push(`        placeholder: '${Properties.Display}',`)
          FormSchemas.push(`      },`)
          break
      }
    } else {
      // 外键
      const foreignConf = ForeignsMap[Properties.TypeName]
      FormSchemas.push(`      component: 'ApiSelect',`)
      FormSchemas.push(`      defaultValue: '',`)
      FormSchemas.push(`      componentProps: {`)
      FormSchemas.push(`        api: async () => {`)
      FormSchemas.push(`          // const res = await Api(data)`)
      FormSchemas.push(`          // 返回结构为[{ Name, Id }]`)
      FormSchemas.push(`          // return res`)
      FormSchemas.push(`          return []`)
      FormSchemas.push(`        },`)
      FormSchemas.push(`        showSearch: true,`)
      FormSchemas.push(`        optionFilterProp: 'label',`)
      FormSchemas.push(`        resultField: 'Data',`)
      FormSchemas.push(`        labelField: 'Name',`)
      FormSchemas.push(`        valueField: 'Id',`)
      FormSchemas.push(`        placeholder: '${Properties.Display}',`)
      FormSchemas.push(`      },`)
    }
    FormSchemas.push(`    },`)
  }
  template = template.replace(/#\{FormSchemas}/gi, FormSchemas.join('\r\n'))
  return template
}

export function pageFileCodegen(zip, entity, moduleName) {
  const entityName = entity.Name
  const listFileSource = listFileCodegen(entity, moduleName)
  zip.file(`/src/views/${moduleName}/${entityName}/${entityName}.vue`, listFileSource)
  const dtlModalFileSource = dtlModalFileCodegen(entity, moduleName)
  zip.file(`/src/views/${moduleName}/${entityName}/modal/${entityName}Dtl.vue`, dtlModalFileSource)
  const pageDataConfFileSource = pageDataConfFileCodegen(entity, moduleName)
  zip.file(`/src/views/${moduleName}/${entityName}/data/${entityName}.ts`, pageDataConfFileSource)
}
