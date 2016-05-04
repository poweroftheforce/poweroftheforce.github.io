



;(function( window ) {

var lib = {

    closeModal : function() {
        $( '#mdl-login' ).removeClass( 'visible' );
        return this;
    },

    getJSON : function( url, complete ) {
        $.ajax({
            dataType: 'json',
            url: url,
            success: function( data ) {
                if ( typeof complete !== 'undefined' ) {
                    complete.call( this, data );
                }
            }
        });
        return this;
    },

    log : function( msg ) {
        if ( typeof window.console !== 'undefined' && typeof window.console.log !== 'undfined' ) {
            window.console.log( msg );
        }
        return this;
    },

    setNav : function( name ) {
        var $nav = $( $( '#tmpl__nav' ).html() );
        $( '.tmpl-nav' )
            .html( $nav )
            .find( 'a' ).each(function() {
                var $this = $( this );

                if ( $this.text().toLowerCase() == name ) {
                    $this.addClass( 'active' );
                }
            });

        return this;
    },

    showModal : function() {
        $( '#mdl-login' ).addClass( 'visible' );
        return this;
    }
};

$(function() {

    lib
        .getJSON( 'code-test.json', function( data ) {

            var $rates = $( '.rates' );

            function byProp( a, b ) {
                var a = typeof a !== 'undefined' ? a.earnings : '';
                var b = typeof b !== 'undefined' ? b.earnings : '';
                return ( ( a < b ) ? -1 : ( ( a > b ) ? 1 : 0 ) );
            };

            data.sort( byProp ).reverse();
            $.each( data, function( i, obj ) {
                var $row        = $( '<tr/>' ),
                    $name       = $( '<td>' + obj.name + '</td>' ),
                    $apy        = $( '<td>' + obj.apy + '</td>' ),
                    $earnings   = $( '<td>' + obj.earnings + '</td>' );

                /* this statement can be dynamically translated in another way later on if desired */
                if ( obj.name.toLowerCase() === 'urbank' ) {
                    $row.addClass( 'selected' );
                }

                $row.append( $name, $apy, $earnings ).appendTo( $rates.find( 'table tbody' ) );
            });
        })
        .setNav( 'company' );

    $( '#btn-show-login' ).click( lib.showModal );
    $( '.btn-close-modal' ).click( lib.closeModal );
    $( '#frm-login' ).submit(function() {
        /* do the dirty work :) */
        //$.ajax({ url : 'some-cgi.cgi', success : function() {} });
        alert( 'attempting login process, dlg login will now close' );
        lib.closeModal();
    });

    $( 'header .mbl-click' ).click(function() {
        $( 'header nav' ).toggleClass( 'visible' );
    });

    $( '.widget ul li' ).click(function() {
        var $this   = $( this ),
            chosen  = $this.text().toLowerCase(),
            $widget = $( '.widget' );

        $( '.widget ul li' ).removeClass( 'selected' );
        $this.addClass( 'selected' );
        $widget
            .find( '> div' ).hide()
            .end().find( '> div.' + chosen ).show();
    });

});

})( window, undefined );
