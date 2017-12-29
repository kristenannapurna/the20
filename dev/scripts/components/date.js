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



const DateHeader = ({ resetDay, mealsTracked }) => {
  const mealsDots = () => {
    let markup = [];
    for(let i = 0; i <= mealsTracked; i++){
      markup.push(<span key={i}>🔵</span>)
    }
    return markup;
  }
  return (
    <header>
      <p>Happy {days[dd]}! Today is day {dd - resetDay} of 7.</p>
      <div>
        <p>Meals Tracked: {mealsDots()} </p>
      </div>
    </header>
  )
}

export default DateHeader;