export const adminMenu = [
    { //QUản Lý người dùng
        name: 'menu.system.user', menus: [

            { name: 'menu.system.manage-user.crud-user', link: '/system/crud-user' },
            { name: 'menu.system.manage-user.crud-user-redux', link: '/system/User-Redux' },
            { name: 'menu.system.manage-user.manage-docter', link: '/system/manage-docter' },
            { name: 'menu.system.manage-user.manage-admin', link: '/system/manage-admin' }
            // {
            //     name: 'menu.system.system-administrator.header',
                
            //     // subMenus: [
            //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     //     { name: 'menu.system.system-administrator.user-Redux', link: '/system/User-Redux' },
            //     //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
            //     // ]
            // },
        ]
    },

    { //QUản Lý Phòng Khám
        name: 'menu.system.clinics', menus: [

            { name: 'menu.system.manage-clinics', link: '/system/manage-clinic' }
        ]
    },

    { //QUản Lý Chuyên Khoa
        name: 'menu.system.specialty', menus: [

            { name: 'menu.system.manage-specialty', link: '/system/manage-specialty' }
        ]
    },

    { //QUản Lý Cẩm nang
        name: 'menu.system.handbook', menus: [

            { name: 'menu.system.manage-handbook', link: '/system/manage-handbook' }
        ]
    },

];