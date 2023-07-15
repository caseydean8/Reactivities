import { ChangeEvent, useEffect, useState } from "react";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  // Direct user to <ActivityDetails /> after creating/updating activity
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    // Non-Null Assertion operator ! tells compiler to ignore undefined or null types. Used in cases where you are certain the value will not be undefined
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  //   function handleSubmit() {
  //     // Generate uuid on the client side for immediate redirect
  //     if (!activity.id) {
  //       activity.id = uuid();
  //       createActivity(activity).then(() =>
  //         navigate(`/activities/${activity.id}`)
  //       );
  //     } else {
  //       updateActivity(activity).then(() =>
  //         navigate(`/activities/${activity.id}`)
  //       );
  //     }
  //   }

  //   function handleInputChange(
  //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) {
  //     const { name, value } = event.target;
  //     setActivity({ ...activity, [name]: value });
  //   }

  if (loadingInitial) return <LoadingComponent content="totally loading..." />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={values => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextInput placeholder="Description" name="description" />
            <MyTextInput placeholder="Category" name="category" />
            <MyTextInput placeholder="Date" name="date" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
