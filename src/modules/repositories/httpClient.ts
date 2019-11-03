import { default as axios, AxiosResponse, AxiosError } from 'axios'

export class AxiosClient {
  public basedUrl: string
  public token?: string

  private readonly axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.token ? `Bearer ${this.token}` : ''
    }
  })

  public constructor({ url, token }: { url: string; token?: string }) {
    this.basedUrl = url
    this.token = token
  }

  public async get<T = any>(params: object = {}, id?: string): Promise<AxiosResponse<T>> {
    const url = id === undefined ? this.basedUrl : `${this.basedUrl}/${id}`
    return this.axiosInstance.get(url, { params })
  }

  public async post<T = any>(params: object): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(this.basedUrl, params)
  }

  public async put<T = any>(params: object, id: string): Promise<AxiosResponse<T>> {
    const url = `${this.basedUrl}/${id}`
    return this.axiosInstance.put(url, params)
  }

  public async patch<T = any>(params: object, id: string): Promise<AxiosResponse<T>> {
    const url = `${this.basedUrl}/${id}`
    return this.axiosInstance.patch(url, params)
  }

  public async delete<T = any>(id: string): Promise<AxiosResponse<T>> {
    const url = `${this.basedUrl}/${id}`
    return this.axiosInstance.delete(url)
  }
}

interface ErrorResponse {
  message: string
  type: string
}

export class HttpError extends Error {
  private readonly axiosError: AxiosError
  public readonly type?: string

  constructor(error: AxiosError) {
    super(error.message)
    this.name = new.target.name
    this.axiosError = error
    Object.setPrototypeOf(this, new.target.prototype)

    if (this.axiosError.response) {
      const { message, type } = this.axiosError.response.data.error as ErrorResponse
      this.message = message
      this.type = type
    } else {
      this.message = 'アプリケーションエラーが発生しました'
    }
  }
}
