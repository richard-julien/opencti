import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { Route, withRouter } from 'react-router-dom';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import inject18n from '../../../../components/i18n';
import CountryPopover from './CountryPopover';
import StixRelation from '../../common/stix_relations/StixRelation';
import EntityStixObservables from '../../stix_observables/EntityStixObservables';
import StixDomainEntityHeader from '../../common/stix_domain_entities/StixDomainEntityHeader';

const styles = () => ({
  container: {
    margin: 0,
    padding: '0 260px 0 0',
  },
  containerWithoutPadding: {
    margin: 0,
    padding: 0,
  },
  paper: {
    minHeight: '100%',
    margin: '5px 0 0 0',
    padding: '15px',
    borderRadius: 6,
  },
});

class CountryObservablesComponent extends Component {
  render() {
    const { classes, country, location } = this.props;
    const link = `/dashboard/entities/countries/${country.id}/observables`;
    return (
      <div
        className={
          location.pathname.includes(
            `/dashboard/entities/countries/${country.id}/observables/relations/`,
          )
            ? classes.containerWithoutPadding
            : classes.container
        }
      >
        <StixDomainEntityHeader
          stixDomainEntity={country}
          PopoverComponent={<CountryPopover />}
        />
        <Route
          exact
          path="/dashboard/entities/countries/:countryId/observables/relations/:relationId"
          render={(routeProps) => (
            <StixRelation
              entityId={country.id}
              inversedRoles={[]}
              observable={true}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/entities/countries/:countryId/observables"
          render={(routeProps) => (
            <Paper classes={{ root: classes.paper }} elevation={2}>
              <EntityStixObservables
                entityId={country.id}
                relationType="localization"
                entityLink={link}
                {...routeProps}
              />
            </Paper>
          )}
        />
      </div>
    );
  }
}

CountryObservablesComponent.propTypes = {
  country: PropTypes.object,
  location: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
};

const CountryObservables = createFragmentContainer(
  CountryObservablesComponent,
  {
    country: graphql`
      fragment CountryObservables_country on Country {
        id
        name
        alias
      }
    `,
  },
);

export default compose(
  inject18n,
  withRouter,
  withStyles(styles),
)(CountryObservables);
