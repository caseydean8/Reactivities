// makeAutoObservable reduces imports
// import { action, makeAutoObservable, makeObservable, observable } from "mobx";

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // makeObservable that infers observables and actions
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    // Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ActivityStore@1.loadingInitial
    // this.loadingInitial = true;
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
      });
      // this.loadingInitial = false;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      // this.loadingInitial = false;
      this.setLoadingInitial(false);
    }
  };

  // Created an "action" to fix MobX strict-mode warning
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: Activity) => {
    // Start loading indicator
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activities = [
          // Create a new array filtering out the activity we're updating...
          ...this.activities.filter((x) => x.id !== activity.id),
          // with the freshly updated activity
          activity,
        ];
        // Select activity to display on the right in ActivityDetails.
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
