import { Checkbox } from 'ant-design-vue'
import { createVNode } from 'vue'
import { formatToDateTime } from '/@/utils/dateUtil'

export function createBooleanColumn(value, props: any = {}) {
  let VNode = createVNode(Checkbox, {
    style: 'pointer-events: none',
    checked: value,
    ...props,
  })
  setTimeout(() => {
    // @ts-ignore
    VNode = null
  }, 1)
  return VNode
}

export function createDateFormatColumn(value, format = 'YYYY-MM-DD') {
  return value ? formatToDateTime(value, format) : ''
}
