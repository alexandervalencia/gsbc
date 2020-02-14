import React, { useContext } from 'react';
import { format } from 'date-fns';

import { SiteSettingsContext } from '../../../providers/SiteSettingsProvider';
import './MeetingInfo.scss';

const MeetingInfo = () => {
  const siteSettings = useContext(SiteSettingsContext);

  let meetingTime;

  if (siteSettings.length > 0) {
    const timestamp = siteSettings[0].datetimeMeeting.toMillis();

    meetingTime = format(timestamp, 'M/D @ ha');
  }

  return meetingTime ? <div className="MeetingInfo">Next Meeting: {meetingTime}</div> : null;
};

export default MeetingInfo;
