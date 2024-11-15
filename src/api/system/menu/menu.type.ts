import {ResponseError} from '@/types/response'
import {DateTimeInterface} from "@/types/type";

export interface MenuInterface {
  id: number,
  type: string,
  title: string,
  web_path: string | null,
  http_path: string | null,
  icon: string | null,
  permission: string | null,
  order_position: number,
  status: boolean,
  created: DateTimeInterface,
  updated: DateTimeInterface,
  deleted: DateTimeInterface | [],
}

export interface MenuAllResponse {
  status: boolean,
  data?: MenuInterface[] | [],
  error?: ResponseError
}
