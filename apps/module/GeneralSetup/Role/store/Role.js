Ext.define('RPJM.module.GeneralSetup.Role.store.Role', {
    extend      : 'Ext.data.Store',
    model       : 'RPJM.module.GeneralSetup.Role.model.Role',
    requires    : [
        'RPJM.module.GeneralSetup.Role.model.Role'
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
            read    : BASE_URL + 'GeneralSetup/c_role/getRole'
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