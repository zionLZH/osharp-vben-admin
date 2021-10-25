import { BasicColumn } from '/@/components/Table'
import { createBooleanColumn } from '../../../../utils/osharp'

export const Colums: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'Display',
    width: 150,
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'Class',
    width: 200,
  },
  {
    title: '级别',
    dataIndex: 'Level',
    width: 50,
  },
  {
    title: '启动顺序',
    dataIndex: 'Order',
    width: 80,
  },
  {
    title: '是否启用',
    dataIndex: 'IsEnabled',
    width: 80,
    customRender: ({ text }) => createBooleanColumn(text),
  },
]
