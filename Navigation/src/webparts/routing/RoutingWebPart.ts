import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'RoutingWebPartStrings';
import Routing from './components/Routing';
import { IRoutingProps } from './components/IRoutingProps';

import { spfi, SPFI, SPFx } from '@pnp/sp';

export interface IRoutingWebPartProps {
  description: string;
}

export default class RoutingWebPart extends BaseClientSideWebPart<IRoutingWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _sp: SPFI;

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._sp = spfi().using(SPFx(this.context));
    this._environmentMessage = await this._getEnvironmentMessage();
  }

  public render(): void {
    const idsToHide = [
      'spCommandBar',
      'spSiteHeader',
      'SuiteNavWrapper',
      'spTopPlaceholder',
      'spLeftNav',
      'sp-appBar'
    ];
    idsToHide.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
      }
    });

    // Resize page content area
    const pageContent = document.getElementById('workbenchPageContent') || document.getElementById('spPageContent');
    if (pageContent) {
      pageContent.style.maxWidth = '100vw';
      pageContent.style.width = '100vw';
      pageContent.style.margin = '0';
      pageContent.style.padding = '0';
    }

    // Set your web part container to full screen
    this.domElement.style.width = '1360px';
    this.domElement.style.height = '100%';
    this.domElement.style.margin = '0';
    this.domElement.style.padding = '0';
    this.domElement.style.overflow = 'hidden';

    // Also reset body and html height/margin/padding to avoid scrollbars
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';

    // Now render your Routing component as usual
    const element: React.ReactElement<IRoutingProps> = React.createElement(Routing, {
      description: this.properties.description,
      isDarkTheme: this._isDarkTheme,
      environmentMessage: this._environmentMessage,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      userDisplayName: this.context.pageContext.user.displayName,
      sp: this._sp,
      listName: "E-commerce_UserData",
      orderListName: "E-commerce_Orders"
    });

    ReactDom.render(element, this.domElement);
  }


  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams':
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }
          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;

    this._isDarkTheme = !!currentTheme.isInverted;

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
