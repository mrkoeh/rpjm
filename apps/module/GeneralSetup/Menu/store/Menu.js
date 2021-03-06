Ext.define('RPJM.module.GeneralSetup.Menu.store.Menu', {
    extend      : 'Ext.data.Store',
    model       : 'RPJM.module.GeneralSetup.Menu.model.Menu',
    requires    : [
        'RPJM.module.GeneralSetup.Menu.model.Menu'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'GeneralSetup/c_menu/getMenu'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success',
            totalProperty   : 'total'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});