import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { Fragment } from 'react';

export default observer(function ActivityList() {
  // Direct via MobX
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {/* Since groupedActivities is an array of arrays, Use bracket notation to map both the date (as group) and the activities */}
      {groupedActivities.map(([group, activities]) => (
        // make Date header from group key
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {activities.map(activity => (
            // map activity out under it's group key
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
