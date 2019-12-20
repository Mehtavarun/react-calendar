import React, { PureComponent } from 'react';
import CalendarHead from './components/CalendarHead';
import CalendarBody from './components/CalendarBody';
import './Calendar.css';

class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    const date = new Date();
    const activeYear = date.getFullYear();
    const activeMonth = date.getMonth();
    const listYear = activeYear;
    this.state = {
      activeMonth,
      activeYear,
      listYear,
      listType: 2
    };
  }

  updateCalendarState = (key, value) =>
    this.setState({
      [key]: value
    });

  render() {
    const { activeMonth, activeYear, listType, listYear } = this.state;
    return (
      <div style={{ marginTop: '10px' }}>
        <CalendarHead
          activeMonth={activeMonth}
          updateCalendarState={this.updateCalendarState}
          listType={listType}
          activeYear={activeYear}
          listYear={listYear}
        />
        <CalendarBody
          updateCalendarState={this.updateCalendarState}
          activeMonth={activeMonth}
          activeYear={activeYear}
          listType={listType}
          listYear={listYear}
        />
      </div>
    );
  }
}

export default Calendar;
