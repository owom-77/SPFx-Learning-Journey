import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { spfi, SPFx, SPFI } from "@pnp/sp";
import HelloWorld from './components/HelloWorld';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import './components/index.css';

export interface IHelloWorldWebPartProps {}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  private _sp: SPFI; 

  public onInit(): Promise<void> {
    this._sp = spfi().using(SPFx(this.context));
    return Promise.resolve();
  }

  public render(): void {
    const element = React.createElement(HelloWorld, {
      sp: this._sp,
      listName: "EmployeeDetails"
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
