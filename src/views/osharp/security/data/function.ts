import { FormProps } from '../../../../components/Form'
import { BasicColumn } from '/@/components/Table'
import { createBooleanColumn, createRequireFormRule } from '/@/utils/osharp'
import { usePermission } from '../../../../hooks/web/usePermission'
const { hasPermission } = usePermission()

export const Colums: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'Name',
    width: 200,
    align: 'left',
    fixed: 'left',
  },
  {
    title: '功能类型',
    dataIndex: 'AccessType',
    width: 100,
    customRender: ({ text }) => `${['匿名访问', '登录访问', '角色访问'][text]}`,
  },
  {
    title: '操作审计',
    dataIndex: 'AuditOperationEnabled',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '数据审计',
    dataIndex: 'AuditEntityEnabled',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '缓存秒数',
    dataIndex: 'CacheExpirationSeconds',
    width: 80,
  },
  {
    title: '滑动过期',
    dataIndex: 'IsCacheSliding',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '锁定',
    dataIndex: 'IsLocked',
    width: 50,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: 'Ajax访问',
    dataIndex: 'IsAjax',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '控制器',
    dataIndex: 'IsController',
    width: 70,
    customRender: ({ text }) => createBooleanColumn(text),
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
  {
    title: '功能方法',
    dataIndex: 'Action',
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
  return [{ key: 'Name', type: 'like', value: keyword }]
}

export const DetailFormConfig: FormProps = {
  labelWidth: 100,
  showActionButtonGroup: false,
  disabled: !hasPermission(['Function.Create', 'Function.Update']),
  schemas: [
    {
      field: 'Name',
      label: '名称',
      component: 'Input',
      defaultValue: '',
      rules: [createRequireFormRule()],
      componentProps: {
        readonly: true,
      },
    },
    {
      field: 'AccessType',
      label: '功能类型',
      component: 'Input',
      render: ({ values }) => `${['匿名访问', '登录访问', '角色访问'][values?.AccessType]}`,
    },
    {
      field: 'AuditOperationEnabled',
      label: '操作审计',
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'AuditEntityEnabled',
      label: '数据审计',
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'CacheExpirationSeconds',
      label: '缓存秒数',
      component: 'InputNumber',
      componentProps: {
        type: 'number',
      },
      defaultValue: 0,
    },
    {
      field: 'IsCacheSliding',
      label: '滑动过期',
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
