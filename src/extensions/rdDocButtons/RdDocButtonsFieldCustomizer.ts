import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Log } from '@microsoft/sp-core-library'
import {
  BaseFieldCustomizer,
  type IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility'

import { IRdDocButtonsProps } from './components/RdDocButtons'
import { spfi, SPFI, SPFx } from '@pnp/sp'
import { ThemeProvider, ITheme } from '@microsoft/sp-component-base'
import { LogLevel, PnPLogging } from '@pnp/logging'
import ThemeProviderWrapper from './components/ThemeProviderWrapper'

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IRdDocButtonsFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'RdDocButtonsFieldCustomizer';

export default class RdDocButtonsFieldCustomizer
  extends BaseFieldCustomizer<IRdDocButtonsFieldCustomizerProperties> {
    private _sp: SPFI
    private _theme: ITheme | undefined
    private _themeProvider: ThemeProvider

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated RdDocButtonsFieldCustomizer with properties:')
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2))
    
    this._sp = spfi().using(SPFx(this.context)).using(PnPLogging(LogLevel.Warning))
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey)
    this._theme = this._themeProvider.tryGetTheme()

    return Promise.resolve()
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.

    const themeProviderWrapper: React.ReactElement<IRdDocButtonsProps> =
      React.createElement(ThemeProviderWrapper, {
        context: this.context,
        theme: this._theme,
        sp: this._sp,
        item: event.listItem
      } as IRdDocButtonsProps)

    ReactDOM.render(themeProviderWrapper, event.domElement)
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement)
    super.onDisposeCell(event)
  }
}
