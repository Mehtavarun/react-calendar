import React, { PureComponent } from 'react';
import { months } from '../data/months.json';
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

const weekdays = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];

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
      const baseYear = 1970;
      return Array.apply(null, {
        length: 40
      }).map((Number, year) => {
        const value = year + baseYear;
        return this.getDisplayBtn(value, value);
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
    updateCalendarState('listType', listType !== 0 ? listType - 1 : listType);
  };

  getDisplayBtn = (key, value) => {
    return (
      <Grid.Column
        onClick={() => this.datePeriodClicked(key)}
        size="medium"
        key={key}
      >
        {value}
      </Grid.Column>
    );
  };

  render() {
    const { listType } = this.props;
    return (
      <div className="calendarBody">
        {listType === 0 && (
          <Grid columns={7}>
            {weekdays.map((day, i) => {
              return <Grid.Column key={i}>{day}</Grid.Column>;
            })}
          </Grid>
        )}
        <Grid columns={listType === 0 ? 7 : 4}>{this.getList()}</Grid>
      </div>
    );
  }
}

export default CalendarBody;
