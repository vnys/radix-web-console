import { connect } from 'react-redux';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import AppListItem from '../app-list-item';
import EmptyState from '../empty-state';
import ResourceLoading from '../resource-loading';

import { getApplications } from '../../state/applications';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import applicationSummaryModel from '../../models/application-summary';
import routes from '../../routes';

import './style.css';

const appSorter = (a, b) => a.name.localeCompare(b.name);

const LoadingItem = () => {
  return <AppListItem app={{ isPlaceHolder: true }} />;
};

const loadingState = (
  <React.Fragment>
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
  </React.Fragment>
);

export class AppList extends React.Component {
  componentDidMount() {
    this.props.subscribeApplications();
  }

  componentWillUnmount() {
    this.props.unsubscribeApplications();
  }

  render() {
    const { apps } = this.props;

    const appsRender = apps
      .sort(appSorter)
      .map(app => <AppListItem app={app} key={app.name} />);

    // show a 'no applications yet' state if we have no apps,
    // if we have apps, show them
    const content = !apps.length ? (
      <article className="app-list">
        <EmptyState
          ctaText="Create application"
          ctaTo={routes.appCreate}
          icon={<FontAwesomeIcon icon={faPlusCircle} size="5x" />}
          title="No applications yet"
        >
          Applications that you create (or have access to) appear here
        </EmptyState>
      </article>
    ) : (
      appsRender
    );

    // setup a add new button if we have other applications
    const addNew = apps.length ? (
      <Link className="app-list__add-new" to={routes.appCreate}>
        <div className="app-list__add-new-icon">
          <FontAwesomeIcon icon={faPlusCircle} size="4x" />
        </div>
        <span>Create application</span>
      </Link>
    ) : null;

    return (
      <article className="app-list">
        <div className="app-list__list">
          <ResourceLoading resource="APPS" loadingState={loadingState}>
            {addNew}
            {content}
          </ResourceLoading>
        </div>
      </article>
    );
  }
}

AppList.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.shape(applicationSummaryModel)).isRequired,
  subscribeApplications: PropTypes.func.isRequired,
  unsubscribeApplications: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  subscribeApplications: () =>
    dispatch(subscriptionActions.subscribeApplications()),
  unsubscribeApplications: () =>
    dispatch(subscriptionActions.unsubscribeApplications()),
});

const mapStateToProps = state => ({
  apps: getApplications(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList);
