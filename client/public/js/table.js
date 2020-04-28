function cargaDataTable () {
  $('#datatable').DataTable({    
    'paging'      : true,
    'lengthChange': false,
    'searching'   : true,
    'ordering'    : true,
    'info'        : true,
    'autoWidth'   : false,
    "language": {
      "decimal":        "",
      "emptyTable":     "No hay datos disponibles en la tabla",
      "info":           "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      "infoEmpty":      "Mostrando 0 a 0 de 0 entradas",
      "infoFiltered":   "(filtrado de _MAX_ entradas totales)",
      "infoPostFix":    "",
      "thousands":      ",",
      "lengthMenu":     "Monstrando entradas de _MENU_",
      "loadingRecords": "Cargando...",
      "processing":     "Procesando...",
      "search":         "Buscar:",
      "zeroRecords":    "No se encontraron registrons coincidentes",
      "paginate": {
          "first":      "Primero",
          "last":       "Último",
          "next":       "Siguiente",
          "previous":   "Anterior"
      },
      "aria": {
          "sortAscending":  ": activar para ordenar las columnas ascendentemente",
          "sortDescending": ": activar para ordenar las columnas descendentemente"
      }
    }
  })
}

setTimeout(cargaDataTable, 800);