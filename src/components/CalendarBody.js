import React, { PureComponent } from 'react';
import { months } from '../data/months.json';
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';
import './calendar.css';

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
    const { listType, activeMonth, activeYear } = this.props;
    const datetime = `${months[activeMonth].fullName} 1, ${activeYear} 00:00:01`;
    const day = new Date(datetime).getDay();
    const days = this.getDays();
    const len = days + day <= 35 ? 35 : 42;
    if (listType === 0) {
      return Array.apply(null, {
        length: len
      }).map((Number, date) => {
        return date >= day && date < days + day
          ? this.getDisplayBtn(date - day - 1, date - day + 1)
          : this.getEmptyDisplayBtn(date - day - 1);
      });
    } else if (listType === 1) {
      return months.map((month, i) => {
        return this.getDisplayBtn(i, month.fullName);
      });
    } else {
      const baseYear = activeYear - 9;
      const endYear = activeYear + 10;
      return Array.apply(null, {
        length: endYear - baseYear + 1
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
    updateCalendarState(
      'listType',
      listType !== 0 ? (listType === 2 ? 1 : 0) : listType
    );
  };

  getDisplayBtn = (key, value) => {
    return (
      <Grid.Column
        onClick={() => this.datePeriodClicked(key)}
        size="medium"
        key={key}
        textAlign="center"
        className="dateValueBtn"
      >
        {value}
      </Grid.Column>
    );
  };

  getEmptyDisplayBtn = key => {
    return <Grid.Column key={key} className="dateValueBtnEmpty" />;
  };

  render() {
    const { listType } = this.props;
    return (
      <div
        style={{
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '5px'
        }}
      >
        {listType === 0 && (
          <Grid
            columns={7}
            textAlign="center"
            style={{ backgroundColor: '#bdbdbd' }}
          >
            {weekdays.map((day, i) => {
              return <Grid.Column key={i}>{day}</Grid.Column>;
            })}
          </Grid>
        )}
        <Grid columns={listType === 0 ? 7 : 4} style={{}}>
          {this.getList()}
        </Grid>
      </div>
    );
  }
}

export default CalendarBody;
