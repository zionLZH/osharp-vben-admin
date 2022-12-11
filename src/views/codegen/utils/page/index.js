import { listFileTemplate } from './listFileTemplate'
import { dtlModalFileTemplate } from './dtlModalFileTemplate'
import { pageDataConfTemplate } from './pageDataConfTemplate'

function listFileCodegen(entity, moduleName) {
  const entityName = entity.Name
  let template = listFileTemplate + ''
  template = template.replace(/#\{Entity}/gi, entityName)
  let apiFilePath = `api/${moduleName}/${entityName}`
  template = template.replace(/#\{ApiFile}/gi, apiFilePath)
  return template
}

function dtlModalFileCodegen(entity, moduleName) {
  const entityName = entity.Name
  let template = dtlModalFileTemplate + ''
  template = template.replace(/#\{Entity}/gi, entityName)
  let apiFilePath = `api/${moduleName}/${entityName}`
  template = template.replace(/#\{ApiFile}/gi, apiFilePath)
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
  template = template.replace(/#\{Columns}/gi, ColumnsText.join('\r\n'))

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

  // 生成列表搜索项目
  let FilterItems = []
  let FilterKeys = []
  for (let Properties of entity.Properties) {
    const foreignConf = ForeignsMap[Properties.TypeName]
    if (Properties.IsNavigation) {
      if (!foreignConf) {
        continue
      }
    }
    if (!Properties.IsNavigation) {
      FilterKeys.push(Properties.Name)
      FilterItems.push(`    { key: '${Properties.Name}', type: '=', value: ${Properties.Name} },`)
    } else {
      // 外键
      FilterKeys.push(foreignConf.SelfForeignKey)
      FilterItems.push(
        `    { key: '${foreignConf.SelfForeignKey}', type: '=', value: ${foreignConf.SelfForeignKey} },`,
      )
    }
  }
  FilterKeys = [...new Set(FilterKeys)]
  template = template.replace(/#\{FilterItems}/gi, FilterItems.join('\r\n'))
  template = template.replace(/#\{FilterKeys}/gi, FilterKeys.join(', '))

  // 生成详情表单项目
  let DetailFormConfig = []
  for (let Properties of entity.Properties) {
    const foreignConf = ForeignsMap[Properties.TypeName]
    if (Properties.IsNavigation) {
      if (!foreignConf) {
        continue
      }
    }
    if (Properties.Name === 'Id') {
      // Id直接占位，一般不需要显示的
      DetailFormConfig.push(`    createHolderProps('Id'),`)
      continue
    }
    const PropertiesTypeName = Properties.TypeName
    const PropertiesDisplay = Properties.Display
    const PropertiesRequired = Properties.IsRequired
    if (!Properties.IsNavigation) {
      // 根据数据类型决定是否需要自定义渲染
      switch (Properties.TypeName) {
        case 'System.DateTime':
          DetailFormConfig.push(`    {
      field: '${PropertiesTypeName}',
      label: '${PropertiesDisplay}',
      component: 'DatePicker',
      defaultValue: '',
      colProps: { span: 24 },
      componentProps: {
        style: {
          width: '100%',
        },
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
      },
      rules: ${PropertiesRequired ? '[createRequireFormRule()]' : '[]'},
    },`)
          break
        case '':
          DetailFormConfig.push(`{
      field: '${PropertiesTypeName}',
      label: '${PropertiesDisplay}',
      component: 'Switch',
      defaultValue: false,
      colProps: { span: 24 },
      rules: ${PropertiesRequired ? '[createRequireFormRule()]' : '[]'},
    },`)
          break
        case 'System.Int32':
        case 'System.Double':
        case 'System.Int64':
          DetailFormConfig.push(`    {
      field: '${PropertiesTypeName}',
      label: '${PropertiesDisplay}',
      component: 'InputNumber',
      defaultValue: 0,
      colProps: { span: 24 },
      rules: ${PropertiesRequired ? '[createRequireFormRule()]' : '[]'},
    },`)
          break
        case 'System.String':
        default:
          // 文本和其他默认都走输入框
          DetailFormConfig.push(`    {
      field: \`${PropertiesTypeName}\`,
      label: \`${PropertiesDisplay}\`,
      component: \`Input\`,
      componentProps: {},
      defaultValue: '',
      colProps: { span: 24 },
      rules: ${PropertiesRequired ? '[createRequireFormRule()]' : '[]'},
    },`)
          break
      }
    } else {
      // 外键
      DetailFormConfig.push(`    {
      field: '${foreignConf.SelfForeignKey}',
      label: '${PropertiesDisplay}',
      component: 'ApiSelect',
      defaultValue: '',
      componentProps: {
        api: async () => {
          // const res = await Api(data),
          // 返回结构为[{ Name, Id }]
          // return res
          return []
        },
        showSearch: true,
        optionFilterProp: 'label',
        resultField: 'Data',
        labelField: 'Name',
        valueField: 'Id',
      },
    },`)
    }
  }
  template = template.replace(/#\{DetailFormConfig}/gi, DetailFormConfig.join('\r\n'))
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
