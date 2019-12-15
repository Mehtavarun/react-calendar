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

  getList = () => {
    const { listType } = this.props;
    if (listType === 0) {
      return Array.apply(null, {
        length: this.getDays()
      }).map((Number, date) => {
        return this.getDisplayBtn(date, date + 1);
      });
    } else if (listType === 1) {
      return months.map((month, i) => {
        return this.getDisplayBtn(i, month.fullName);
      });
    } else {
      return Array.apply(null, {
        length: 100
      }).map((Number, year) => {
        return this.getDisplayBtn(year, year + 1970);
      });
    }
  };

  datePeriodClicked = value => {
    const { listType, updateCalendarState } = this.props;
    let key = '';
    if (listType === 1) {
      key = 'activeMonth';
    } else if (listType === 2) {
      key = 'activeYear';
    }
    updateCalendarState(key, value);
  };

  getDisplayBtn = (key, value) => {
    return (
      <button
        className="date"
        key={key}
        onClick={() => this.datePeriodClicked(key)}
      >
        {value}
      </button>
    );
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
        <div className="dates">{this.getList()}</div>
      </div>
    );
  }
}

export default CalendarBody;
