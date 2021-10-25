import { FormProps } from '../../../../components/Form'
import { BasicColumn } from '/@/components/Table'

export const Colums: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'Name',
    width: 200,
    align: 'left',
  },
  {
    title: '备注',
    dataIndex: 'Remark',
    width: 120,
    align: 'left',
  },
  {
    title: '代码',
    dataIndex: 'Code',
    width: 120,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'OrderCode',
    width: 80,
    align: 'left',
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
  valueMap
  return []
}

export const DetailColumns: BasicColumn[] = [
  {
    title: '功能名称',
    dataIndex: 'Name',
    width: 'auto',
  },
  {
    title: '功能类型',
    dataIndex: 'AccessType',
    width: 100,
    customRender: ({ text }) => {
      return `${['匿名访问', '登录访问', '角色访问'][text]}`
    },
  },
  {
    title: '区域',
    dataIndex: 'Area',
    width: 100,
  },
  {
    title: '控制器',
    dataIndex: 'Controller',
    width: 150,
  },
]
