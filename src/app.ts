import { Goal } from "./goals";

let state = {
  view: "all",
  selectedGoal: null
};

const seeMain = () => {
  state = {
    ...state,
    view: "all",
    selectedGoal: null
  };
};

const seeDetails = goal => {
  state = {
    ...state,
    view: "detail",
    selectedGoal: goal.id
  };
};

const seeEdit = (goal: Goal) => {
  state = {
    ...state,
    view: "edit",
    selectedGoal: goal.id
  };
};

export default {
  state,
  seeMain,
  seeDetails,
  seeEdit
};
