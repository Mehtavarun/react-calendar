import React, { PureComponent } from 'react';
import { months, startYear } from '../data/months.json';

class CalendarHead extends PureComponent {
  constructor(props) {
    super(props);
    const { activeMonth, activeYear, listType } = props;
    this.state = {
      activeDatePeriodValue: months[activeMonth].fullName,
      activeMonth,
      activeYear,
      listType,
      disabledBackArrow: false,
      disabledNextArrow: false,
      nextYears: new Date().getFullYear() + 5
    };
  }

  componentDidMount() {
    const { activeMonth, activeYear } = this.state;
    if (activeMonth === months[0] && activeYear === startYear) {
      this.setState({
        disabledBackArrow: true
      });
    }
  }

  arrowClicked = isBackArrow => {
    let { activeMonth, activeYear, listType, nextYears } = this.state;
    let year = activeYear;
    let month = activeMonth;
    const disabledNextArrow = this.isNextArrowDisabled();
    const disabledBackArrow = this.isBackArrowDisabled();
    console.log(listType);
    if (isBackArrow) {
      if (disabledBackArrow) {
      } else if (listType === 0) {
        if (activeMonth === 0) {
          month = 11;
          year -= 1;
        } else {
          month -= 1;
        }
      } else if (listType === 1) {
        if (year !== startYear) {
          year -= 1;
        }
      }
    } else {
      if (disabledNextArrow) {
      } else if (listType === 0) {
        if (activeMonth === 11) {
          month = 0;
          year += 1;
        } else {
          month += 1;
        }
      } else if (listType === 1) {
        if (year !== nextYears) {
          year += 1;
        }
      }
    }
    this.setState(
      {
        activeMonth: month,
        activeYear: year,
        activeDatePeriodValue: listType === 0 ? months[month].fullName : year
      },
      () => this.updateArrows()
    );
    if (!disabledNextArrow || !disabledBackArrow) {
      this.props.updateCalendarState('activeMonth', month);
      this.props.updateCalendarState('activeYear', year);
    }
  };

  isBackArrowDisabled = () => {
    let { activeMonth, activeYear, listType } = this.state;
    let year = activeYear;
    let month = activeMonth;
    let disabledBackArrow = false;
    if (
      (listType === 1 && year === startYear) ||
      (listType === 2 && year === startYear && month === 0)
    ) {
      disabledBackArrow = true;
    } else {
      disabledBackArrow = false;
    }
    return disabledBackArrow;
  };

  isNextArrowDisabled = () => {
    let { activeMonth, activeYear, listType, nextYears } = this.state;
    let year = activeYear;
    let month = activeMonth;
    let disabledNextArrow = false;
    if (
      (listType === 2 && year === nextYears) ||
      (listType === 1 && year === nextYears && month === 11)
    ) {
      disabledNextArrow = true;
    } else {
      disabledNextArrow = false;
    }
    return disabledNextArrow;
  };

  datePeriodClicked = () => {
    const { listType, activeYear, activeMonth } = this.state;
    let periodValue = activeYear;
    let type = listType > 1 ? listType % 2 : listType + 1;
    if (type === 0) {
      periodValue = months[activeMonth].fullName;
    }
    this.setState(
      {
        activeDatePeriodValue: periodValue,
        listType: type
      },
      () => this.updateArrows()
    );
  };

  updateArrows = () => {
    this.setState({
      disabledNextArrow: this.isNextArrowDisabled(),
      disabledBackArrow: this.isBackArrowDisabled()
    });
  };

  render() {
    const {
      activeDatePeriodValue,
      disabledBackArrow,
      disabledNextArrow
    } = this.state;
    return (
      <div className="calendarHead">
        <button
          id="backArrowBtn"
          className=""
          onClick={() => this.arrowClicked(true)}
          disabled={disabledBackArrow}
        >
          {'<'}
        </button>
        <button id="datePeriodButton" onClick={this.datePeriodClicked}>
          {activeDatePeriodValue}
        </button>
        <button
          id="nextArrowBtn"
          className=""
          onClick={() => this.arrowClicked(false)}
          disabled={disabledNextArrow}
        >
          {'>'}
        </button>
      </div>
    );
  }
}

export default CalendarHead;
