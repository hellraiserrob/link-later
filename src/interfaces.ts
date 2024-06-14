/**
 * interfaces
 */

export interface Config {
  keywords: string,
  href: string,
  selector?: string,
  target?: string,
  classes?: string,
  max?: number,
  debug?: boolean,
  ignore?: string[],
}

export interface Option {
  scope: (string),
  configs: Config[]
}

export default Option