import { assoc } from 'ramda';
import { createEntity, listEntities, loadEntityById, loadEntityByStixId, TYPE_STIX_DOMAIN_ENTITY } from '../database/grakn';
import { BUS_TOPICS } from '../config/conf';
import { notify } from '../database/redis';

export const findById = organizationId => {
  if (organizationId.match(/[a-z-]+--[\w-]{36}/g)) {
    return loadEntityByStixId(organizationId);
  }
  return loadEntityById(organizationId);
};
export const findAll = args => {
  const typedArgs = assoc('types', ['Organization'], args);
  return listEntities(['name', 'alias'], typedArgs);
};

export const addOrganization = async (user, organization) => {
  const created = await createEntity(organization, 'Organization', {
    modelType: TYPE_STIX_DOMAIN_ENTITY,
    stixIdType: 'identity'
  });
  return notify(BUS_TOPICS.StixDomainEntity.ADDED_TOPIC, created, user);
};
