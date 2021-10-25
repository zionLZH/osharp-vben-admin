<template>
  <BasicTable @register="registerTable">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue'
  import { BasicTable } from '/@/components/Table'
  import { useTable } from '/@/components/Table'
  import { basicProps } from '/@/components/Table/src/props'
  import { PaginationProps } from '/@/components/Table'

  export default defineComponent({
    name: 'OSharpList',
    components: { BasicTable },
    props: {
      ...basicProps,
      canResize: {
        default: true,
      },
      showIndexColumn: {
        default: true,
      },
      showTableSetting: {
        default: true,
      },
      bordered: {
        default: true,
      },
      striped: {
        default: true,
      },
      pagination: {
        type: [Object, Boolean] as PropType<PaginationProps | boolean>,
        default: () => ({
          total: 0,
        }),
      },
    },
    setup(props) {
      let refProps = toRefs<any>(props)

      const [registerTable, TableInstance] = useTable({
        ...refProps,
      })

      function getTableInstance() {
        return TableInstance
      }

      return {
        registerTable,
        getTableInstance,
      }
    },
  })
</script>

<style scoped></style>
