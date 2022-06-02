
export const requiredSidebarPathssettings = [
  {
    title: 'Settings',
    items: [
      {
        title: 'Navigation ',
        iconClassName: 'la la-dashboard',
        items: [
          { title: 'Permissions &amp; Defaults', path: '/settings/permissions_&_defaults', activePath: '/settings/permissions_&_defaults' },
        ]
      }]
  }];

/*
 
<li> 
              <a href="/app/main/welcome"><i className="la la-home" /> <span>Back to Home</span></a>
            </li>

            <li className={pathname.includes('permissions_&_defaults') ?"active" :""}> 
              <a href="/settings/permissions_&_defaults"><i className="la la-key" /> <span>Permissions &amp; Defaults</span></a>
            </li>

 */


export const allSidebarPaths = [
  {
    title: 'main',
    items: [
      {
        title: 'dashboard',
        iconClassName: 'la la-dashboard',
        items: [
          { title: 'welcome', path: '/app/main/welcome', activePath: 'welcome' },
          { title: 'admin_dashboard', path: '/app/main/dashboard', activePath: 'main/dashboard' },
          { title: 'employee_dashboard', path: '/app/main/employee-dashboard', activePath: 'main/employee-' }
        ]
      },
      {
        title: 'apps',
        iconClassName: 'la la-cube',
        items: [
          { title: 'chat', path: '/conversation/chat' },
          {
            title: 'calls',
            items: [
              { title: 'voice_call', path: '/conversation/voice-call' },
              { title: 'video_call', path: '/conversation/video-call' },
              { title: 'outgoing_call', path: '/conversation/outgoing-call' },
              { title: 'incoming_call', path: '/conversation/incoming-call' }
            ]
          },
          { title: 'calendar', path: '/apps/calendar', activePath: 'apps/calendar' },
          { title: 'contacts', path: '/apps/contacts', activePath: 'contacts' },
          { title: 'email', path: '/email/inbox' },
          { title: 'file_manager', path: '/apps/file-manager', activePath: 'file-manager' }
        ]
      },
    ]
  },
  {
    title: 'employees',
    items: [
      {
        title: 'employees',
        iconClassName: 'la la-user',
        items: [
          { title: 'all_employees', path: '/app/employee/allemployees', activePath: '/app/employee/allemployees' },
          { title: 'holidays', path: '/app/employee/holidays', activePath: 'holidays' },
          { title: 'leaves_(admin)', path: '/app/employee/leaves-admin', activePath: 'es-admin' },
          { title: 'leaves_(employee)', path: '/app/employee/leaves-employee', activePath: 'ves-employee' },
          { title: 'leave_settings', path: '/app/employee/leave-settings', activePath: 'e-settings' },
          { title: 'attendance_(admin)', path: '/app/employee/attendance-admin', activePath: 'nce-admin' },
          { title: 'attendance_(employee)', path: '/app/employee/attendance-employee', activePath: 'ce-employee' },
          { title: 'titles_&_depts', path: '/app/employee/titles_&_depts', activePath: 'titles_&_depts' },
          { title: 'timesheet', path: '/app/employee/timesheet', activePath: 'timesheet' },
          { title: 'overtime', path: '/app/employee/overtime', activePath: 'overtime' },
        ]
      },
      { title: 'clients', iconClassName: 'la la-users', path: '/app/employees/clients', activePath: 'clients' },
      {
        title: 'projects',
        iconClassName: 'la la-rocket',
        items: [
          { title: 'projects', path: '/app/projects/project_dashboard', activePath: 't_dashboard,projects-list,cts-view' },
          { title: 'tasks', path: '/tasks/tasks' },
          { title: 'task_board', path: '/projects/task-board', activePath: 'task-board' }
        ]
      },
      { title: 'leads', iconClassName: 'la la-user-secret', path: '/employees/leads', activePath: 'leads' },
      { title: 'tickets', iconClassName: 'la la-ticket', path: '/employees/tickets', activePath: 'tickets' },
    ]
  },
  {
    title: 'hr',
    items: [
      {
        title: 'accounts',
        iconClassName: 'la la-files-o',
        items: [
          { title: 'estimates', path: '/accounts/estimates', activePath: 'estimates' },
          { title: 'invoices', path: '/accounts/invoices', activePath: 'invoices' },
          { title: 'payments', path: '/accounts/payments', activePath: 'payments' },
          { title: 'expenses', path: '/accounts/expenses', activePath: 'expenses' },
          { title: 'provident_fund', path: '/accounts/provident-fund', activePath: 'provident-fund' },
          { title: 'taxes', path: '/accounts/taxes', activePath: 'taxes' }
        ]
      },
      {
        title: 'payroll',
        iconClassName: 'la la-money',
        items: [
          { title: 'employee_salary', path: '/payroll/_salary', activePath: '_salary' },
          { title: 'payslip', path: '/payroll/salary-view', activePath: 'y-view' },
          { title: 'payroll_items', path: '/payroll/payroll-items', activePath: 'payroll-items' },
        ]
      },
      { title: 'policies', iconClassName: 'la la-file-pdf-o', path: '/hr/policies', activePath: 'policies' },
      {
        title: 'reports',
        iconClassName: 'la la-pie-chart',
        items: [
          { title: 'expense_reports', path: '/reports/expense-reports', activePath: 'expense-' },
          { title: 'invoice_report', path: '/reports/invoice-reports', activePath: 'invoice-' }
        ]
      }
    ]
  },
  {
    title: 'performance',
    items: [
      {
        title: 'performance',
        iconClassName: 'la la-graduation-cap',
        items: [
          { title: 'performance_indicator', path: '/performances/performance-indicator', activePath: '-indicator' },
          { title: 'performance_review', path: '/performances/performance-review', activePath: '-review' },
          { title: 'performance_appraisal', path: '/performances/performance-appraisal', activePath: '-appraisal' }
        ]
      }
    ]
  },
  {
    title: 'goals',
    iconClassName: 'la la-crosshairs',
    items: [
      { title: 'goal_list', path: '/goals/goal-tracking', activePath: '-tracking' },
      { title: 'goal_type', path: '/goals/goal-type', activePath: 'l-type' }
    ]
  },
  {
    title: 'training',
    iconClassName: 'la la-edit',
    items: [
      { title: 'training_list', path: '/training/training-list', activePath: 'training-list' },
      { title: 'trainers', path: '/training/trainer', activePath: 'trainer' },
      { title: 'training_type', path: '/training/training-type', activePath: 'training-type' }
    ]
  },
  {
    title: 'training_modules',
    iconClassName: 'la la-edit',
    items: [
      { title: 'training_module_admin', path: '/training-modules/training-module-admin', activePath: 'training-module-admin' },
      { title: 'trainig_module', path: '/training-modules/training-module-tm', activePath: 'training-module-tm' }
    ]
  },
  { title: 'promotion', iconClassName: 'la la-bullhorn', path: '/performance/promotion', activePath: 'promotion' },
  { title: 'resignation', iconClassName: 'la la-external-link-square', path: '/performance/resignation', activePath: 'resignation' },
  { title: 'termination', iconClassName: 'la la-times-circle', path: '/performance/termination', activePath: 'termination' },
  {
    title: 'administration',
    items: [
      { title: 'assets', iconClassName: 'la la-object-ungroup', path: '/app/administrator/assets', activePath: 'assets' },
      {
        title: 'jobs',
        iconClassName: 'la la-briefcase',
        items: [
          { title: 'job_dashboard', path: '/app/administrator/job-dashboard', activePath: 'job-dashboard' },
          { title: 'manage_jobs', path: '/app/administrator/jobs', activePath: 'jobs' },
          { title: 'applied_cadidates', path: '/app/administrator/job-applicants', activePath: 'job-applicants' },
          { title: 'job_seeker', path: '/app/job_seekers/dashboard', activePath: 'job-seeker' }
        ]
      },
      { title: 'knowledgebase', iconClassName: 'la la-question', path: '/administrator/knowledgebase', activePath: 'knowledgebase' },
      { title: 'activities', iconClassName: 'la la-bell', path: '/administrator/activities', activePath: 'activities' },
      { title: 'users', iconClassName: 'la la-user-plus', path: '/administrator/users', activePath: 'administrator/users' },
      { title: 'settings', iconClassName: 'la la-cog', path: '/settings/companysetting' }
    ]
  },
  {
    title: 'pages',
    items: [
      {
        title: 'profile',
        iconClassName: 'la la-user',
        items: [
          { title: 'employee_profile', path: '/profile/employee-profile', activePath: 'profile/employee-' },
          { title: 'client_profile', path: '/profile/client-profile', activePath: 'client-' }
        ]
      },
      {
        title: 'authentication',
        iconClassName: 'la la-key',
        items: [
          { title: 'login', path: '/login' },
          { title: 'register', path: '/register' },
          { title: 'forgot_password', path: '/forgotpassword' },
          { title: 'OTP', path: '/otp' },
          { title: 'lock_screen', path: '/lockscreen' }
        ]
      },
      {
        title: 'error_pages',
        iconClassName: 'la la-exclamation-triangle',
        items: [
          { title: '404_error', path: '/error-404' },
          { title: '500_error', path: '/error-500' }
        ]
      },
      {
        title: 'subscriptions',
        iconClassName: 'la la-hand-o-up',
        items: [
          { title: 'subscriptions_(admin)', path: '/subscription/subscriptionadmin', activePath: 'subscriptionadmin' },
          { title: 'subscriptions_(company)', path: '/subscription/subscriptioncompany', activePath: 'subscriptioncompany' },
          { title: 'subscribed_companies', path: '/subscription/subscribedcompanies', activePath: 'subscribedcompanies' }
        ]
      },
      {
        title: 'pages',
        iconClassName: 'la la-columns',
        items: [
          { title: 'search', path: '/pages/search', activePath: 'pages/search' },
          { title: 'faq', path: '/pages/faq', activePath: 'pages/faq' },
          { title: 'terms', path: '/pages/terms', activePath: 'pages/terms' },
          { title: 'privacy_policy', path: '/pages/privacypolicy', activePath: 'privacypolicy' },
          { title: 'blank_page', path: '/pages/blank', activePath: 'pages/blank' }
        ]
      }
    ]
  },
  {
    title: 'UI_interface',
    items: [
      { title: 'components', iconClassName: 'la la-puzzle-piece', path: '/ui-components' },
      {
        title: 'forms',
        iconClassName: 'la la-object-group',
        items: [
          { title: 'basic_inputs', path: '/ui-interface/forms/basicinputs', activePath: 'basicinputs' },
          { title: 'input_groups', path: '/ui-interface/forms/inputgroups', activePath: 'inputgroups' },
          { title: 'horizontal_form', path: '/ui-interface/forms/horizontalform', activePath: 'horizontalform' },
          { title: 'vertical_form', path: '/ui-interface/forms/verticalform', activePath: 'verticalform' },
          { title: 'form_mask', path: '/ui-interface/forms/formmask', activePath: 'formmask' },
          { title: 'form_validation', path: '/ui-interface/forms/formvalidation', activePath: 'formvalidation' }
        ]
      },
      {
        title: 'tables',
        iconClassName: 'la la-table',
        path: '/ui-interface/tables/basic',
        items: [
          { title: 'basic_tables', path: '/ui-interface/tables/basic', activePath: 'tables/basic' },
          { title: 'data_table', path: '/ui-interface/tables/data-table', activePath: 'tables/data-table' }
        ]
      }
    ]
  },
  {
    title: 'extras',
    items: [
      { title: 'documentation', iconClassName: 'la la-file-text', path: '#' },
      { title: 'change_log', iconClassName: 'la la-info', path: '#' },
      {
        title: 'multi_level',
        iconClassName: 'la la-share-alt',
        items: [
          {
            title: 'level_1',
            items: [
              { title: 'level_2', path: '#' },
              {
                title: 'level_2',
                items: [
                  { title: 'level_3', path: '#' },
                  { title: 'level_3', path: '#' }
                ]
              },
              { title: 'level_2', path: '#' }
            ]
          },
          { title: 'level_1', path: '#' }
        ]
      }
    ]
  }
];

export const requiredSidebarPaths = [
  {
    title: 'main',
    items: [
      {
        title: 'dashboard',
        iconClassName: 'la la-dashboard',
        items: [
          { title: 'welcome', path: '/app/main/welcome' },
          { title: 'job seeker dashboard', path: '/app/job_seekers/dashboard' }
        ]
      }
    ]
  },
  {
    title: 'employees',
    items: [
      {
        title: 'employees',
        iconClassName: 'la la-user',
        items: [
          { title: 'all employees', path: '/app/employee/allemployees', activePath: '/app/employee/allemployees' },
          { title: 'titles & depts', path: '/app/employee/titles_&_depts', activePath: 'titles_&_depts' },
        ]
      }
    ]
  },
  {
    title: 'administration',
    items: [
      {
        title: 'jobs',
        iconClassName: 'la la-briefcase',
        items: [
          { title: 'dashboard', path: '/app/administrator/job-dashboard', activePath: 'job-dashboard' },
          { title: 'manage', path: '/app/administrator/jobs', activePath: 'jobs' },
          { title: 'applications', path: '/app/administrator/job-applicants', activePath: 'job-applicants' }
        ]
      },
      { title: 'settings', iconClassName: 'la la-cog', path: '/settings/permissions_&_defaults' }
    ]
  },
];