export interface GetConfigArgs<T> extends Record<string, T> {
  dev: T
  prod: T
}

export const getAppConfig = <T>(args: GetConfigArgs<T>): T => {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV
  if (!appEnv) {
    throw new Error('NEXT_PUBLIC_APP_ENV is not set')
  }

  const config = args[appEnv]
  if (!config) {
    throw new Error(`No config for app env: ${appEnv}`)
  }
  return config
}
