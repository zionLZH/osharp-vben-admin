import { FormProps } from '../../../../components/Form'
import { BasicColumn } from '../../../../components/Table'
import {
  createBooleanColumn,
  createDateFormatColumn,
  createRequireFormRule,
} from '../../../../utils/osharp'
import { usePermission } from '../../../../hooks/web/usePermission'
const { hasPermission } = usePermission()

export const Colums: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'UserName',
    width: 150,
  },
  {
    title: '昵称',
    dataIndex: 'NickName',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'Email',
    width: 150,
  },
  {
    title: '邮箱验证',
    dataIndex: 'EmailConfirmed',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '手机号',
    dataIndex: 'PhoneNumber',
    width: 120,
  },
  {
    title: '手机验证',
    dataIndex: 'PhoneNumberConfirmed',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '角色',
    dataIndex: 'Roles',
    width: 150,
    customRender: ({ text }) => text.join(','),
  },
  {
    title: '账号锁定',
    dataIndex: 'IsLocked',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '登陆锁',
    dataIndex: 'LockoutEnabled',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
  {
    title: '登陆错误',
    dataIndex: 'AccessFailedCount',
    width: 80,
  },
  {
    title: '锁时间',
    dataIndex: 'LockoutEnd',
    width: 180,
    customRender: ({ text }) => createDateFormatColumn(text),
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
  width: 35 * 5,
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
        placeholder: '用户名/昵称/邮箱/手机号',
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
      { key: 'NickName', type: 'like', value: keyword },
      { key: 'Email', type: 'like', value: keyword },
      { key: 'PhoneNumber', type: 'like', value: keyword },
    ],
  ]
}

export const DetailFormConfig: FormProps = {
  labelWidth: 100,
  showActionButtonGroup: false,
  disabled: !hasPermission(['User.Create', 'User.Update']),
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
      field: 'UserName',
      label: '用户名',
      component: 'Input',
      defaultValue: '',
      rules: [createRequireFormRule()],
    },
    {
      field: 'Password',
      label: '密码',
      component: 'Input',
      componentProps: {
        type: 'password',
      },
      defaultValue: '',
    },
    {
      field: 'NickName',
      label: '昵称',
      component: 'Input',
      defaultValue: '',
    },
    {
      field: 'IsDefault',
      label: '默认角色',
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'Email',
      label: '邮箱',
      colProps: {
        span: 16,
      },
      component: 'Input',
      defaultValue: '',
      rules: [createRequireFormRule()],
    },
    {
      field: 'EmailConfirmed',
      label: '邮箱确认',
      colProps: {
        span: 8,
      },
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'PhoneNumber',
      label: '手机号',
      colProps: {
        span: 16,
      },
      component: 'Input',
      componentProps: {
        type: 'Number',
      },
      defaultValue: '',
    },
    {
      field: 'PhoneNumberConfirmed',
      label: '手机确认',
      colProps: {
        span: 8,
      },
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'IsLocked',
      label: '锁定',
      colProps: {
        span: 8,
      },
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'AccessFailedCount',
      label: '登陆错误次数',
      colProps: {
        span: 8,
      },
      component: 'Input',
      componentProps: {
        readOnly: true,
      },
      defaultValue: '0',
    },
    {
      field: 'LockoutEnabled',
      label: '登陆锁',
      colProps: {
        span: 8,
      },
      component: 'Switch',
      defaultValue: false,
    },
    {
      field: 'LockoutEnd',
      label: '锁时间',
      component: 'DatePicker',
      componentProps: {
        readOnly: true,
        valueFormat: 'YYYY-MM-DD hh:mm:ss',
        style: {
          width: '100%',
        },
      },
    },
  ],
}
