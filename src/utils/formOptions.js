import React from 'react';
import { format } from 'date-fns';

export const members = memberList => {
  let defaultOption = {
    id: '',
    nameFirst: '',
  };
  let groupPick = memberList.find(member => member.groupPick === true);

  let members = memberList
    .filter(member => !member.groupPick)
    .sort((a, b) => {
      if (a.nameFirst > b.nameFirst) {
        return 1;
      } else if (a.nameFirst < b.nameFirst) {
        return -1;
      }

      return 0;
    });

  members.unshift(defaultOption);

  if (groupPick) {
    members.push(groupPick);
  }

  return members.map(member => (
    <option key={member.id} value={member.id}>
      {member.nameFirst}
    </option>
  ));
};

export const months = new Array(12)
  .fill('')
  .map((el, i) => format(new Date(2019, i, 1), 'MMMM'))
  .map(month => (
    <option key={month} value={month}>
      {month}
    </option>
  ));

export const years = new Array(new Date().getFullYear() - (2013 - 1))
  .fill(0)
  .map((el, i) => i + 2013)
  .reverse()
  .map(year => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
