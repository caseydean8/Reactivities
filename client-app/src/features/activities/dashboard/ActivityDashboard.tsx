import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  activities: Activity[];
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default observer(function ActivityDashboard({
  activities,
  deleteActivity,
  submitting,
}: Props) {
  // MobX
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <List>
          <ActivityList
            activities={activities}
            deleteActivity={deleteActivity}
            submitting={submitting}
          />
        </List>
      </Grid.Column>
      <Grid.Column width="6">
        {/* Sidebar with image. Todo: display in viewport so user doesn't have to scroll up */}
        {selectedActivity && !editMode && <ActivityDetails />}
        {/* If editing show form in sidebar */}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
});
