import {
  useState,
  useEffect,
  ReactNode,
  useReducer
} from 'react'

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
  const [l_rows, set_l_rows] = useState([])
  const [selector_lookup, set_selector_lookup] = useState({})
  const u_selector_lookup = {}

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
        rowdata.settings_selected = selector_lookup.hasOwnProperty(row.id) ? true : false
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

  /*
    NOTE:
    https://stackoverflow.com/questions/55265604/uncaught-invariant-violation-too-many-re-renders-react-limits-the-number-of-re
  */
  useEffect(() => {
    matchColumnsAndRows()
  }, [rows])

  
  // ------ Reducer stuff ------
  const reducer_selector = (state, action) => {
    console.log('state - ', state)
    console.log('action - ', action)

    switch (action.type) {
      case 'SELECT_ALL': {
        return {
          name: 'hello world'
        }
      }
    }

    throw Error('Unknown action: ' + action.type)
  }

  const [state_selector, dispatch_selector] = useReducer(reducer_selector, {})

  const selector_selectItem = (e: any, row: any) => {
    dispatch_selector({ type: 'SELECT_ALL' })
    console.log('state_selector - ', state_selector)

    // TODO: look into using useState with object as value
    // https://stackoverflow.com/questions/54715131/how-to-use-react-usestate-hook-for-an-object

    /*
    if (selector_lookup.hasOwnProperty(row.raw.id)) {
      delete u_selector_lookup[row.raw.id]
      set_selector_lookup((prevdata) => {
        const newdata = {
          ...prevdata,
          ...u_selector_lookup
        }
        delete newdata[row.raw.id]
        return newdata
      })
      matchColumnsAndRows()

      console.log('selector_lookup - ', selector_lookup)
      console.log('u_selector_lookup - ', u_selector_lookup)
      return
    }
    */

    u_selector_lookup[row.raw.id] = row.raw
  
    const sd = {
      ...selector_lookup,
      [row.raw.id]: row.raw
    }

    set_selector_lookup(sd)

    matchColumnsAndRows()

    console.log('selector_lookup - ', selector_lookup)
    console.log('u_selector_lookup - ', u_selector_lookup)
  }

  const selector_selectAll = (e: any) => {
    if (e.target.checked) {
      // add all l_rows in selector_lookup
      rows.forEach((row: any) => {
        u_selector_lookup[row.id] = row
      })
      set_selector_lookup(selector_lookup => ({
        ...selector_lookup,
        ...u_selector_lookup
      }))
      matchColumnsAndRows()
      return

    } else {
      // remove all l_rows in selector_lookup
      rows.forEach((row: any) => {
        delete u_selector_lookup[row.id]
        set_selector_lookup(prevdata => {
          const newdata = {
            ...prevdata,
            ...u_selector_lookup
          }
          delete selector_lookup[row.id]
          return newdata
        })
      })
      matchColumnsAndRows()
      return
    }
  }


  // ------ JSX stuff ------
  const TableColumns = columns.map((col: any, key: any) => {
    return (
      <th key={key}>
        {col.name}
      </th>
    )
  })

  const TableRows = l_rows.map((row: any, rowkey: any) => {
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


  return (
    <div className="overflow-x-auto">
      { state_selector.name }
      <table className="table">
        <thead>
          <tr>
            { selector && 
              <th>
                <input type="checkbox" onChange={selector_selectAll} />
              </th>
            }

            {TableColumns}
          </tr>
        </thead>
        <tbody>
          {TableRows}
        </tbody>
      </table>

      { children }
    </div>
  )
}

export default Table