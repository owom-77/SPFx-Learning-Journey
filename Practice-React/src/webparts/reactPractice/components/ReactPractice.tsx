import * as React from 'react';
// import styles from './ReactPractice.module.scss';
import type { IReactPracticeProps } from './IReactPracticeProps';
import CRUDReact from './CRUDReact';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class ReactPractice extends React.Component<IReactPracticeProps> {
  public render(): React.ReactElement<IReactPracticeProps> {
    // eslint-disable-next-line no-empty-pattern
    const {
      // description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      // userDisplayName
    } = this.props;

    return (
      <>
        <h1>This website</h1>
        <CRUDReact context={this.props.context} />
      </>
    );
  }
}
