import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// Import Store Modules
import auth from "./modules/auth";
import groups from "./modules/groups";
import roles from "./modules/roles";
import segments from "./modules/segments";
import componentCategories  from "./modules/component-categories";
import componentTypes  from "./modules/component-types";
import databases from "./modules/databases";
import croxx_databases from "./modules/croxx-database";
import clients from "./modules/clients";
import fields from "./modules/fields";
import platforms from "./modules/platforms";
import wells from "./modules/wells";
import jobTypes from "./modules/job-types";
import completionTypes from "./modules/completion-types";
import checklist from "./modules/checklist";
import subcomponent from "./modules/subcomponent";
import subassembly from "./modules/subassembly";
import projects from "./modules/projects";
import users from "./modules/users";

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  }
}

export default new Vuex.Store({
  state,
  mutations,

  modules: {
    auth,
    users,
    groups,
    roles,
    segments,
    componentTypes,
    componentCategories,
    databases,
    croxx_databases,
    clients,
    fields,
    platforms,
    wells,
    jobTypes,
    completionTypes,
    checklist,
    subcomponent,
    subassembly,
    projects
  }
}) 