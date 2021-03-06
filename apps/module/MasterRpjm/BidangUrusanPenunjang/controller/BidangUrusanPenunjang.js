Ext.define('RPJM.module.MasterRpjm.BidangUrusanPenunjang.controller.BidangUrusanPenunjang', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan2').load();
        me.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').load();

        me.control({
            "gridbidangurusanpenunjang  button[action=delete]"      : {
                click: me.del
            }, 
            "#gridbidangurusanpenunjang"                            : {
               select: me.viewBidangUrusanPenunjang
            },   

            "#gridurusan"                                  : {
               select: me.viewBidangUrusanPenunjangDetail
            },            
            "bidangurusanpenunjang  button[action=save]"        : {
                click: me.save
            }, 
            "formbidangurusanpenunjang  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridbidangurusanpenunjangorg"                          : {
               itemdblclick: me.addorg
            },
            "gridurusan textfield[action=search]"          : {
               keypress: me.search
            },
            "gridbidangurusanpenunjang textfield[action=searchBidangUrusanPenunjang]"    : {
               keypress: me.searchBidangUrusanPenunjang
            },
            "gridbidangurusanpenunjang button[action=print]"        : {
               click: me.print
            },
            "bidangurusanpenunjang button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan2').reload();
        me.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload();
    },

    viewBidangUrusanPenunjang: function(grid, record, item, index, e, eOpts){
        var kode_urusan = record.data.kode_urusan;
        var form = Ext.getCmp('bidangurusanpenunjang');
        form.getForm().setValues(record.data);
    },

    viewBidangUrusanPenunjangDetail: function(grid, record, item, index, e, eOpts){
        var kode_urusan  = record.data.kode_urusan;
        var form            = Ext.getCmp('bidangurusanpenunjang');
        form.getForm().setValues(record.data);
        Ext.Ajax.request({
            url             : BASE_URL + 'bidangurusanpenunjang/c_bidangurusanpenunjang/getBidangUrusanPenunjangDetail',
            method          : 'POST',
            params          : {
                kode_urusan : Ext.JSON.encode(kode_urusan)
            },
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang');
                storeMenu.loadData([],false);
                storeMenu.add(data.data);
            }
        });
    },

   del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id : selected.data.id
            });
        }); 

        var form             = Ext.getCmp('bidangurusanpenunjang').getForm();
        var kode_bidangrpjm  = form.findField('kode_bidangrpjm').getValue();

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        headers     : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                        url         : BASE_URL + 'bidangurusanpenunjang/c_bidangurusanpenunjang/delBidangUrusanPenunjang',
                        method      : 'GET',
                        params      : {
                            kode_bidangrpjm : kode_bidangrpjm
                        },
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Digunakan di Table Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('bidangurusanpenunjang');
                                var grid    = Ext.getCmp('gridbidangurusanpenunjang');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridbidangurusanpenunjang')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload();                             
                            } else {
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Berhasil Dihapus',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('bidangurusanpenunjang');
                                var grid    = Ext.getCmp('gridbidangurusanpenunjang');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridbidangurusanpenunjang')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload(); 
                            }
                        }
                    });
                }
            }
        })
    },

    save : function(btn, evt, opts){
        var me                    = this;
        var form                  = Ext.getCmp('bidangurusanpenunjang').getForm();
        var kode_bidangrpjm       = form.findField('kode_bidangrpjm').getValue();
        var kode_urusan        = form.findField('kode_urusan').getValue();
        var nama_bidangrpjm       = form.findField('nama_bidangrpjm').getValue();
        var no_bidangrpjm         = form.findField('no_bidangrpjm').getValue(); 

        Ext.Ajax.request({
            headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
            url     : BASE_URL + 'bidangurusanpenunjang/c_bidangurusanpenunjang/saveBidangUrusanPenunjang',
            method  : 'GET',
            params  : {
                kode_urusan        : kode_urusan,
                nama_bidangrpjm       : nama_bidangrpjm,
                no_bidangrpjm         : no_bidangrpjm
            },
            waitMsg: 'Please Wait Data is Processing',
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('bidangurusanpenunjang');
                    me.resetPanel();
                    Ext.ComponentQuery.query('#gridurusan')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan').reload();
                    Ext.ComponentQuery.query('#gridbidangurusanpenunjang')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload();
                } else if(data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Bidang atau No Bidang Telah Terdaftar - Silahkan Gunakan Urusan Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                } else {
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pengisian Data Salah',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    me.resetPanel();
                    Ext.ComponentQuery.query('#gridurusan')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan').reload();
                    Ext.ComponentQuery.query('#gridbidangurusanpenunjang')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload(); 
                }
            }                       
       }); 
    },

    update : function(btn, evt, opts){
        var me                    = this;
        var form                  = Ext.getCmp('bidangurusanpenunjang').getForm();
        var kode_bidangrpjm       = form.findField('kode_bidangrpjm').getValue();
        var kode_urusan        = form.findField('kode_urusan').getValue();
        var nama_bidangrpjm       = form.findField('nama_bidangrpjm').getValue();
        var no_bidangrpjm         = form.findField('no_bidangrpjm').getValue(); 
        Ext.MessageBox.show({
            title   : 'Konfirmasi',
            msg     : 'Anda Yakin Merubah Data',
            buttons : Ext.Msg.YESNO,
            icon    : Ext.MessageBox.WARNING,
            width   : 500,
            fn      : function(btn,evtObj){
                if(btn == 'yes'){
                    Ext.Ajax.request({
                        headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                        url     : BASE_URL + 'bidangurusanpenunjang/c_bidangurusanpenunjang/editBidangUrusanPenunjang',
                        method  : 'GET',
                        params  : {
                            kode_bidangrpjm     : kode_bidangrpjm, 
                            kode_urusan      : kode_urusan,
                            nama_bidangrpjm     : nama_bidangrpjm,
                            no_bidangrpjm       : no_bidangrpjm
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Tersimpan',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('bidangurusanpenunjang');
                                me.resetPanel();
                                Ext.ComponentQuery.query('#gridurusan')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan').reload();
                                Ext.ComponentQuery.query('#gridbidangurusanpenunjang')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload();
                            } else if(data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Sub Urusan Atau Nomor Urusan Telah Terdaftar - Silahkan Gunakan Urusan Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Pengisian Data Salah',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                me.resetPanel();
                                Ext.ComponentQuery.query('#gridurusan')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan').reload();
                                Ext.ComponentQuery.query('#gridbidangurusanpenunjang')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload(); 
                            }
                        }      
                    });
                }
            }
        });
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me                      = this;
        var form                    = Ext.getCmp('bidangurusanpenunjang');
        var gridurusan           = Ext.getCmp('gridurusan');
        var gridbidangurusanpenunjang   = Ext.getCmp('gridbidangurusanpenunjang');
        form.getForm().reset();
        // grid.getSelectionModel().clearSelections();
        gridurusan.getSelectionModel().clearSelections();
        gridbidangurusanpenunjang.getSelectionModel().clearSelections();
        me.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan2').reload();
        me.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang').reload();

    },

    search: function(field, evt, opts){
        var value           = field.getValue();
        var form            = Ext.getCmp('bidangurusanpenunjang').getForm();
        var kode_urusan  = form.findField('kode_urusan').getValue();
        Ext.Ajax.request({
            headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
            url     : BASE_URL + 'bidangurusanpenunjang/c_bidangurusanpenunjang/searchUrusan',
            method  : 'GET',
            params  : {
                name            : value,
                kode_urusan  : kode_urusan
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.success){
                        var storeApproval = Ext.ComponentQuery.query('#gridurusan')[0].getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.Urusan');
                        storeApproval.removeAll();
                        storeApproval.add(data.data);
                }
            }
        });
    },

    searchBidangUrusanPenunjang: function(field, evt, opts){
        var value       = field.getValue();
        Ext.Ajax.request({
            headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
            url     : BASE_URL + 'bidangurusanpenunjang/c_bidangurusanpenunjang/searchBidangUrusanPenunjang',
            method  : 'GET',
            params  : {name : value},
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.success){
                        var storeApproval = Ext.getStore('RPJM.module.MasterRpjm.BidangUrusanPenunjang.store.BidangUrusanPenunjang');
                        storeApproval.removeAll();
                        storeApproval.add(data.data);
                }
            }
        });
    },

    print : function(){
        window.location = BASE_URL + 'gridbidangpenunjang/c_gridbidangpenunjang/printBidangUrusanPenunjang/';
    },
})
