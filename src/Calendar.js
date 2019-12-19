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
    let listYear = activeYear;
    const { startYear = 2000, lastYear = 2019 } = props;
    if (listYear - 19 <= startYear) {
      listYear = startYear + 9;
    }
    if (listYear + 19 >= lastYear) {
      listYear = lastYear - 10;
    }
    this.state = {
      activeMonth,
      activeYear,
      startYear,
      lastYear,
      listYear,
      listType: 2
    };
  }

  updateCalendarState = (key, value) =>
    this.setState({
      [key]: value
    });

  render() {
    const {
      activeMonth,
      activeYear,
      listType,
      lastYear,
      startYear,
      listYear
    } = this.state;
    return (
      <div style={{ marginTop: '10px' }}>
        <CalendarHead
          activeMonth={activeMonth}
          updateCalendarState={this.updateCalendarState}
          listType={listType}
          activeYear={activeYear}
          lastYear={lastYear}
          listYear={listYear}
          startYear={startYear}
        />
        <CalendarBody
          updateCalendarState={this.updateCalendarState}
          activeMonth={activeMonth}
          activeYear={activeYear}
          listType={listType}
          lastYear={lastYear}
          listYear={listYear}
        />
      </div>
    );
  }
}

export default Calendar;
