export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-chart'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Create Project',
        to: '/create/project',
        icon: 'cil-plus'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Ongoing Projects',
        to: '/ongoing/project',
        icon: 'cil-circle'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Other Projects',
        to: '/other/project',
        icon: 'cil-border'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Project Database',
        to: '/projectdb',
        icon: 'cil-storage'
      }, 
      {
        _name: 'CSidebarNavItem',
        name: 'Assembly',
        to: '/assembly',
        icon: 'cil-ouzzle'
      }, 
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Base',
      //   route: '/base',
      //   icon: 'cil-puzzle',
      //   items: [
      //     {
      //       name: 'Breadcrumbs',
      //       to: '/base/breadcrumbs'
      //     },
      //     {
      //       name: 'Cards',
      //       to: '/base/cards'
      //     },
      //     {
      //       name: 'Carousels',
      //       to: '/base/carousels'
      //     }, 
      //     {
      //       name: 'Collapses',
      //       to: '/base/collapses'
      //     },
      //     {
      //       name: 'Forms',
      //       to: '/base/forms'
      //     },
      //     {
      //       name: 'Jumbotrons',
      //       to: '/base/jumbotrons'
      //     },
      //     {
      //       name: 'List Groups',
      //       to: '/base/list-groups'
      //     },
      //     {
      //       name: 'Navs',
      //       to: '/base/navs'
      //     },
      //     {
      //       name: 'Navbars',
      //       to: '/base/navbars'
      //     },
      //     {
      //       name: 'Paginations',
      //       to: '/base/paginations'
      //     },
      //     {
      //       name: 'Popovers',
      //       to: '/base/popovers'
      //     },
      //     {
      //       name: 'Progress Bars',
      //       to: '/base/progress-bars'
      //     },
      //     {
      //       name: 'Switches',
      //       to: '/base/switches'
      //     },
      //     {
      //       name: 'Tables',
      //       to: '/base/tables'
      //     },
      //     {
      //       name: 'Tabs',
      //       to: '/base/tabs'
      //     },
      //     {
      //       name: 'Tooltips',
      //       to: '/base/tooltips'
      //     }
      //   ]
      // },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Segment Configuration',
        to: '/configurations',
        icon: 'cil-chart-pie'
      }, 
      {
        _name: 'CSidebarNavItem',
        name: 'Users',
        to: '/charts',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Feedbacks',
        route: '/icons',
        icon: 'cil-star',
        // items: [
        //   {
        //     name: 'CoreUI Icons',
        //     to: '/icons/coreui-icons',
        //     badge: {
        //       color: 'info',
        //       text: 'NEW'
        //     }
        //   },
        //   {
        //     name: 'Brands',
        //     to: '/icons/brands'
        //   },
        //   {
        //     name: 'Flags',
        //     to: '/icons/flags'
        //   }
        // ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'History',
        route: '/notifications',
        icon: 'cil-bell',
        // items: [
        //   {
        //     name: 'Alerts',
        //     to: '/notifications/alerts'
        //   },
        //   {
        //     name: 'Badges',
        //     to: '/notifications/badges'
        //   },
        //   {
        //     name: 'Modals',
        //     to: '/notifications/modals'
        //   }
        // ]
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
      { 
        _name: 'CSidebarNavDropdown',
        name: 'Logout',
        route: '/pages',
        icon: 'cil-star',
        // items: [
        //   {
        //     name: 'Login',
        //     to: '/pages/login'
        //   },
        //   {
        //     name: 'Register',
        //     to: '/pages/register'
        //   },
        //   {
        //     name: 'Error 404',
        //     to: '/pages/404'
        //   },
        //   {
        //     name: 'Error 500',
        //     to: '/pages/500'
        //   }
        // ]
      }
    ]
  }
]