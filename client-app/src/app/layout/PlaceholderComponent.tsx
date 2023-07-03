import React from "react";
import {
  Button,
  Grid,
  Item,
  List,
  Placeholder,
  Segment,
} from "semantic-ui-react";
interface Props {
  inverted?: boolean;
}

const PlaceholderExampleHeaderImage = ({ inverted = true }: Props) => (
  <Grid>
    <Grid.Column width="10">
      <List>
        <Segment>
          <Item.Group divided>
            <Item>
              <Placeholder>
                <Placeholder.Header />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Item.Extra>
                  <Button disabled color="red" />
                  <Button disabled color="blue" />
                </Item.Extra>
              </Placeholder>
            </Item>
          </Item.Group>
        </Segment>
      </List>
    </Grid.Column>
  </Grid>
);

export default PlaceholderExampleHeaderImage;
