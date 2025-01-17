import applicationCost from '../../models/application-cost';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { formatDateTimeYear } from '../../utils/datetime';
import { Typography } from '@equinor/eds-core-react';

export const CostEstimateContent = ({ applicationCost }) => {
  if (!applicationCost) {
    return <Typography variant="caption">No data</Typography>;
  }

  function getPeriod() {
    var today = moment();
    var nextMonth = moment(today).add(30, 'days');
    return `${formatDateTimeYear(today.toDate())}
    - ${formatDateTimeYear(nextMonth.toDate())}`;
  }

  function getCostEstimate(applicationCost) {
    if (applicationCost === null) return 'No Data';
    return applicationCost.cost.length !== 0 && !isNaN(applicationCost.cost)
      ? applicationCost.cost.toFixed() + ' ' + applicationCost.currency
      : 'No data';
  }

  return (
    <>
      <div className="grid grid--gap-small">
        <Typography variant="overline">Period</Typography>
        <Typography group="input" variant="text">
          {getPeriod()}
        </Typography>
      </div>
      <div className="grid grid--gap-small">
        <Typography variant="overline">Cost</Typography>
        <Typography group="input" variant="text">
          {getCostEstimate(applicationCost)}
        </Typography>
      </div>
    </>
  );
};

CostEstimateContent.propTypes = {
  applicationCost: PropTypes.shape(applicationCost),
};
