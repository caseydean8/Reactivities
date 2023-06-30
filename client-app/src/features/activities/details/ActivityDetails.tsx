import { Activity } from "../../../app/models/activity";
import { Button, Card, Image } from "semantic-ui-react";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
}

export default function ActivityDetails({
  activity,
  cancelSelectActivity,
}: Props) {
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
          onClick={cancelSelectActivity}
          basic
          color="grey"
          content="Cancel"
        />
      </Card.Content>
    </Card>
  );
}
