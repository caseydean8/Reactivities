import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Button, Card, Image } from "semantic-ui-react";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity } = activityStore;

  if (!activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color="blue" content="Edit" />
        <Button
          // Since we're not using any parameters here you can add without parentheses, and without parantheses it doesn't execute on load.
          basic
          color="grey"
          content="Cancel"
        />
      </Card.Content>
    </Card>
  );
}
