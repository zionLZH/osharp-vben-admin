export const pageDataConfTemplate = `import { get, set } from 'lodash-es'
import { FormProps } from '/@/components/Form'
import { BasicColumn } from '/@//components/Table'
import { usePermission } from '/@/hooks/web/usePermission'
import {
  createHolderProps,
  createOSSUploadFormColProps,
  createRequireFormRule,
  createUploadFormColProps,
} from '../../../../utils/osharp'
import { h } from 'vue'
import { useMessage } from '../../../../hooks/web/useMessage'
import { formatToDate } from '../../../../utils/dateUtil'

const { createMessage } = useMessage()

const { hasPermission } = usePermission()
hasPermission || get || set || formatToDate

export const Colums: BasicColumn[] = [
#{Columns}
]

export const ActionConfig: BasicColumn = {
  title: '',
  dataIndex: '_action',
  width: 120,
  slots: { customRender: 'action' },
  fixed: 'right',
}

export const FormConfig: FormProps = {
  labelWidth: 80,
  autoSubmitOnEnter: true,
  schemas: [
#{FormSchemas}
  ],
}

export function getFilterItems(valueMap: any) {
  const { keyword, Graduated, OnJob, DepartmentId } = valueMap
  return [
    // { key: 'IsDelete', type: '=', value: IsDelete },
    { key: 'DepartmentId', type: '=', value: DepartmentId },
    { key: 'Graduated', type: '=', value: Graduated },
    { key: 'OnJob', type: '=', value: OnJob },
    [
      'or',
      { key: 'Name', type: 'like', value: keyword },
      { key: 'IdCard', type: 'like', value: keyword },
      { key: 'Code', type: 'like', value: keyword },
      { key: 'Phone', type: 'like', value: keyword },
      { key: 'Phone2', type: 'like', value: keyword },
      { key: 'Address', type: 'like', value: keyword },
      { key: 'Remark', type: 'like', value: keyword },
    ],
  ]
}

export const DetailFormConfig: FormProps = {
  labelWidth: 100,
  showActionButtonGroup: false,
  disabled: !hasPermission(['#{Entity}.Create', '#{Entity}.Update']),
  schemas: [
    createHolderProps('Id'),
    createHolderProps('OrganizationId'),
    {
      field: \`HeadPic\`,
      label: \`头像\`,
      component: 'Upload',
      componentProps({ formModel, schema }) {
        return {
          value: get(formModel, schema.field),
          ...createOSSUploadFormColProps(1, 10),
        }
      },
      defaultValue: '',
      rules: [createRequireFormRule()],
    },
    {
      field: \`FacePic\`,
      label: \`人脸特征\`,
      component: 'Upload',
      ifShow: ({ model }) => model.Id,
      componentProps({ formModel, schema }) {
        return {
          value: get(formModel, schema.field),
          ...createOSSUploadFormColProps(1, 10, ['jpg', 'png', 'bmp', 'jpeg']),
          async onChange(fileLink) {
            try {
              const { Content } = await UpdateFace({
                Id: formModel.Id,
                OrganizationId: siteStore.getSiteId,
                FacePic: fileLink,
              })
              createMessage.success(Content as any)
            } finally {
              // nothign
            }
          },
        }
      },
      defaultValue: '',
    },
    {
      field: 'DepartmentId',
      label: '班级',
      component: 'ApiSelect',
      defaultValue: '',
      colProps: { span: 12 },
      componentProps: {
        api: ReadStudentDepartment,
        showSearch: true,
        optionFilterProp: 'label',
        resultField: 'Data.Rows',
        labelField: 'Name',
        valueField: 'Id',
      },
      rules: [createRequireFormRule()],
    },
    {
      field: \`Code\`,
      label: \`学号\`,
      colProps: { span: 12 },
      component: \`Input\`,
      componentProps({ formModel }) {
        return {
          addonAfter: formModel.Id
            ? undefined
            : h(
                'span',
                {
                  style: 'cursor: pointer',
                  async onClick() {
                    const { DepartmentId } = formModel
                    if (!DepartmentId) {
                      createMessage.warn('请先选择班级')
                      return
                    }
                    const {
                      Data: { Code },
                    } = await ReadStudentCode(DepartmentId)
                    if (Code) {
                      formModel.Code = Code
                    } else {
                      createMessage.warn('获取学生学号失败')
                    }
                  },
                },
                '自动生成',
              ),
        }
      },
      defaultValue: '',
      rules: [createRequireFormRule()],
    },
    {
      field: \`Name\`,
      label: \`姓名\`,
      component: \`Input\`,
      componentProps: {},
      defaultValue: '',
      colProps: { span: 12 },
      rules: [createRequireFormRule()],
    },
    {
      field: \`PinYin\`,
      label: \`姓名发音\`,
      component: \`Input\`,
      componentProps: {
        placeholder: '避免同音字发音错误，如王乐(yue)，请填写：王悦(yue)',
      },
      defaultValue: '',
      helpMessage: '避免同音字发音错误，如王乐(yue)，请填写：王悦(yue)',
      colProps: { span: 12 },
    },
    {
      field: \`Sex\`,
      label: \`性别\`,
      component: \`ApiSelect\`,
      colProps: { span: 8 },
      componentProps: {
        api: () => ReadEnum('SexEnum'),
        showSearch: true,
        optionFilterProp: 'label',
        resultField: 'Data',
        labelField: 'Name',
        valueField: 'Id',
      },
      defaultValue: '',
      rules: [createRequireFormRule()],
    },
    {
      field: \`IdCard\`,
      label: \`身份证号\`,
      component: \`Input\`,
      componentProps: {},
      defaultValue: '',
      colProps: { span: 16 },
    },
    {
      field: \`Birthday\`,
      label: \`生日\`,
      component: 'DatePicker',
      defaultValue: '',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        style: {
          width: '100%',
        },
      },
    },
    {
      field: \`Phone\`,
      label: \`手机号\`,
      component: \`Input\`,
      componentProps: {},
      defaultValue: '',
      colProps: { span: 12 },
      rules: [createRequireFormRule()],
    },
    {
      field: \`Phone2\`,
      label: \`手机号2\`,
      component: \`Input\`,
      componentProps: {},
      defaultValue: '',
      colProps: { span: 12 },
    },
    {
      field: \`Address\`,
      label: \`家庭地址\`,
      component: \`Input\`,
      componentProps: {},
      defaultValue: '',
    },
    {
      field: \`Remark\`,
      label: \`备注\`,
      component: \`Input\`,
      componentProps: {},
      defaultValue: '',
    },
    createHolderProps('IsGuard', false),
    createHolderProps('IsManager', false),
    createHolderProps('FacePic', ''),
    createHolderProps('IsTeacher', false),
    createHolderProps('ArticleCheck', false),
    createHolderProps('ArticleAudit', false),
    createHolderProps('AttendanceManager', false),
    createHolderProps('PushAudit', false),
    createHolderProps('EntityTime', ''),
  ],
}`
