import React, { PureComponent } from 'react';
import { months, startYear } from '../data/months.json';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';

class CalendarHead extends PureComponent {
  constructor(props) {
    super(props);
    const { activeMonth } = props;
    this.state = {
      activeDatePeriodValue: months[activeMonth].fullName,
      disabledBackArrow: false,
      disabledNextArrow: false
    };
  }

  componentDidMount() {
    const { activeMonth, activeYear } = this.props;
    if (activeMonth === months[0] && activeYear === startYear) {
      this.setState({
        disabledBackArrow: true
      });
    }
  }

  /*
    getDerivedStateFromProps because parent state was changing and
    to calculate state change for this component based on parent's state    
  */
  static getDerivedStateFromProps(props) {
    const { listType, activeMonth, activeYear } = props;
    return {
      activeDatePeriodValue:
        listType === 0 ? months[activeMonth].fullName : activeYear
    };
  }

  componentDidUpdate() {
    if (this.props.listType !== 2) {
      this.updateArrows();
    }
  }

  arrowClicked = isBackArrow => {
    let { activeMonth, activeYear, listType, nextYears } = this.props;
    let year = activeYear;
    let month = activeMonth;
    const disabledNextArrow = this.isNextArrowDisabled();
    const disabledBackArrow = this.isBackArrowDisabled();
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
    this.setState({
      activeDatePeriodValue: listType === 0 ? months[month].fullName : year
    });
    if (!disabledNextArrow || !disabledBackArrow) {
      this.props.updateCalendarState('activeMonth', month);
      this.props.updateCalendarState('activeYear', year);
    }
  };

  isBackArrowDisabled = () => {
    let { activeMonth, activeYear, listType } = this.props;
    let year = activeYear;
    let month = activeMonth;
    let disabledBackArrow = false;
    if (
      (listType === 1 && year === startYear) ||
      (listType === 0 && year === startYear && month === 0)
    ) {
      disabledBackArrow = true;
    } else {
      disabledBackArrow = false;
    }
    return disabledBackArrow;
  };

  isNextArrowDisabled = () => {
    let { activeMonth, activeYear, listType, nextYears } = this.props;
    let year = activeYear;
    let month = activeMonth;
    let disabledNextArrow = false;
    if (
      (listType === 1 && year === nextYears) ||
      (listType === 0 && year === nextYears && month === 11)
    ) {
      disabledNextArrow = true;
    } else {
      disabledNextArrow = false;
    }
    return disabledNextArrow;
  };

  datePeriodClicked = () => {
    const { listType, activeYear, activeMonth } = this.props;
    let periodValue = activeYear;
    let type = listType > 1 ? listType % 2 : listType + 1;
    if (type === 0) {
      periodValue = months[activeMonth].fullName;
    } else if (type === 2) {
      this.setState({
        disabledNextArrow: true,
        disabledBackArrow: true
      });
    }
    this.setState({
      activeDatePeriodValue: periodValue
    });
    this.props.updateCalendarState('listType', type);
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
      <div>
        <Button
          onClick={() => this.arrowClicked(true)}
          disabled={disabledBackArrow}
          icon="left arrow"
          size="small"
          circular
        />
        <Button onClick={this.datePeriodClicked}>
          {activeDatePeriodValue}
        </Button>
        <Button
          onClick={() => this.arrowClicked(false)}
          disabled={disabledNextArrow}
          icon="right arrow"
          size="small"
          circular
        />
      </div>
    );
  }
}

export default CalendarHead;
