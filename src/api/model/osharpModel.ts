export interface OSharpResponse {
  Type: number
  Content: string | null
  Data: any
}

export interface OSharpPageResponse {
  Rows: Array<any>
  Total: number
}

export interface OSharpListPageResponse extends OSharpResponse {
  Data: OSharpPageResponse
}
