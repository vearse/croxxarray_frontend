import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Pages
const Subcomponent = () => import('@/pages/assembly/Subcomponent')
const Subassembly = () => import('@/pages/assembly/Subassembly')
const Checklist = () => import('@/pages/assembly/Checklist')

const Configurations = () => import('@/pages/Configurations')
const Groups = () => import('@/pages/settings/Groups')
const Roles = () => import('@/pages/settings/Roles')
const Segments = () => import('@/pages/settings/Segments')
const SubcomponentType = () => import('@/pages/settings/SubcomponentType')
const SubcomponentCategories = () => import('@/pages/settings/SubcomponentCategories')
 

const Dashboard = () => import('@/pages/Dashboard')
const ProjectDatabase = () => import('@/pages/ProjectDatabase')
const Database = () =>  import('@/pages/projectdb/Database')
const Clients = () => import('@/pages/projectdb/Clients')
const Fields = () => import('@/pages/projectdb/Fields')
const Platforms = () => import('@/pages/projectdb/Platforms')
const Wells = () => import('@/pages/projectdb/Wells')
const JobTypes = () => import('@/pages/projectdb/JobTypes')
const CompletionTypes = () => import('@/pages/projectdb/CompletionTypes')

const Projects = () => import('@/pages/projects/Projects')
const ProjectDetail = () => import('@/pages/projects/ProjectDetails')

const CreateProject = () => import('@/pages/projects/CreateProject')
const CreateChecklist = () => import('@/pages/assembly/CreateChecklist')
const CreateSubcomponent = () => import('@/pages/assembly/CreateSubcomponent')
const CreateSubassembly = () => import('@/pages/assembly/CreateSubassembly')

// Views - Components
const Widgets = () => import('@/views/widgets/Widgets')
const Cards = () => import('@/views/base/Cards') 
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Login = () => import('@/pages/guest/Login')
const Logout = () => import('@/pages/guest/Logout')
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

//Route List 
function configRoutes () {
  return [
    {
      
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: { 
            requiresAuth: true
          }
        }, 
        {
          path: 'projectdb',
          name: 'projectdb',
          component: {
            render (c) { return c('router-view') }
          },
          meta: { 
            requiresAuth: true
          },
          children: [
            {
              path: '',
              name: 'projectdb',
              component: ProjectDatabase 
            },
            {
              path: 'db/:id', name: 'Database',
             component: Database
            },
            {
              path: 'clients', name: 'Clients',
              component: Clients
            },
            {
              path: 'fields', name: 'Fields',
              component: Fields
            },
            {
              path: 'platforms', name: 'Platforms',
              component: Platforms
            },
            {
              path: 'wells', name: 'Wells',
              component: Wells
            },
            {
              path: 'jobs', name: 'Jobs',
              component: JobTypes
            },
            {
              path: 'completion', name: 'completion',
              component: CompletionTypes
            }, 
          ]
        }, 
        {
          path: 'configurations',
          name: 'configurations',
          component: {
            render (c) { return c('router-view') }
          },
          meta: { 
            requiresAuth: true
          },
          children: [
            {
              path: '',
              name: 'configurations',
              component: Configurations
            },
            {
              path: '/groups', name: 'groups',
              component: Groups
            },
            {
              path: '/roles', name: 'roles',
              component: Roles
            },
            {
              path: '/segments', name: 'segments',
              component: Segments
            },
            {
              path: '/components/types', name: 'SubcomponentType',
              component: SubcomponentType
            },
            {
              path: '/components/categories', name: 'SubcomponentCategories',
              component: SubcomponentCategories
            },
          ]
        },
        {
          path: '/create/project',
          name: 'CreateProject',
          component: CreateProject
        }, 
        
        {
          path: '/projects/:name',
          name: 'ProjectDetail',
          component: ProjectDetail
        },
        
        {
          path: '/ongoing/project',
          name: 'OngoingProjects',
          component: Projects
        },
        {
          path: '/other/project',
          name: 'OtherProjects',
          component: Projects
        },
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'assembly',
          meta: {
            label: 'Assembly'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '/',
              name: 'Subcomponent',
              component: Subcomponent
            },
            {
              path: '/assembly/subassembly',
              name: 'Subassembly',
              component: Subassembly
            },
            {
              path: '/assembly/checklist',
              name: 'Checklist',
              component: Checklist
            },
            {
              path: '/assembly/subcomponent/create',
              name: 'CreateSubcomponent',
              component: CreateSubcomponent
            },
            {
              path: '/assembly/subassembly/create',
              name: 'CreateSubassembly',
              component: CreateSubassembly
            },
            {
              path: '/assembly/checklist/create',
              name: 'CreateChecklist',
              component: CreateChecklist
            }
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '',
      redirect: '/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'logout',
          name: 'logout',
          component: Logout
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
        {
          path: '*',
          name: 'Page404', 
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    }
  ]
}

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  // base: '',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

let loader = null;
function showLoader() {
  hideLoader();
  loader = Vue.$loading.show();
}
function hideLoader() {
  // destroy previous
  if (loader) {
    loader.hide();
    loader = null;
  }
}
const MAIN_TITLE = 'Croxx Array';
router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    showLoader(); // vue-loading-overlay 
  }
  Vue.nextTick(() => { 
      document.title = to.meta.title || MAIN_TITLE;
  });
  // Authentication Redirection
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters["auth/isLoggedIn"]){
      next();
      // store.dispatch("auth/authenticateSession", to).then(() => {
      //   next();
      //   // to.matched.some(function(route) {
      //   //   let acl = route.meta.acl;
      //   //   if (acl) {
      //   //     next(); 
      //   //   } else {
      //   //     next({ name: "login" });
      //   //     // console.log('No Access');
      //   //     // next();
      //   //   }
      //   // });
      // }) 
    } else{
      if (to.name === "login" || to.name === "logout") {
        next({ name: "login" });
      } else {
        next({ name: "login", query: { returnTo: to.fullPath } });
      }
    }
    // Redirect to guest page
  }else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters["auth/isLoggedIn"]) {
      next({ name: "dashboard" });
      return;
    }
    next();
  } else {
    next();
  }

});


router.afterEach((to, from) => {
  // authenticate session
  //store.dispatch('auth/authenticateSession');
  
  // vue-loading-overlay
  hideLoader();
});
 

export default router;
