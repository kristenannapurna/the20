import React from 'react';


const days = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}
const today = new Date();
const dd = today.getDay();

const DateHeader = ({ resetDay }) => {
  return (
    <header>
      <p>Happy {days[dd]}! Today is day {dd - resetDay} of 7.</p>
    </header>
  )
}

export default DateHeader;