import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'ramda';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import inject18n from '../../../components/i18n';
import StixDomainEntityTags from '../common/stix_domain_entities/StixDomainEntityTags';

const styles = () => ({
  paper: {
    minHeight: '100%',
    margin: '10px 0 0 0',
    padding: '15px',
    borderRadius: 6,
  },
});

class StixObservableDetailsComponent extends Component {
  render() {
    const { t, classes, stixObservable } = this.props;
    return (
      <div style={{ height: '100%' }} className="break">
        <Typography variant="h4" gutterBottom={true}>
          {t('Details')}
        </Typography>
        <Paper classes={{ root: classes.paper }} elevation={2}>
          <Typography variant="h3" gutterBottom={true}>
            {t('Observable value')}
          </Typography>
          {stixObservable.observable_value}
          <div style={{ marginTop: 20 }}>
            <StixDomainEntityTags
              tags={stixObservable.tags}
              id={stixObservable.id}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

StixObservableDetailsComponent.propTypes = {
  stixObservable: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
};

const StixObservableDetails = createFragmentContainer(
  StixObservableDetailsComponent,
  {
    stixObservable: graphql`
      fragment StixObservableDetails_stixObservable on StixObservable {
        id
        observable_value
        tags {
          edges {
            node {
              id
              tag_type
              value
              color
            }
            relation {
              id
            }
          }
        }
      }
    `,
  },
);

export default compose(
  inject18n,
  withStyles(styles),
)(StixObservableDetails);
