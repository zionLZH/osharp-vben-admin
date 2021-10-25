import { FormProps } from '../../../../components/Form'
import { BasicColumn } from '/@/components/Table'
import { createBooleanColumn, createDateFormatColumn, createRequireFormRule } from '/@/utils/osharp'
import { usePermission } from '../../../../hooks/web/usePermission'
const { hasPermission } = usePermission()

export const Colums: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'Name',
    width: 'auto',
  },
  {
    title: '备注',
    dataIndex: 'Remark',
    width: 150,
  },
  {
    title: '备注',
    dataIndex: 'Remark',
    width: 150,
  },
  {
    title: '管理',
    dataIndex: 'IsAdmin',
    width: 50,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '默认',
    dataIndex: 'IsDefault',
    width: 50,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '锁定',
    dataIndex: 'IsLocked',
    width: 50,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '创建时间',
    dataIndex: 'CreatedTime',
    width: 180,
    customRender: ({ text }) => createDateFormatColumn(text),
  },
]

export const ActionConfig: BasicColumn = {
  title: '操作',
  dataIndex: 'action',
  width: 140,
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
        placeholder: '角色名称/备注',
      },
    },
  ],
}

export function getFilterItems(valueMap: any) {
  const { keyword = '' } = valueMap
  return [{ key: 'Name', type: 'like', value: keyword }]
}

export const DetailFormConfig: FormProps = {
  labelWidth: 100,
  showActionButtonGroup: false,
  disabled: !hasPermission(['Role.Create', 'Role.Update']),
  schemas: [
    {
      field: 'Id',
      label: 'ID',
      component: 'Input',
      defaultValue: undefined,
      render: ({ values }) => {
        return values?.Id || '自动生成'
      },
    },
    {
      field: 'Name',
      label: '名称',
      component: 'Input',
      defaultValue: '',
      rules: [createRequireFormRule()],
    },
    {
      field: 'Remark',
      label: '备注',
      component: 'InputTextArea',
      defaultValue: '',
    },
    {
      field: 'IsAdmin',
      label: '管理角色',
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'IsDefault',
      label: '默认角色',
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'IsLocked',
      label: '锁定',
      component: 'Switch',
      defaultValue: false,
    },
  ],
}
