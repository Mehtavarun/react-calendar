import React, { PureComponent } from 'react';
import CalendarHead from './components/CalendarHead';
import CalendarBody from './components/CalendarBody';
import './Calendar.css';

class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      activeMonth: date.getMonth(),
      activeYear: date.getFullYear(),
      listType: 2,
      nextYears: new Date().getFullYear() + 5
    };
  }

  updateCalendarState = (key, value) =>
    this.setState({
      [key]: value
    });

  render() {
    const { activeMonth, activeYear, listType, nextYears } = this.state;
    return (
      <div style={{ marginTop: '10px' }}>
        <CalendarHead
          activeMonth={activeMonth}
          updateCalendarState={this.updateCalendarState}
          listType={listType}
          activeYear={activeYear}
          nextYears={nextYears}
        />
        <CalendarBody
          updateCalendarState={this.updateCalendarState}
          activeMonth={activeMonth}
          activeYear={activeYear}
          listType={listType}
          nextYears={nextYears}
        />
      </div>
    );
  }
}

export default Calendar;
