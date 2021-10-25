import { FormProps } from '../../../../components/Form'
import { BasicColumn } from '/@/components/Table'
import { createBooleanColumn, createDateFormatColumn } from '/@/utils/osharp'
import { usePermission } from '../../../../hooks/web/usePermission'
const { hasPermission } = usePermission()

export const Colums: BasicColumn[] = [
  {
    title: '用户昵称',
    dataIndex: 'UserName',
    width: 'auto',
  },
  {
    title: '用户角色',
    dataIndex: 'RoleName',
    width: 'auto',
  },
  {
    title: '锁定',
    dataIndex: 'IsLocked',
    width: 50,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '注册时间',
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
  valueMap
  return []
}

export const DetailFormConfig: FormProps = {
  labelWidth: 100,
  showActionButtonGroup: false,
  disabled: !hasPermission(['UserRole.Create', 'UserRole.Update']),
  schemas: [
    {
      field: 'UserName',
      label: '用户',
      component: 'Input',
      defaultValue: undefined,
      render: ({ values }) => {
        return values?.UserName
      },
    },
    {
      field: 'RoleName',
      label: '角色',
      component: 'Input',
      defaultValue: undefined,
      render: ({ values }) => {
        return values?.RoleName
      },
    },
    {
      field: 'IsLocked',
      label: '锁定',
      component: 'Switch',
      defaultValue: false,
    },
  ],
}
