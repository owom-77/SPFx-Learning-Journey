import * as React from 'react';
import type { IHomeProps } from './IHomeProps';
import PasswordGenerator from '../../../code/views/components/Password';
// import Form from '../../../code/views/components/Form';

export default class Home extends React.Component<IHomeProps> {
  public render(): React.ReactElement<IHomeProps> {

    // const {sp,listName} = this.props;

    return (
      <>
        <PasswordGenerator />
        {/* <Form sp={sp} listName = {listName}/> */}
      </>
    );
  }
}
