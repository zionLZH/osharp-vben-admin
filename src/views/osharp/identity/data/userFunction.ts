import { BasicColumn } from '/@/components/Table'

export const Colums: BasicColumn[] = [
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
