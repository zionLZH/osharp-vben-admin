import { FormProps } from '../../../../components/Form'
import { BasicColumn, BasicTableProps } from '/@/components/Table'
import { createDateFormatColumn, createTableFormCol } from '/@/utils/osharp'

export const Colums: BasicColumn[] = [
  {
    title: '功能',
    dataIndex: 'FunctionName',
    width: 150,
    align: 'left',
  },
  {
    title: '用户名',
    dataIndex: 'UserName',
    width: 150,
    align: 'left',
  },
  {
    title: '昵称',
    dataIndex: 'NickName',
    width: 150,
    align: 'left',
  },
  {
    title: 'Ip',
    dataIndex: 'Ip',
    width: 150,
    align: 'left',
  },
  {
    title: '操作系统',
    dataIndex: 'OperationSystem',
    width: 150,
    align: 'left',
  },
  {
    title: '浏览器',
    dataIndex: 'Browser',
    width: 150,
  },
  {
    title: '执行结果',
    dataIndex: 'ResultType',
    width: 80,
  },
  {
    title: '执行时间',
    dataIndex: 'CreatedTime',
    width: 180,
    customRender: ({ text }) => createDateFormatColumn(text),
  },
  {
    title: '耗时(ms)',
    dataIndex: 'Elapsed',
    width: 90,
  },
  {
    title: '消息',
    dataIndex: 'Message',
    width: 150,
  },
]

export const ActionConfig: BasicColumn = {
  title: '操作',
  dataIndex: 'action',
  width: 50,
  slots: { customRender: 'action' },
  fixed: 'right',
}

export const FormConfig: FormProps = {
  labelWidth: 100,
  autoSubmitOnEnter: true,
  schemas: [
    {
      field: `keyword`,
      label: `关键词`,
      component: 'Input',
      componentProps: {
        placeholder: '名称/功能方法',
      },
    },
  ],
}

export function getFilterItems(valueMap: any) {
  const { keyword = '' } = valueMap
  return [
    [
      'or',
      { key: 'UserName', type: 'like', value: keyword },
      { key: 'Ip', type: 'like', value: keyword },
      { key: 'FunctionName', type: 'like', value: keyword },
      { key: 'OperationSystem', type: 'like', value: keyword },
    ],
  ]
}

export const DetailFormConfig: FormProps = {
  labelWidth: 100,
  showActionButtonGroup: false,
  schemas: [
    {
      field: 'Name',
      label: '名称',
      component: 'Input',
      render: ({ values }) => `${values.Name}`,
    },
    {
      field: 'TypeName',
      label: '实体类型',
      component: 'Input',
      render: ({ values }) => `${values.TypeName}`,
    },
    {
      field: 'EntityKey',
      label: '数据编号',
      component: 'Input',
      render: ({ values }) => `${values.EntityKey}`,
    },
    {
      field: 'OperateType',
      label: '操作类型',
      component: 'Input',
      render: ({ values }) => `${values.OperateType}`,
    },
    {
      field: 'Properties',
      label: '',
      labelWidth: 0,
      component: 'Input',
      render: ({ values }) =>
        createTableFormCol(values.Properties, {
          title: '数据属性变更明细',
          columns: [
            { title: '字段名', dataIndex: 'FieldName', width: 150 },
            { title: '数据名', dataIndex: 'DisplayName', width: 150 },
            { title: '数据类型', dataIndex: 'DataType', width: 100 },
            { title: '新值', dataIndex: 'NewValue', width: 150 },
          ] as BasicColumn[],
          canResize: false,
          pagination: false,
        } as BasicTableProps),
    },
  ],
}
