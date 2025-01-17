import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { settings } from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React from 'react';

import EventSummary from './event-summary';
import eventModel from '../../models/event';

import './style.css';

export const EventsList = ({ events }) => (
  <Accordion.Item className="accordion elevated" isExpanded>
    <Accordion.Header>
      <Typography variant="h4">Events</Typography>
    </Accordion.Header>
    <Accordion.Panel>
      {events.length > 0 ? (
        <div className="events_table grid grid--table-overflow">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>Date / Time</Table.Cell>
                <Table.Cell>Type</Table.Cell>
                <Table.Cell>Location</Table.Cell>
                <Table.Cell>Description</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {events.map((event, i) => (
                <EventSummary key={i} event={event}></EventSummary>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="stat_empty">
          <span>
            <Icon data={settings} />
          </span>
          <Typography>No events</Typography>
        </div>
      )}
    </Accordion.Panel>
  </Accordion.Item>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape(eventModel)).isRequired,
};

export default EventsList;
