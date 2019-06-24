export let MENU_ITEM = [
  
    {
        path: 'profile',
        title: 'Profile',
        icon: 'user-circle'
    },
    
    {
        path: 'employees',
        title: 'Employees',
        icon: 'users'
    },
     
    {  path: 'cattle',
        title: 'Cattle',
        icon: 'hand-o-right',
        children: [
            {
                path: 'add/cow',
                title: 'Add Cow'
            },
            {
                path: 'add/calf',
                title: 'Add Calf'
            },
            {
                path: 'view/records',
                title: 'Cattles'
            }
        ]

        },

        {
            path: 'milking' ,
            title: 'Milking',
            icon: 'flask', 
            children: [
                {
                    path: 'add-record',
                    title: 'ADD Record'
                },
                {
                    path: 'view-records',
                    title: 'View Records'
                }
            ]  
        },
        {
            path: 'breeding',
            title: 'Breeding',
            icon: 'plus-square'
        },

        {
            path: 'health',
            title: 'Health',
            icon: 'h-square'
        },
        {
            path: 'mortality',
            title: 'Mortality',
            icon: 'minus-square'
        }

];
