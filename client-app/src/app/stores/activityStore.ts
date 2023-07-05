// makeAutoObservable reduces imports
// import { action, makeAutoObservable, makeObservable, observable } from "mobx";

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  //   activities: Activity[] = [];
  // or
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    // makeObservable that infers observables and actions
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
      });
      // Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ActivityStore@1.loadingInitial
      // this.loadingInitial = false;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      // this.loadingInitial = false;
      this.setLoadingInitial(false);
    }
  };

  // "action" to fix MobX strict-mode warning
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    // this.selectedActivity = this.activities.find((a) => a.id === id);
    // or
    this.selectedActivity = this.activityRegistry.get(id);
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
        // this.activities.push(activity);
        // or
        this.activityRegistry.set(activity.id, activity);
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
        // this.activities = [
        //   // Create a new array filtering out the activity we're updating...
        //   ...this.activities.filter((x) => x.id !== activity.id),
        //   // with the freshly updated activity
        //   activity,
        // ];
        // or
        this.activityRegistry.set(activity.id, activity);
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

  deleteActivity = async (id: string) => {
    await agent.Activities.delete(id);
    try {
      runInAction(() => {
        // this.activities = [...this.activities.filter((x) => x.id !== id)];
        // or
        this.activityRegistry.delete(id);
        // Delete activity from Activity Details if selected
        if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
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
