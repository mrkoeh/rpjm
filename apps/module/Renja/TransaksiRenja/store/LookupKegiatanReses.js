Ext.define('RPJM.module.Renja.TransaksiRenja.store.LookupKegiatanReses', {
    extend      : 'Ext.data.Store',
    model       : 'RPJM.module.Renja.TransaksiRenja.model.LookupKegiatanReses',
    requires    : [
        'RPJM.module.Renja.TransaksiRenja.model.LookupKegiatanReses'
    ],
    autoLoad    : true,
    autoSync    : false,
    remoteFilter: true,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'transaksirenja/c_transaksirenja/getLookupKegiatan'
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