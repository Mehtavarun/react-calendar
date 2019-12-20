import React, { PureComponent } from 'react';
import { months } from '../data/months.json';
import 'semantic-ui-css/semantic.min.css';
import { Button, Grid } from 'semantic-ui-react';

class CalendarHead extends PureComponent {
  constructor(props) {
    super(props);
    const { activeMonth } = props;
    this.state = {
      activeDatePeriodValue: months[activeMonth].fullName
    };
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

  arrowClicked = isBackArrow => {
    let { activeMonth, activeYear, listType, listYear } = this.props;
    let year = activeYear;
    let yearForList = listYear;
    let month = activeMonth;
    if (isBackArrow) {
      if (listType === 0) {
        if (activeMonth === 0) {
          month = 11;
          year -= 1;
        } else {
          month -= 1;
        }
      } else if (listType === 1) {
        year -= 1;
        yearForList -= 1;
      } else {
        yearForList -= 19;
      }
    } else {
      if (listType === 0) {
        if (activeMonth === 11) {
          month = 0;
          year += 1;
        } else {
          month += 1;
        }
      } else if (listType === 1) {
        year += 1;
        yearForList += 1;
      } else {
        yearForList += 19;
      }
    }
    this.setState({
      activeDatePeriodValue: listType === 0 ? months[month].fullName : year
    });
    this.props.updateCalendarState('activeMonth', month);
    this.props.updateCalendarState('activeYear', year);
    this.props.updateCalendarState('listYear', yearForList);
  };

  datePeriodClicked = () => {
    const { listType, activeYear, activeMonth } = this.props;
    let periodValue = activeYear;
    let type = listType > 1 ? 1 : listType + 1;
    if (type === 0) {
      periodValue = months[activeMonth].fullName;
    }
    this.setState({
      activeDatePeriodValue: periodValue
    });
    this.props.updateCalendarState('listType', type);
  };

  render() {
    const { activeDatePeriodValue } = this.state;
    return (
      <Grid centered>
        <Grid.Column width={4}>
          <Button
            onClick={() => this.arrowClicked(true)}
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
