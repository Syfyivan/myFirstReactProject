import { legacy_createStore, combineReducers } from "redux";
import { rolesReducer } from "./roles/reducers";

// 合并所有模块的reducer函数
const allReducers = combineReducers({
  roles: rolesReducer,
  // roles 这个名字没有要求, 但是因为之前设置的是(state = [])所以这个键会作为数据存在仓库里面的名字（就是state = []这个空数组的名字）
});

const store = legacy_createStore(allReducers);

export default store;
