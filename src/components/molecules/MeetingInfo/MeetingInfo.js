import React, { useContext } from 'react';
import { format } from 'date-fns';

import { SiteSettingsContext } from '../../../providers/SiteSettingsProvider';
import './MeetingInfo.scss';

const MeetingInfo = () => {
  const siteSettings = useContext(SiteSettingsContext);

  let meetingTime;

  if (siteSettings.length > 0) {
    let timestamp = siteSettings[0]['datetime-meeting'];

    meetingTime = format(timestamp.toMillis(), 'M/D @ ha');
  }

  return meetingTime ? <div className="MeetingInfo">Next Meeting: {meetingTime}</div> : null;
};

export default MeetingInfo;
