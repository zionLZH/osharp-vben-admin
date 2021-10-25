import { FormProps } from '../../../../components/Form'
import { BasicColumn } from '/@/components/Table'
import { createBooleanColumn } from '/@/utils/osharp'
import { usePermission } from '../../../../hooks/web/usePermission'
const { hasPermission } = usePermission()

export const Colums: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'Name',
    width: 150,
    align: 'left',
  },
  {
    title: '实体类型',
    dataIndex: 'TypeName',
    width: 'auto',
    align: 'left',
  },
  {
    title: '数据审计',
    dataIndex: 'AuditEnabled',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
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
        placeholder: '名称/实体类型',
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
  disabled: !hasPermission(['EntityInfo.Create', 'EntityInfo.Update']),
  schemas: [
    {
      field: 'Name',
      label: '名称',
      component: 'Input',
      defaultValue: '',
      componentProps: {
        readonly: true,
      },
    },
    {
      field: 'TypeName',
      label: '实体类型',
      component: 'Input',
      defaultValue: '',
      componentProps: {
        readonly: true,
      },
    },
    {
      field: 'AuditEnabled',
      label: '操作审计',
      component: 'Checkbox',
      defaultValue: false,
    },
  ],
}
