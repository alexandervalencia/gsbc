import React from 'react';
import { format } from 'date-fns';

export const users = userList => {
  let defaultOption = {
    id: '',
    nameFirst: '',
  };
  let groupPick = userList.find(user => user.groupPick === true);

  let users = userList
    .filter(user => !user.groupPick)
    .sort((a, b) => {
      if (a.nameFirst > b.nameFirst) {
        return 1;
      } else if (a.nameFirst < b.nameFirst) {
        return -1;
      }

      return 0;
    });

  users.unshift(defaultOption);

  if (groupPick) {
    users.push(groupPick);
  }

  return users.map(user => (
    <option key={user.id} value={user.id}>
      {user.nameFirst}
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
