import pino from 'pino'
import pretty from 'pino-pretty'
import moment from 'moment'

interface JsonSend {
  status: Boolean
  statusCode: Number
  message: String
  data: any
}
const logger = pino(
  {
    base: { pid: false },
    timestamp: () => `,"time": "${moment().format()}"`
  },
  pretty()
)

export const statusOK = (message: string, data: any): JsonSend => {
  return {
    status: true,
    statusCode: 200,
    message,
    data
  }
}

export const success = (message: string, data: any): JsonSend => {
  return {
    status: true,
    statusCode: 201,
    message,
    data
  }
}

export const notFound = (message: string, data: any): JsonSend => {
  return {
    status: false,
    statusCode: 404,
    message,
    data
  }
}
export const unprocessable = (message: string, data: any): JsonSend => {
  return {
    status: false,
    statusCode: 422,
    message,
    data
  }
}
export default logger
