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
     
    {   path: 'cattle',
        title: 'Manage Cattle',
        icon: 'hand-o-right',
        children: [
            {
                path: 'add/cow',
                title: 'Add Cattle'
            },
            {
                path: 'add/calf',
                title: 'Add Calf'
            },
            {
                path: 'view/records',
                title: 'Available Cattle/Calf'
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
                    title: 'Add Milking Record '
                },
                {
                    path: 'view-records',
                    title: 'Available Milk Records'
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
