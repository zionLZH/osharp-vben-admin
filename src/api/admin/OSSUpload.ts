import { defHttp } from '../../utils/http/axios'

export function GetUploadKey(): Promise<{ Data }> {
  return defHttp.post({
    url: 'get upload key',
    params: {},
  })
}

export async function PathToOSS(files) {
  const { Data: UploadKey } = await GetUploadKey()
  console.log(UploadKey)
  return await defHttp.post(
    {
      url: `get key`,
      data: files,
    },
    {
      apiUrl: '',
      joinPrefix: false,
      withToken: false,
    },
  )
}

export async function OSSUpload(file) {
  // const { Data: UploadKey } = await GetUploadKey()
  const formData = new FormData()
  formData.append('file', file, file.name)
  const { Data } = await defHttp.post(
    {
      url: 'oss upload',
      data: formData,
    },
    {
      apiUrl: '',
      joinPrefix: false,
      withToken: false,
    },
  )
  const [{ FilePath, FileSize, FileType, Name }] = Data
  return {
    FilePath,
    FileSize,
    FileType,
    Name,
  }
}

export async function UploadFiles(file) {
  const formData = new FormData()
  formData.append('file', file, file.name)
  const { Data } = await defHttp.post(
    {
      url: '/api/UploadFiles',
      data: formData,
    },
    {
      apiUrl: '',
      joinPrefix: false,
      withToken: false,
    },
  )
  const [{ FilePath, FileSize, FileType, Name }] = Data
  return {
    FilePath,
    FileSize,
    FileType,
    Name,
  }
}

export function clearHackerFormProp(object) {
  let keys = Object.keys(object)
  keys.forEach((key) => {
    if (key.indexOf('_') === 0) {
      delete object[key]
    }
  })
  return object
}
