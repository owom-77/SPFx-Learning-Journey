import * as React from 'react';
import type { IHomeProps } from './IHomeProps';
import MainTodo from '../../../code/views/components/MainTodo';

export default class Home extends React.Component<IHomeProps> {
  public render(): React.ReactElement<IHomeProps> {


    return (
      <>
        <MainTodo />
      </>
    );
  }
}
