import { FormProps } from '../../../../components/Form'
import { BasicColumn } from '/@/components/Table'
import { createBooleanColumn, createDateFormatColumn } from '/@/utils/osharp'
import { ReadNode as RoleReadNode } from '../../../../api/osharp/Role'
import { ReadNode as EntityinfoReadNode } from '../../../../api/osharp/Entityinfo'
import { usePermission } from '../../../../hooks/web/usePermission'
const { hasPermission } = usePermission()

export const Colums: BasicColumn[] = [
  {
    title: '角色',
    dataIndex: 'RoleName',
    width: 150,
  },
  {
    title: '数据实体',
    dataIndex: 'EntityType',
    width: 200,
    align: 'left',
    customRender: ({ record }) => (
      <div>
        <div>{record.EntityName}</div>
        <div>{record.EntityType}</div>
      </div>
    ),
  },
  {
    title: '操作',
    dataIndex: 'Operation',
    width: 50,
    customRender: ({ text }) => ['读取', '更新', '删除'][text],
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
        placeholder: '角色名称',
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
  disabled: !hasPermission(['RoleEntity.Create', 'RoleEntity.Update']),
  schemas: [
    {
      field: 'RoleId',
      label: '角色',
      component: 'ApiSelect',
      defaultValue: '',
      componentProps: {
        api: RoleReadNode,
        showSearch: true,
        optionFilterProp: 'label',
        labelField: 'RoleName',
        valueField: 'RoleId',
      },
    },
    {
      field: 'EntityId',
      label: '数据实体',
      component: 'ApiSelect',
      defaultValue: '',
      componentProps: {
        api: EntityinfoReadNode,
        showSearch: true,
        optionFilterProp: 'label',
        labelField: 'Name',
        valueField: 'Id',
      },
    },
    {
      field: 'Operation',
      label: '操作',
      component: 'Select',
      defaultValue: '',
      componentProps: {
        options: [
          { value: 0, label: '读取' },
          { value: 1, label: '更新' },
          { value: 2, label: '删除' },
        ],
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
