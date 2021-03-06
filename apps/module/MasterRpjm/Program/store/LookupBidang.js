Ext.define('RPJM.module.MasterRpjm.Program.store.LookupBidang', {
    extend      : 'Ext.data.Store',
    model       : 'RPJM.module.MasterRpjm.Program.model.LookupBidang',
    requires    : [
        'RPJM.module.MasterRpjm.Program.model.LookupBidang'
    ],
    autoLoad    : true,
    autoSync    : false,
    // pageSize    : 20,
    remoteFilter: true,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'program/c_program/getLookupBidang'
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