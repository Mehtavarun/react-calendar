import React, { PureComponent } from 'react';
import { months } from '../data/months.json';

class CalendarBody extends PureComponent {
  getDays = () => {
    const { activeMonth, activeYear } = this.props;
    if (activeYear % 4 === 0 && activeMonth === 1) {
      if (activeYear % 100 === 0) {
        if (activeYear % 400 === 0) {
          return 29;
        }
        return 28;
      }
      return 29;
    } else {
      return months[activeMonth].days;
    }
  };

  render() {
    return (
      <div className="calendarBody">
        <div className="daysHeading">
          <ul className="daysList">
            <li className="weekendDaysName">Sun</li>
            <li className="weekDaysName">Mon</li>
            <li className="weekDaysName">Tue</li>
            <li className="weekDaysName">Wed</li>
            <li className="weekDaysName">Thur</li>
            <li className="weekDaysName">Fri</li>
            <li className="weekendDaysName">Sat</li>
          </ul>
        </div>
        <div className="dates">
          {Array.apply(null, {
            length: this.getDays()
          }).map((Number, date) => {
            return (
              <button className="date" key={date}>
                {date + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CalendarBody;
