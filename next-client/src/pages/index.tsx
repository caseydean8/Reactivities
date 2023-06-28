import { Inter } from "next/font/google";
import "semantic-ui-css/semantic.min.css";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { Button, Header, List } from "semantic-ui-react";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      // React strict mode will render components twice in development, thus this will log twice
      console.log(response);
      setActivities(response.data);
    });
  }, []);
  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
      <Button content="test" />
    </div>
  );
}

