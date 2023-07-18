// makeAutoObservable reduces imports
// import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

export default class ActivityStore {
  // activities: Activity[] = [];
  // ...or create a Map object with the ability to use Map methods get, set, values, delete, etc
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    // makeObservable that infers observables and actions
    makeAutoObservable(this);
  }

  // Computed Properties
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    // Object.entries returns an array of a given object's own enumerable string-keyed property key-value pairs
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        // Start with an empty activities object, the initialValue in reduce(callbackFn, initialValue)
        // Get date from activity to set as a key in activities object.
        const date = format(activity.date!, 'dd MMM yyyy');
        activities[date] = activities[date]
          ? // If activities key already exists add activity to the array value assigned to that key.
            [...activities[date], activity]
          : // Else add a new array value with new date key
            [activity];
        // This seems to do the same thing as the ternary
        // if (!activities[date]) activities[date] = [];
        // activities[date].push(activity);
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        this.setActivity(activity);
      });
      // Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: ActivityStore@1.loadingInitial
      // this.loadingInitial = false;
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    }
    // If activity is no longer in memory due to a page reload (undefined) get it from db
    else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => (this.selectedActivity = activity));
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };

  // returns Activity or undefined
  private getActivity(id: string) {
    return this.activityRegistry.get(id);
  }

  // "action" to fix MobX strict-mode warning
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createActivity = async (activity: Activity) => {
    // Start loading indicator
    this.loading = true;
    // Remove this? uuid is created ActivityForm
    if (!activity.id) activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
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
        // or handy Map object with set method
        this.activityRegistry.set(activity.id, activity);
        // path: "activities/:id", element: <ActivityDetails />
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
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
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
