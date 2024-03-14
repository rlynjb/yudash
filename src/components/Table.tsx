import { useState, useEffect, ReactNode } from 'react'

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
  children?: ReactNode,
  columns?: any[],
  rows?: any[],
  selector?: boolean,
}

const Table = ({
  children,
  columns = [],
  rows = [],
  selector = false,
}: Props) => {
  /*
    TODO:
    - work on selector feature
    - separator
  */
  const selector_lookup = {}
  const [l_rows, set_l_rows] = useState([])
  //let l_rows = []

  /*
    @param rows [object] An array of objects containing row data
    @param columns [object] An array of objects containing column data

    @return private_rows [object] An array of mapped objects
  */
  const matchColumnsAndRows = () => {
    const s_rows = rows.map((row: any) => {
      const rowdata: any = {
        display: {},
        raw: { ...row },
        settings_align: {}, // field_name/column: row_value (object || string)
        settings_customButtons: {}, // field_name/column: row_value (object || string)
        settings_asLink: {}, // field_name/column: row_value (object || string)
        settings_asButton: {},
        settings_asMultipleButtons: {},
        settings_selected: false,
        settings_separate: {},
      };

      if (selector) {
        rowdata.settings_selected = selector_lookup[row.id] ? true : false
      }

      columns.forEach((col: any) => {
        rowdata.display[col.field] = row[col.field];

        if (col.align) {
          rowdata.settings_align[col.field] = col.align;
        }

        if (col.customButtons) {
          rowdata.settings_customButtons[col.field] = col.customButtons;
        }

        if (col.asLink) {
          rowdata.settings_asLink[col.field] = true;
        }

        if (col.asButton) {
          rowdata.settings_asButton[col.field] = true;
        }

        if (col.asMultipleButtons) {
          rowdata.settings_asMultipleButtons[col.field] = true;
        }

        if (col.separate) {
          rowdata.settings_separate[col.field] = true
        }
      })

      return rowdata
    })

    set_l_rows(s_rows)
  }


  useEffect(() => {
    matchColumnsAndRows()
  }, [rows])



  const selector_selectItem = (e: any, row: any) => {
    if (selector_lookup[row.raw.id]) {
      delete selector_lookup[row.raw.id]
      return
    } else {
      selector_lookup[row.raw.id] = row.raw
      return
    }
  }

  const selector_selectAll = (e: any) => {
    if (e.target.checked) {
      // add all l_rows in selector_lookup
      rows.forEach((row: any) => {
        selector_lookup[row.id] = row
      })
      matchColumnsAndRows()
      console.log('l_rows - ', l_rows)
      return

    } else {
      // remove all l_rows in selector_lookup
      rows.forEach((row: any) => {
        delete selector_lookup[row.id]
      })
      matchColumnsAndRows()
      console.log('l_rows - ', l_rows)
      return
    }
  }


  // ------ JSX stuff ------
  const t_columns = columns.map((col: any, key: any) => {
    return (
      <th key={key}>
        {col.name}
      </th>
    )
  })

  const t_rows = l_rows.map((row: any, rowkey: any) => {
    return (
      <tr key={rowkey}>
        { selector && 
          <td>
            <input
              type="checkbox"
              onChange={(e) => selector_selectItem(e, row)}
              checked={row.settings_selected}
            />
          </td>
        }
        
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
            { selector && 
              <th>
                <input type="checkbox" onChange={selector_selectAll} />
              </th>
            }

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