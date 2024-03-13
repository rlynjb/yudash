import React from 'react'

/**
 * The column available settings for table.
 * @example
 * columns: [
 *  {
 *    name: '', // readable label of object property from API respond object
 *    field: '', // name of object property from API respond object
 *    align: 'text-center' || 'text-right',
 *    sortable: true || false,
 *    customButtons: [
 *      {
 *        label: '',
 *        iconClass: '', // class name of icon
 *        iconSvg: ``, // tempalte literal value, ref heroicons.com
 *        emit: ''
 *      }
 *    ],
 *    asLink: true || false, // field name of row.data we want to be as link value
 *    asButton: '', // class name style of button
 *    selectAll: true || false,
 *    asMultipleButtons: true || false,
 *    // accepts Array as value (row[{property_name}]) with object format of...
 *    // [
 *    //  {
 *    //    label: '',
 *    //    class: '', // usually style associated with button
 *    //    emit: ''
 *    //   }
 *    // ]
 *  }
 * ]
 */

type Props = {
  children?: React.ReactNode,
  columns?: any[],
  rows?: any[]
}

const Table = ({
  children,
  columns = [],
  rows = [],
}: Props) => {

  /*
  @param rows [object] An array of objects containing row data
  @param columns [object] An array of objects containing column data

  @return private_rows [object] An array of mapped objects
*/
  const l_rows = rows.map((row: any) => {
    const rowdata: any = {
      display: {},
      raw: { ...row },
      settings_align: {}, // field_name/column: row_value (object || string)
      settings_customButtons: {}, // field_name/column: row_value (object || string)
      settings_asLink: {}, // field_name/column: row_value (object || string)
      settings_asButton: {},
      settings_asMultipleButtons: {},
      settings_selectAll: {},
    };

    columns.forEach((col: any) => {
      rowdata.display[col.field] = row[col.field];

      if (col.align) {
        rowdata.settings_align[col.field] = col.align;
      }

      if (col.customButtons) {
        rowdata.settings_customButtons[col.field] = col.customButtons;
      }

      // if a link is set, add to settings field as key and
      // which property value it will be set as a link
      if (col.asLink) {
        rowdata.settings_asLink[col.field] = true;
      }

      if (col.asButton) {
        rowdata.settings_asButton[col.field] = true;
      }

      if (col.asMultipleButtons) {
        rowdata.settings_asMultipleButtons[col.field] = true;
      }

      if (col.selectAll) {
        rowdata.settings_selectAll[col.field] = {
          emit: col.emit,
          //value: check_selectAll_dictionary(row.guid, private_lookup)
        }
      }
    })
    return rowdata
  })


  const t_columns = columns.map((col: any, key: any) => {
    return (
      <th key={key}>{col.name}</th>
    )
  })

  const t_rows = l_rows.map((row: any, rowkey: any) => {
    return (
      <tr key={rowkey}>
        {
          Object.keys(row.display).map((rowcolumn: any, rowcolumnkey: any) => {
            return (
              <td key={rowcolumnkey}>
                { row.display[rowcolumn] }
              </td>
            )
          })
        }
      </tr>
    )
  })

  console.log('l_rows - ', l_rows)


  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {t_columns}
          </tr>
        </thead>
        <tbody>
          {t_rows}
        </tbody>
      </table>

      { children }
    </div>
  )
}

export default Table