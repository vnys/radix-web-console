import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getCreationState,
  getCreationError,
} from '../../state/application-creation';
import appsActions from '../../state/application-creation/action-creators';
import requestStates from '../../state/state-utils/request-states';

import Alert from '../alert';
import Button from '../button';
import FormField from '../form-field';
import FormFieldChoice from '../form-field-choice';
import FormFieldChoiceOption from '../form-field-choice-option';
import Spinner from '../spinner';

import externalUrls from '../../externalUrls';

const adModeAutoHelp = (
  <span>
    Please note that <strong>everyone who has access to Radix</strong> will be
    able to administer this application
  </span>
);

const adGroupsHelp = (
  <span>
    Group IDs (in Azure Active Directory) allowed to administer the application
    in Radix. Create and manage AD groups with{' '}
    <a href={externalUrls.idweb}>idweb</a>.
  </span>
);

export class CreateApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        adModeAuto: false,
        adGroups: '',
        name: '',
        repository: '',
      },
    };

    this.handleAdModeChange = this.handleAdModeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChanged() {
    // if there is an creation error then we will send a reset create to clear
    // the error
    if (this.props.creationError) {
      this.props.resetCreate();
    }
  }

  makeOnChangeHandler() {
    return ev => {
      this.handleFormChanged();
      this.setState({
        form: Object.assign({}, this.state.form, {
          [ev.target.name]: ev.target.value,
        }),
      });
    };
  }

  handleAdModeChange(ev) {
    this.handleFormChanged();
    this.setState({
      form: Object.assign({}, this.state.form, {
        adModeAuto: ev.target.value === 'true',
      }),
    });
  }

  // Force name to lowercase, no spaces
  // TODO: This behaviour is nasty; un-nastify it
  handleNameChange(ev) {
    this.handleFormChanged();
    this.setState({
      form: Object.assign({}, this.state.form, {
        name: ev.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      }),
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.requestCreate(this.state.form);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset
          disabled={this.props.creationState === requestStates.IN_PROGRESS}
        >
          <FormField
            label="Name"
            help="Lower case; no spaces or special characters"
          >
            <input
              name="name"
              type="text"
              value={this.state.form.name}
              onChange={this.handleNameChange}
            />
          </FormField>
          <FormField
            label="GitHub repository"
            help="Full URL, e.g. 'https://github.com/equinor/my-app'"
          >
            <input
              name="repository"
              type="text"
              value={this.state.form.repository}
              onChange={this.makeOnChangeHandler()}
            />
          </FormField>
          <FormFieldChoice label="Administrators">
            <p style={{ marginTop: 0 }}>
              {/* TODO: Style this in FormFieldChoice */}
              End user access is controlled by the application, and is not
              related to these groups
            </p>
            <FormFieldChoiceOption
              help={this.state.form.adModeAuto && adModeAutoHelp}
            >
              <label>
                <input
                  name="adMode"
                  type="radio"
                  checked={this.state.form.adModeAuto}
                  value="true"
                  onChange={this.handleAdModeChange}
                />{' '}
                All Radix Users
              </label>
            </FormFieldChoiceOption>
            <FormFieldChoiceOption>
              <label>
                <input
                  name="adMode"
                  type="radio"
                  checked={!this.state.form.adModeAuto}
                  value="false"
                  onChange={this.handleAdModeChange}
                />{' '}
                Custom AD groups (comma-separated)
              </label>
              {!this.state.form.adModeAuto && (
                <FormField help={adGroupsHelp}>
                  <input
                    name="adGroups"
                    type="text"
                    value={this.state.form.adGroups}
                    onChange={this.makeOnChangeHandler()}
                    disabled={this.state.form.adModeAuto}
                  />
                </FormField>
              )}
            </FormFieldChoiceOption>
          </FormFieldChoice>
          {this.props.creationState === requestStates.FAILURE && (
            <Alert type="danger">
              Failed to create application. {this.props.creationError}
            </Alert>
          )}
          <div className="o-action-bar">
            {this.props.creationState === requestStates.IN_PROGRESS && (
              <Spinner>Creating…</Spinner>
            )}
            <Button btnType="primary" type="submit">
              Create
            </Button>
          </div>
        </fieldset>
      </form>
    );
  }
}

CreateApplicationForm.propTypes = {
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  creationError: PropTypes.string,
  requestCreate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  creationState: getCreationState(state),
  creationError: getCreationError(state),
});

const mapDispatchToProps = dispatch => ({
  requestCreate: app => dispatch(appsActions.addAppRequest(app)),
  resetCreate: () => dispatch(appsActions.addAppReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateApplicationForm);
