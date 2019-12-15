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
      listType: 0
    };
  }

  updateCalendarState = (key, value) =>
    this.setState({
      [key]: value
    });

  render() {
    const { activeMonth, activeYear, listType } = this.state;
    return (
      <div className="container">
        <CalendarHead
          activeMonth={activeMonth}
          updateCalendarState={this.updateCalendarState}
          listType={listType}
          activeYear={activeYear}
        />
        <CalendarBody activeMonth={activeMonth} activeYear={activeYear} />
      </div>
    );
  }
}

export default Calendar;
