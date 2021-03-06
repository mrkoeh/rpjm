Ext.define('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan2', {
    extend      : 'Ext.data.Store',
    model       : 'RPJM.module.MasterRpjm.BidangUrusanPenunjang.model.Urusan',
    requires    : [
        'RPJM.module.MasterRpjm.BidangUrusanPenunjang.model.Urusan'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    remoteFilter: true,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'bidangurusanpenunjang/c_bidangurusanpenunjang/getUrusan'
        },
        actionMethods   : {
            read        : 'POST'
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