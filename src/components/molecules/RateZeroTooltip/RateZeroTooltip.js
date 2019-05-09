import React from 'react';
import { Tooltip } from 'reactstrap';

export const RateZeroTooltip = ({ bookId, isOpen, toggleTooltip }) => (
  <Tooltip isOpen={isOpen} placement="top" target={`zero_${bookId}`} toggle={toggleTooltip}>
    Want to rate this garbage a 0?
  </Tooltip>
);

export default RateZeroTooltip;
