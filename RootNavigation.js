import * as React from 'react';

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    console.log('idem navigovat');
    navigationRef.current.navigate(name, params);
  } else {
    console.log('nejdem navigovat');
  }
}
