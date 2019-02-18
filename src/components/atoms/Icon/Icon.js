import React from 'react';
import icons from '../../../assets/icons.svg';
import './Icon.scss';

const Icon = props => {
  const { className = '', inverse = false, name, size = '' } = props;
  const src = `${icons}#${name}`;

  let iconClass = `Icon fa fa-${name}`;

  if (inverse) {
    iconClass += 'fa-inverse';
  }

  if (size === 'xs') {
    iconClass += ' fa-xs';
  } else if (size === 'sm') {
    iconClass += ' fa-sm';
  } else if (size === 'lg') {
    iconClass += ' fa-lg';
  } else if (size.match(/[0-9]/)) {
    iconClass += ` fa-${size}x`;
  }

  if (className !== '') {
    iconClass += ` ${className}`;
  }

  return (
    <svg className={iconClass}>
      <use xlinkHref={src} />
    </svg>
  );
};

export default Icon;
