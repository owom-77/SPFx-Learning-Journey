import * as React from 'react';
import { IHelloWorldProps } from './IHelloWorldProps';
import CURDReact from './CRUDReact';

const HelloWorld: React.FC<IHelloWorldProps> = (props) => {
  return (
    <div>
      <CURDReact {...props} />
    </div>
  );
};

export default HelloWorld;
