import React, { PureComponent } from 'react';
import { months } from '../data/months.json';
import 'semantic-ui-css/semantic.min.css';
import { Button, Grid } from 'semantic-ui-react';

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
    const {
      activeMonth,
      activeYear,
      startYear,
      lastYear,
      listYear
    } = this.props;
    if (
      (activeMonth === months[0] && activeYear === startYear) ||
      listYear - 9 <= startYear
    ) {
      this.setState({
        disabledBackArrow: true
      });
    }
    if (
      (activeMonth === months[11] && activeYear === lastYear) ||
      listYear + 10 >= lastYear
    ) {
      this.setState({
        disabledNextArrow: true
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
    this.updateArrows();
  }

  arrowClicked = isBackArrow => {
    let {
      activeMonth,
      activeYear,
      listType,
      lastYear,
      startYear,
      listYear
    } = this.props;
    let year = activeYear;
    let yearForList = listYear;
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
      } else {
        yearForList -= 19;
        if (yearForList <= startYear) {
          yearForList = startYear + 9;
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
        if (year !== lastYear) {
          year += 1;
        }
      } else {
        yearForList += 19;
        if (yearForList >= lastYear) {
          yearForList = lastYear - 10;
        }
      }
    }
    this.setState({
      activeDatePeriodValue: listType === 0 ? months[month].fullName : year
    });
    if (!disabledNextArrow || !disabledBackArrow) {
      this.props.updateCalendarState('activeMonth', month);
      this.props.updateCalendarState('activeYear', year);
      this.props.updateCalendarState('listYear', yearForList);
    }
  };

  isBackArrowDisabled = () => {
    let { activeMonth, activeYear, listType, startYear, listYear } = this.props;
    let year = activeYear;
    let month = activeMonth;
    let disabledBackArrow = false;
    if (
      (listType === 1 && year === startYear) ||
      (listType === 0 && year === startYear && month === 0) ||
      listYear - 9 <= startYear
    ) {
      disabledBackArrow = true;
    } else {
      disabledBackArrow = false;
    }
    return disabledBackArrow;
  };

  isNextArrowDisabled = () => {
    let { activeMonth, activeYear, listType, lastYear, listYear } = this.props;
    let year = activeYear;
    let month = activeMonth;
    let disabledNextArrow = false;
    if (
      (listType === 1 && year === lastYear) ||
      (listType === 0 && year === lastYear && month === 11) ||
      listYear + 10 >= lastYear
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
      <Grid centered>
        <Grid.Column width={4}>
          <Button
            onClick={() => this.arrowClicked(true)}
            disabled={disabledBackArrow}
            icon="left arrow"
            size="medium"
            circular
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Button size="large" onClick={this.datePeriodClicked}>
            {activeDatePeriodValue}
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button
            onClick={() => this.arrowClicked(false)}
            disabled={disabledNextArrow}
            icon="right arrow"
            size="medium"
            circular
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default CalendarHead;
