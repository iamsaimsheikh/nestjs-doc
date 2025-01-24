import { Injectable, LoggerService } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class MyLogger implements LoggerService {
  @Cron('1 * * * *')
  autoClearConsole() {
    console.clear()
    console.log('[CRON]: Console cleared')
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(`[LOG]: ${message}`, ...optionalParams)
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(`[FATAL]: ${message}`, ...optionalParams)
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(`[ERROR]: ${message}`, ...optionalParams)
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(`[WARN]: ${message}`, ...optionalParams)
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(`[DEBUG]: ${message}`, ...optionalParams)
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(`[VERBOSE]: ${message}`, ...optionalParams)
  }
}
