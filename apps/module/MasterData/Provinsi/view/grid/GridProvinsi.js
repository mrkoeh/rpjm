Ext.define('RPJM.module.MasterData.Provinsi.view.grid.GridProvinsi', {
    extend   : 'Ext.grid.Panel',
    store    : 'RPJM.module.MasterData.Provinsi.store.Provinsi',
    requires : ['RPJM.module.MasterData.Provinsi.store.Provinsi'],
    title    : 'Grid Provinsi',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridprovinsi',
    id       : 'gridprovinsi',
    border   : true,
    frame    : true,
        margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'SINGLE',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'RPJM.module.MasterData.Provinsi.store.Provinsi',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Kode Provinsi',
            dataIndex: 'kode_prov',
            width    : '15%'
        },
        {
            text     : 'Provinsi',
            dataIndex: 'provinsi',
            width    : '15%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteProvinsi },
         // { xtype: 'button', iconCls: 'icon-excel', text: 'Print', action : 'print' },
         {
            xtype               : 'textfield',
            emptyText           : 'Type a keyword Press Enter',
            width               : '75%',
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});