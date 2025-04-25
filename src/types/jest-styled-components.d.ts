/* eslint-disable no-unused-vars */
// Types provided from the official repo:
// https://github.com/styled-components/jest-styled-components/blob/master/typings/index.d.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from 'styled-components';

// eslint-disable-next-line import/no-extraneous-dependencies
import { NewPlugin } from 'pretty-format';

declare global {
  namespace jest {
    interface AsymmetricMatcher {
      $$typeof: Symbol
      sample?: Array<any> | Function | object | RegExp | string
    }

    interface Matchers<R, T> {
      toHaveStyleRule(property: string, value?: Value, options?: Options): R
    }

    interface Options {
      media?: string
      modifier?: ReturnType<typeof css> | string
      supports?: string
    }

    type Value = AsymmetricMatcher | number | RegExp | string | undefined
  }
}

export interface StyledComponentsSerializerOptions {
  addStyles?: boolean
  classNameFormatter?: (index: number) => string
}

export declare const styleSheetSerializer: {
  setStyleSheetSerializerOptions: (
    options?: StyledComponentsSerializerOptions
  ) => void
} & NewPlugin;
